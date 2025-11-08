import express from 'express';
import { GeminiExtractor } from '../services/gemini-extractor';
import { PlacesResolver } from '../services/places-resolver';
import { TimeZoneResolver } from '../services/timezone-resolver';
import { UrlExpander } from '../services/url-expander';
import { CalendarService } from '../services/calendar-service';
import { VideoFrameExtractor } from '../services/video-frame-extractor';
import { AudioTranscriber } from '../services/audio-transcriber';
import { CanonicalEvent } from '../types/event';

const router = express.Router();
const geminiExtractor = new GeminiExtractor();
const placesResolver = new PlacesResolver();
const timezoneResolver = new TimeZoneResolver();
const urlExpander = new UrlExpander();
const calendarService = new CalendarService();

router.post('/', async (req, res, next) => {
  try {
    const { type, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({ error: 'Missing type or data' });
    }

    let extracted: any;
    let sourceMetadata: any = {};

    // Step 1: Extract event info based on input type
    if (type === 'image') {
      extracted = await geminiExtractor.extractFromImage(data);
      sourceMetadata.imageUrl = data.substring(0, 100); // Store reference
    } else if (type === 'url') {
      const metadata = await urlExpander.expand(data);
      sourceMetadata.originalUrl = data;
      sourceMetadata.imageUrl = metadata.imageUrl;
      
      // Check if URL is a video
      const isVideo = isVideoUrl(data);
      
      let textToExtract = `${metadata.title || ''} ${metadata.description || ''} ${data}`;
      
      if (isVideo) {
        try {
          console.log('[Extract] Detected video URL, extracting frames and audio...');
          const videoFrameExtractor = new VideoFrameExtractor();
          const audioTranscriber = new AudioTranscriber();
          
          // Extract frames and audio
          const videoResult = await videoFrameExtractor.extractFrames(data, 5, true);
          
          let transcription = '';
          if (videoResult.audioPath) {
            try {
              console.log('[Extract] Transcribing audio...');
              transcription = await audioTranscriber.transcribe(videoResult.audioPath);
              console.log(`[Extract] Transcription: ${transcription.substring(0, 100)}...`);
              
              // Clean up audio file after transcription
              await videoFrameExtractor.cleanupAudio(videoResult.audioPath);
            } catch (error: any) {
              console.warn('[Extract] Audio transcription failed:', error.message);
              // Continue without transcription
            }
          }
          
          if (videoResult.frames.length > 0) {
            console.log(`[Extract] Extracted ${videoResult.frames.length} frames, analyzing with Gemini...`);
            
            // Analyze frames with Gemini Vision
            const frameAnalyses = await geminiExtractor.extractFromVideoFrames(
              videoResult.frames.map(f => f.base64)
            );
            
            // Combine frame analysis, transcription, and metadata
            const combinedText = [
              metadata.title || '',
              metadata.description || '',
              transcription,
              frameAnalyses.title || '',
              frameAnalyses.date || '',
              frameAnalyses.time || '',
              frameAnalyses.location || '',
              frameAnalyses.description || '',
              data
            ].filter(Boolean).join(' ');
            
            textToExtract = combinedText;
            
            sourceMetadata.videoFramesExtracted = videoResult.frames.length;
            sourceMetadata.hasAudio = !!videoResult.audioPath;
            sourceMetadata.transcription = transcription ? transcription.substring(0, 500) : undefined;
            sourceMetadata.frameAnalyses = {
              title: frameAnalyses.title,
              date: frameAnalyses.date,
              time: frameAnalyses.time,
              location: frameAnalyses.location
            };
            
            // Use frame analysis directly if it has all required fields
            if (frameAnalyses.title && frameAnalyses.date) {
              extracted = frameAnalyses;
            } else {
              // Fall back to text extraction with combined data (including transcription)
              extracted = await geminiExtractor.extractFromText(textToExtract);
            }
          } else {
            // No frames extracted, but we might have transcription
            if (transcription) {
              textToExtract = `${metadata.title || ''} ${metadata.description || ''} ${transcription} ${data}`;
            }
            extracted = await geminiExtractor.extractFromText(textToExtract);
          }
        } catch (error: any) {
          console.error('[Extract] Video extraction failed:', error.message);
          // Fall back to metadata-only extraction
          extracted = await geminiExtractor.extractFromText(textToExtract);
        }
      } else {
        // Not a video URL, use standard text extraction
        extracted = await geminiExtractor.extractFromText(textToExtract);
      }
    } else if (type === 'text') {
      extracted = await geminiExtractor.extractFromText(data);
      sourceMetadata.extractedText = data.substring(0, 500);
    } else {
      return res.status(400).json({ error: 'Invalid type. Must be image, url, or text' });
    }

    // Step 2: Resolve location
    let location: any = null;
    let timezone = 'America/Los_Angeles'; // Default fallback

    if (extracted.location && extracted.location.trim()) {
      try {
        const placeResult = await placesResolver.resolve(extracted.location);
        if (placeResult) {
          location = {
            name: placeResult.name || extracted.location,
            address: placeResult.formattedAddress,
            placeId: placeResult.placeId,
            coordinates: placeResult.location
          };

          // Resolve timezone from coordinates
          const tzResult = await timezoneResolver.resolve(
            placeResult.location.lat,
            placeResult.location.lng
          );
          if (tzResult) {
            timezone = tzResult.timeZoneId;
          }
        } else {
          // Location string exists but couldn't resolve - use raw string
          location = {
            name: extracted.location
          };
        }
      } catch (error) {
        // If resolution fails, just use the raw location string
        location = {
          name: extracted.location
        };
      }
    }
    // If no location extracted, location stays null (which is fine)

    // Step 3: Build canonical event
    // If time is provided, use dateTime format; otherwise use date format for all-day event
    const startTime = extracted.time 
      ? `${extracted.date}T${extracted.time}` 
      : extracted.date; // All-day event uses just the date (YYYY-MM-DD)
    
    // Handle endTime: if extracted.endTime exists, use it; otherwise calculate based on event type
    let endTime: string | undefined;
    if (extracted.time) {
      // Timed event: use extracted endTime if available, otherwise undefined (will default to +1h in calendar service)
      if (extracted.endTime) {
        endTime = `${extracted.date}T${extracted.endTime}`;
      }
    } else {
      // All-day event: end date is next day
      endTime = getNextDay(extracted.date);
    }

    const event: CanonicalEvent = {
      title: extracted.title,
      description: extracted.description,
      startTime,
      endTime,
      location,
      timezone,
      source: type === 'image' ? 'flyer' : type === 'url' ? 'url' : 'text',
      sourceMetadata
    };

    // Step 4: Check for conflicts
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    const conflicts = await calendarService.checkConflicts(
      calendarId,
      startTime,
      endTime || startTime
    );
    event.conflicts = conflicts;

    res.json({ event, confidence: 0.8 }); // TODO: Calculate actual confidence
  } catch (error: any) {
    next(error);
  }
});

/**
 * Get the next day for all-day event end date
 */
function getNextDay(dateString: string): string {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

/**
 * Check if URL is a video URL
 */
function isVideoUrl(url: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv', '.m4v'];
  const videoDomains = ['youtube.com', 'youtu.be', 'vimeo.com', 'dailymotion.com', 'tiktok.com'];
  
  const lowerUrl = url.toLowerCase();
  
  // Check file extension
  if (videoExtensions.some(ext => lowerUrl.includes(ext))) {
    return true;
  }
  
  // Check video hosting domains
  if (videoDomains.some(domain => lowerUrl.includes(domain))) {
    return true;
  }
  
  return false;
}

export { router as extractRouter };

