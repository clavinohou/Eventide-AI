import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Ensure .env is loaded
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY is not set in environment variables!');
  throw new Error('GEMINI_API_KEY is required. Check your .env file.');
}

const genAI = new GoogleGenerativeAI(apiKey);

export interface ExtractedEvent {
  title: string;
  description?: string;
  date: string; // ISO8601 date
  time?: string; // ISO8601 time (optional for all-day events)
  endTime?: string; // ISO8601 time (optional end time)
  location?: string;
}

export class GeminiExtractor {
  private model: any;

  constructor() {
    // Use gemini-2.0-flash (available model from API)
    // Model names need to match exactly what's available
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async extractFromImage(imageBase64: string): Promise<ExtractedEvent> {
    const prompt = `Extract event information from this image. Return a JSON object with:
- title (string, required): Event title
- description (string, optional): Brief event summary in 25 words or less. Summarize key details about the event.
- date (ISO8601 date, required): Event date (e.g., "2024-03-15")
- time (ISO8601 time, optional): Event start time (e.g., "20:00:00" or "08:00:00"). If no specific time is mentioned, omit this field or set to null.
- endTime (ISO8601 time, optional): Event end time (e.g., "22:00:00" or "10:00:00"). Look for phrases like "until", "ends at", "finishes at", or time ranges like "8pm-10pm". If no end time is mentioned, omit this field.
- location (string, optional): Event location/venue

If date/time is relative (e.g., "tomorrow", "next Friday"), resolve to absolute date based on today's date: ${new Date().toISOString().split('T')[0]}.
If no specific start time is mentioned in the image, do NOT include a time field or set it to null - this will create an all-day event.
If you see a time range (e.g., "8pm-10pm" or "20:00-22:00"), extract both start and end times.
IMPORTANT: The description must be a concise summary of 25 words maximum.
Return ONLY valid JSON, no markdown formatting.`;

    try {
      const imagePart = {
        inlineData: {
          data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
          mimeType: 'image/jpeg'
        }
      };

      const result = await this.model.generateContent([prompt, imagePart]);
      const response = result.response;
      const text = response.text();
      
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const extracted = JSON.parse(jsonMatch[0]);
      return this.validateAndNormalize(extracted);
    } catch (error: any) {
      console.error('Gemini extraction error:', error);
      throw new Error(`Extraction failed: ${error.message}`);
    }
  }

  async extractFromText(text: string): Promise<ExtractedEvent> {
    const prompt = `Extract event information from this text. Return a JSON object with:
- title (string, required): Event title
- description (string, optional): Brief event summary in 25 words or less. Summarize key details about the event.
- date (ISO8601 date, required): Event date (e.g., "2024-03-15")
- time (ISO8601 time, optional): Event start time (e.g., "20:00:00" or "08:00:00"). If no specific time is mentioned, omit this field or set to null.
- endTime (ISO8601 time, optional): Event end time (e.g., "22:00:00" or "10:00:00"). Look for phrases like "until", "ends at", "finishes at", "from X to Y", or time ranges like "8pm-10pm". If no end time is mentioned, omit this field.
- location (string, optional): Event location/venue

If date/time is relative (e.g., "tomorrow", "next Friday"), resolve to absolute date based on today's date: ${new Date().toISOString().split('T')[0]}.
If no specific start time is mentioned in the text, do NOT include a time field or set it to null - this will create an all-day event.
If you see a time range (e.g., "8pm-10pm", "20:00-22:00", "from 8pm to 10pm"), extract both start and end times.
IMPORTANT: The description must be a concise summary of 25 words maximum.
Return ONLY valid JSON, no markdown formatting.

Text to extract from:
${text}`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const extracted = JSON.parse(jsonMatch[0]);
      return this.validateAndNormalize(extracted);
    } catch (error: any) {
      console.error('Gemini extraction error:', error);
      throw new Error(`Extraction failed: ${error.message}`);
    }
  }

  /**
   * Extract event information from multiple video frames
   * Analyzes all frames and combines the results
   */
  async extractFromVideoFrames(frames: string[]): Promise<ExtractedEvent> {
    try {
      console.log(`[GeminiExtractor] Analyzing ${frames.length} video frames...`);
      
      // Analyze each frame
      const analyses = await Promise.all(
        frames.map(async (frame, index) => {
          const prompt = `Analyze this video frame (frame ${index + 1} of ${frames.length}) and extract any event information you can see:
        
- Event title or name
- Date and time (only include time if a specific time is visible)
- End time (look for "until", "ends at", time ranges like "8pm-10pm", or "from X to Y")
- Location (venue name, address, city)
- Brief summary (25 words max) of key event details
- Any text visible in the frame
- Event type (concert, conference, workshop, etc.)

If you see multiple pieces of information, extract all of them. If you don't see event information in this frame, respond with "No event information in this frame."

IMPORTANT: 
- Only include a "time" field if a specific start time is clearly visible. If only a date is shown without a time, omit the "time" field or set it to null - this will create an all-day event.
- Look carefully for end times in phrases like "8pm-10pm", "from 8pm to 10pm", "until 10pm", "ends at 10pm", etc.
- The description must be a concise summary of 25 words maximum.

Format your response as JSON with these fields:
{
  "title": "event title or null",
  "date": "date if visible or null",
  "time": "start time if visible or null (omit if no time shown)",
  "endTime": "end time if visible or null (look for time ranges, 'until', 'ends at')",
  "location": "location if visible or null",
  "description": "brief summary (25 words max) if visible or null",
  "text": "any text visible in the frame",
  "hasEventInfo": true or false
}`;

          try {
            const imagePart = {
              inlineData: {
                data: frame.replace(/^data:image\/\w+;base64,/, ''),
                mimeType: 'image/jpeg'
              }
            };

            const result = await this.model.generateContent([prompt, imagePart]);
            const response = result.response;
            const text = response.text();
            
            // Try to parse JSON response
            try {
              const jsonMatch = text.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                return {
                  ...parsed,
                  rawText: text
                };
              }
            } catch (e) {
              // If JSON parsing fails, extract text manually
            }
            
            return {
              text: text,
              hasEventInfo: text.toLowerCase().includes('event') || 
                           text.toLowerCase().includes('date') ||
                           text.toLowerCase().includes('time'),
              rawText: text
            };
          } catch (error: any) {
            console.warn(`[GeminiExtractor] Error analyzing frame ${index + 1}:`, error.message);
            return {
              hasEventInfo: false,
              rawText: ''
            };
          }
        })
      );

      // Combine all frame analyses
      const combined = this.combineFrameAnalyses(analyses);
      
      // Validate and normalize the combined result
      return this.validateAndNormalize(combined);
    } catch (error: any) {
      console.error('[GeminiExtractor] Error extracting from video frames:', error.message);
      throw new Error(`Failed to extract from video frames: ${error.message}`);
    }
  }

  /**
   * Combine analyses from multiple frames into a single event
   */
  private combineFrameAnalyses(analyses: any[]): any {
    // Filter out frames with no event info
    const validAnalyses = analyses.filter(a => a.hasEventInfo !== false && a.hasEventInfo !== undefined);
    
    if (validAnalyses.length === 0) {
      // If no frames have event info, try to extract from all text combined
      const allText = analyses.map(a => a.rawText || a.text || '').join(' ');
      if (allText.trim()) {
        // Return a basic structure that will be validated
        // Limit description to 25 words
        const words = allText.trim().split(/\s+/);
        const limitedDescription = words.length <= 25 
          ? words.join(' ')
          : words.slice(0, 25).join(' ') + '...';
        
        return {
          title: null,
          date: null,
          time: null,
          endTime: null,
          location: null,
          description: limitedDescription
        };
      }
      throw new Error('No event information found in video frames');
    }

    // Combine fields, prioritizing non-null values
    const combined: any = {
      title: null,
      date: null,
      time: null,
      endTime: null,
      location: null,
      description: null
    };

    for (const analysis of validAnalyses) {
      if (analysis.title && !combined.title) combined.title = analysis.title;
      if (analysis.date && !combined.date) combined.date = analysis.date;
      if (analysis.time && !combined.time) combined.time = analysis.time;
      if (analysis.endTime && !combined.endTime) combined.endTime = analysis.endTime;
      if (analysis.location && !combined.location) combined.location = analysis.location;
      if (analysis.description && !combined.description) {
        combined.description = this.limitDescription(analysis.description);
      }
    }

    // If we have text but no structured fields, try to extract from combined text
    const allText = validAnalyses.map(a => a.rawText || a.text || '').join(' ');
    if (allText && (!combined.title || !combined.date)) {
      // Use the combined text as description if we don't have structured data
      // Limit to 25 words
      if (!combined.description) {
        const words = allText.trim().split(/\s+/);
        combined.description = words.length <= 25 
          ? words.join(' ')
          : words.slice(0, 25).join(' ') + '...';
      }
    }

    return combined;
  }

  /**
   * Normalize time format to HH:MM:SS
   */
  private normalizeTime(time: string): string {
    if (!time || !time.includes(':')) {
      throw new Error('Invalid time format');
    }
    const timeParts = time.split(':');
    if (timeParts.length === 2) {
      return `${timeParts[0]}:${timeParts[1]}:00`;
    }
    return time; // Already in HH:MM:SS format
  }

  /**
   * Limit description to 25 words maximum
   */
  private limitDescription(description?: string): string | undefined {
    if (!description) return undefined;
    const words = description.trim().split(/\s+/);
    if (words.length <= 25) {
      return description.trim();
    }
    return words.slice(0, 25).join(' ') + '...';
  }

  private validateAndNormalize(extracted: any): ExtractedEvent {
    // Validate required fields
    if (!extracted.title) {
      throw new Error('Title is required');
    }
    if (!extracted.date) {
      throw new Error('Date is required');
    }

    // Normalize date format
    const date = new Date(extracted.date);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    extracted.date = date.toISOString().split('T')[0];

    // If time is provided, normalize it; otherwise leave it undefined for all-day event
    if (extracted.time) {
      extracted.time = this.normalizeTime(extracted.time);
    } else {
      // No time specified - will be treated as all-day event
      extracted.time = undefined;
    }
    
    // Normalize endTime if provided
    if (extracted.endTime) {
      extracted.endTime = this.normalizeTime(extracted.endTime);
    }

    return {
      title: extracted.title.trim(),
      description: this.limitDescription(extracted.description),
      date: extracted.date,
      time: extracted.time, // Can be undefined for all-day events
      endTime: extracted.endTime ? this.normalizeTime(extracted.endTime) : undefined,
      location: extracted.location?.trim()
    };
  }
}

