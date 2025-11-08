# Video Frame Extraction + Gemini Vision - Step-by-Step Guide

This guide will walk you through implementing video frame extraction and analysis using FFmpeg and Gemini Vision API.

## Overview

**What we're building:**
- Download video from URL
- Extract key frames at specific timestamps (0s, 25%, 50%, 75%, 90%)
- Convert frames to base64 images
- Send each frame to Gemini Vision for analysis
- Combine all frame analyses to extract event information

**Why this approach:**
- Works with any video URL (YouTube, Vimeo, direct video links)
- No need for platform-specific APIs
- Gemini Vision can read text, dates, locations from video frames
- Captures visual information that captions might miss

---

## Prerequisites

- Node.js backend running
- Gemini API key already configured
- Basic understanding of async/await in TypeScript

---

## Step 1: Install Dependencies

### 1.1 Install FFmpeg System Package

**macOS:**
```bash
brew install ffmpeg
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install ffmpeg
```

**Windows:**
- Download from [FFmpeg website](https://ffmpeg.org/download.html)
- Add to PATH environment variable

**Verify installation:**
```bash
ffmpeg -version
```

### 1.2 Install Node.js Packages

```bash
cd backend
npm install fluent-ffmpeg
npm install @types/fluent-ffmpeg --save-dev
npm install axios  # If not already installed
```

**Note:** `fluent-ffmpeg` is a Node.js wrapper for FFmpeg. It requires FFmpeg to be installed on your system.

---

## Step 2: Create Video Frame Extractor Service

### 2.1 Create the Service File

```bash
touch backend/src/services/video-frame-extractor.ts
```

### 2.2 Implement the Service

Copy this code into `backend/src/services/video-frame-extractor.ts`:

```typescript
import ffmpeg from 'fluent-ffmpeg';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);
const mkdir = promisify(fs.mkdir);

export interface VideoFrame {
  timestamp: number;
  base64: string;
}

export class VideoFrameExtractor {
  private tempDir: string;

  constructor() {
    // Create temp directory for frames
    this.tempDir = path.join(process.cwd(), 'temp', 'video-frames');
    this.ensureTempDir();
  }

  /**
   * Extract frames from a video URL
   * @param videoUrl - URL of the video to extract frames from
   * @param frameCount - Number of frames to extract (default: 5)
   * @returns Array of base64-encoded frame images
   */
  async extractFrames(videoUrl: string, frameCount: number = 5): Promise<VideoFrame[]> {
    try {
      // Step 1: Download video to temp file
      console.log(`[VideoFrameExtractor] Downloading video from: ${videoUrl}`);
      const videoPath = await this.downloadVideo(videoUrl);
      
      // Step 2: Get video duration
      const duration = await this.getVideoDuration(videoPath);
      console.log(`[VideoFrameExtractor] Video duration: ${duration}s`);

      // Step 3: Calculate timestamps for frames
      const timestamps = this.calculateTimestamps(duration, frameCount);
      console.log(`[VideoFrameExtractor] Extracting frames at: ${timestamps.join(', ')}s`);

      // Step 4: Extract frames
      const frames: VideoFrame[] = [];
      for (const timestamp of timestamps) {
        const frameBase64 = await this.extractFrameAtTime(videoPath, timestamp);
        if (frameBase64) {
          frames.push({
            timestamp,
            base64: frameBase64
          });
        }
      }

      // Step 5: Clean up temp video file
      await this.cleanupFile(videoPath);

      console.log(`[VideoFrameExtractor] Extracted ${frames.length} frames`);
      return frames;
    } catch (error: any) {
      console.error('[VideoFrameExtractor] Error extracting frames:', error.message);
      throw new Error(`Failed to extract video frames: ${error.message}`);
    }
  }

  /**
   * Download video from URL to temporary file
   */
  private async downloadVideo(videoUrl: string): Promise<string> {
    try {
      const response = await axios.get(videoUrl, {
        responseType: 'arraybuffer',
        timeout: 30000, // 30 second timeout
        maxContentLength: 100 * 1024 * 1024, // 100MB max
      });

      const videoPath = path.join(this.tempDir, `video-${Date.now()}.mp4`);
      fs.writeFileSync(videoPath, response.data);
      
      return videoPath;
    } catch (error: any) {
      // If direct download fails, try using yt-dlp or similar for YouTube
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        throw new Error('YouTube videos require yt-dlp. See Step 6 for YouTube support.');
      }
      throw error;
    }
  }

  /**
   * Get video duration in seconds
   */
  private async getVideoDuration(videoPath: string): Promise<number> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) {
          reject(err);
          return;
        }
        const duration = metadata.format.duration || 0;
        resolve(duration);
      });
    });
  }

  /**
   * Calculate timestamps for frame extraction
   * Extracts frames at: start, 25%, 50%, 75%, and near end (90%)
   */
  private calculateTimestamps(duration: number, frameCount: number): number[] {
    const timestamps: number[] = [];
    
    // Always include start
    timestamps.push(0);
    
    // Add evenly spaced frames
    for (let i = 1; i < frameCount; i++) {
      const percentage = i / frameCount;
      // For last frame, use 90% instead of 100% to avoid black frames
      const timestamp = percentage >= 0.9 ? duration * 0.9 : duration * percentage;
      timestamps.push(Math.floor(timestamp));
    }
    
    // Remove duplicates and sort
    return [...new Set(timestamps)].sort((a, b) => a - b);
  }

  /**
   * Extract a single frame at a specific timestamp
   */
  private async extractFrameAtTime(videoPath: string, timestamp: number): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const outputPath = path.join(this.tempDir, `frame-${timestamp}-${Date.now()}.jpg`);
      
      ffmpeg(videoPath)
        .seekInput(timestamp)
        .frames(1)
        .output(outputPath)
        .on('end', async () => {
          try {
            // Read frame as base64
            const frameBuffer = await readFile(outputPath);
            const base64 = frameBuffer.toString('base64');
            const dataUri = `data:image/jpeg;base64,${base64}`;
            
            // Clean up frame file
            await this.cleanupFile(outputPath);
            
            resolve(dataUri);
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (err) => {
          // Clean up on error
          this.cleanupFile(outputPath).catch(() => {});
          reject(err);
        })
        .run();
    });
  }

  /**
   * Ensure temp directory exists
   */
  private async ensureTempDir(): Promise<void> {
    try {
      await mkdir(this.tempDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, that's fine
    }
  }

  /**
   * Clean up temporary file
   */
  private async cleanupFile(filePath: string): Promise<void> {
    try {
      await unlink(filePath);
    } catch (error) {
      // File might not exist, that's fine
      console.warn(`[VideoFrameExtractor] Could not delete ${filePath}`);
    }
  }
}
```

---

## Step 3: Update Gemini Extractor to Handle Multiple Images

### 3.1 Check Current Gemini Extractor

Read `backend/src/services/gemini-extractor.ts` to see the current implementation.

### 3.2 Add Method for Multiple Images

Add this method to your `GeminiExtractor` class:

```typescript
/**
 * Extract event information from multiple video frames
 * Analyzes all frames and combines the results
 */
async extractFromVideoFrames(frames: string[]): Promise<any> {
  try {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    // Analyze each frame
    const analyses = await Promise.all(
      frames.map(async (frame, index) => {
        const prompt = `Analyze this video frame (frame ${index + 1} of ${frames.length}) and extract any event information you can see:
        
- Event title or name
- Date and time
- Location (venue name, address, city)
- Description or details
- Any text visible in the frame
- Event type (concert, conference, workshop, etc.)

If you see multiple pieces of information, extract all of them. If you don't see event information in this frame, respond with "No event information in this frame."

Format your response as JSON with these fields:
{
  "title": "event title or null",
  "date": "date if visible or null",
  "time": "time if visible or null",
  "location": "location if visible or null",
  "description": "description if visible or null",
  "text": "any text visible in the frame",
  "hasEventInfo": true or false
}`;

        const result = await model.generateContent([
          prompt,
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: frame.split(',')[1] // Remove data:image/jpeg;base64, prefix
            }
          }
        ]);

        const response = result.response;
        const text = response.text();
        
        // Try to parse JSON response
        try {
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
          }
        } catch (e) {
          // If JSON parsing fails, extract text manually
        }
        
        return {
          text: text,
          hasEventInfo: text.toLowerCase().includes('event') || 
                       text.toLowerCase().includes('date') ||
                       text.toLowerCase().includes('time')
        };
      })
    );

    // Combine all frame analyses
    const combined = this.combineFrameAnalyses(analyses);
    
    return combined;
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
  const validAnalyses = analyses.filter(a => a.hasEventInfo !== false);
  
  if (validAnalyses.length === 0) {
    return {
      title: null,
      date: null,
      time: null,
      location: null,
      description: null
    };
  }

  // Combine fields, prioritizing non-null values
  const combined: any = {
    title: null,
    date: null,
    time: null,
    location: null,
    description: null
  };

  for (const analysis of validAnalyses) {
    if (analysis.title && !combined.title) combined.title = analysis.title;
    if (analysis.date && !combined.date) combined.date = analysis.date;
    if (analysis.time && !combined.time) combined.time = analysis.time;
    if (analysis.location && !combined.location) combined.location = analysis.location;
    if (analysis.description && !combined.description) combined.description = analysis.description;
  }

  // If we have text but no structured fields, try to extract from text
  const allText = validAnalyses.map(a => a.text || '').join(' ');
  if (allText && (!combined.title || !combined.date)) {
    // Use Gemini to extract from combined text
    // This is a fallback - you could call extractFromText here
  }

  return combined;
}
```

---

## Step 4: Update Extract Route

### 4.1 Import New Services

In `backend/src/routes/extract.ts`, add imports:

```typescript
import { VideoFrameExtractor } from '../services/video-frame-extractor';
```

### 4.2 Update URL Handling

Find the `type === 'url'` section and update it:

```typescript
} else if (type === 'url') {
  const metadata = await urlExpander.expand(data);
  sourceMetadata.originalUrl = data;
  sourceMetadata.imageUrl = metadata.imageUrl;
  
  // Check if URL is a video
  const isVideoUrl = this.isVideoUrl(data);
  
  let textToExtract = `${metadata.title || ''} ${metadata.description || ''} ${data}`;
  
  if (isVideoUrl) {
    try {
      console.log('[Extract] Detected video URL, extracting frames...');
      const videoFrameExtractor = new VideoFrameExtractor();
      
      // Extract frames (limit to 5 for performance)
      const frames = await videoFrameExtractor.extractFrames(data, 5);
      
      if (frames.length > 0) {
        console.log(`[Extract] Extracted ${frames.length} frames, analyzing with Gemini...`);
        
        // Analyze frames with Gemini Vision
        const frameAnalyses = await geminiExtractor.extractFromVideoFrames(
          frames.map(f => f.base64)
        );
        
        // Combine frame analysis with metadata
        textToExtract = `${metadata.title || ''} ${metadata.description || ''} ${
          frameAnalyses.title || ''
        } ${frameAnalyses.date || ''} ${frameAnalyses.time || ''} ${
          frameAnalyses.location || ''
        } ${frameAnalyses.description || ''} ${data}`;
        
        sourceMetadata.videoFramesExtracted = frames.length;
        sourceMetadata.frameAnalyses = frameAnalyses;
      }
    } catch (error: any) {
      console.error('[Extract] Video frame extraction failed:', error.message);
      // Fall back to metadata-only extraction
    }
  }
  
  // Extract event info from combined text
  extracted = await geminiExtractor.extractFromText(textToExtract);
}
```

### 4.3 Add Video URL Detection Helper

Add this helper method to the route file:

```typescript
private isVideoUrl(url: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv', '.m4v'];
  const videoDomains = ['youtube.com', 'youtu.be', 'vimeo.com', 'dailymotion.com'];
  
  // Check file extension
  if (videoExtensions.some(ext => url.toLowerCase().includes(ext))) {
    return true;
  }
  
  // Check video hosting domains
  if (videoDomains.some(domain => url.toLowerCase().includes(domain))) {
    return true;
  }
  
  // Check content-type header (would require HEAD request)
  // For now, we'll be conservative and only check known patterns
  
  return false;
}
```

**Note:** Move `isVideoUrl` outside the router if it's a class method, or make it a standalone function.

---

## Step 5: Add Temp Directory to .gitignore

Add to `backend/.gitignore`:

```
# Temporary video frames
temp/
*.mp4
*.jpg
```

---

## Step 6: Handle YouTube Videos (Optional but Recommended)

YouTube videos can't be downloaded directly. You'll need `yt-dlp`:

### 6.1 Install yt-dlp

**macOS:**
```bash
brew install yt-dlp
```

**Linux:**
```bash
pip install yt-dlp
```

**Windows:**
```bash
pip install yt-dlp
```

### 6.2 Update Video Download Method

Replace the `downloadVideo` method in `VideoFrameExtractor`:

```typescript
private async downloadVideo(videoUrl: string): Promise<string> {
  // Check if it's a YouTube URL
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    return await this.downloadYouTubeVideo(videoUrl);
  }
  
  // For other videos, try direct download
  try {
    const response = await axios.get(videoUrl, {
      responseType: 'arraybuffer',
      timeout: 30000,
      maxContentLength: 100 * 1024 * 1024,
    });

    const videoPath = path.join(this.tempDir, `video-${Date.now()}.mp4`);
    fs.writeFileSync(videoPath, response.data);
    return videoPath;
  } catch (error: any) {
    throw new Error(`Failed to download video: ${error.message}`);
  }
}

private async downloadYouTubeVideo(videoUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const { exec } = require('child_process');
    const videoPath = path.join(this.tempDir, `video-${Date.now()}.mp4`);
    
    // Use yt-dlp to download video (best quality, audio+video)
    exec(
      `yt-dlp -f "best[ext=mp4]" -o "${videoPath}" "${videoUrl}"`,
      (error: any, stdout: string, stderr: string) => {
        if (error) {
          reject(new Error(`yt-dlp failed: ${error.message}`));
          return;
        }
        
        // yt-dlp might add extension, check if file exists
        if (fs.existsSync(videoPath)) {
          resolve(videoPath);
        } else {
          // Try with .mp4 extension
          const pathWithExt = videoPath + '.mp4';
          if (fs.existsSync(pathWithExt)) {
            resolve(pathWithExt);
          } else {
            reject(new Error('Downloaded video file not found'));
          }
        }
      }
    );
  });
}
```

---

## Step 7: Testing

### 7.1 Test with Direct Video URL

Create a test file `backend/test-video-extraction.ts`:

```typescript
import { VideoFrameExtractor } from './src/services/video-frame-extractor';

async function test() {
  const extractor = new VideoFrameExtractor();
  
  // Use a small test video URL (replace with actual video URL)
  const testUrl = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';
  
  try {
    const frames = await extractor.extractFrames(testUrl, 3);
    console.log(`Extracted ${frames.length} frames`);
    console.log(`First frame base64 length: ${frames[0].base64.length}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
```

Run it:
```bash
cd backend
npx ts-node test-video-extraction.ts
```

### 7.2 Test with YouTube Video

```typescript
const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const frames = await extractor.extractFrames(youtubeUrl, 5);
```

### 7.3 Test Full Flow

1. Start your backend: `npm run dev`
2. Send a POST request to `/extract` with a video URL:
```bash
curl -X POST http://localhost:3000/extract \
  -H "Content-Type: application/json" \
  -d '{
    "type": "url",
    "data": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
  }'
```

---

## Step 8: Error Handling & Optimization

### 8.1 Add Timeout for Long Videos

Update `extractFrames` to skip videos longer than 10 minutes:

```typescript
const duration = await this.getVideoDuration(videoPath);
if (duration > 600) { // 10 minutes
  throw new Error('Video too long. Maximum 10 minutes supported.');
}
```

### 8.2 Add Frame Size Limit

Limit frame extraction for very long videos:

```typescript
// For videos longer than 5 minutes, extract fewer frames
const frameCount = duration > 300 ? 3 : 5;
const timestamps = this.calculateTimestamps(duration, frameCount);
```

### 8.3 Add Retry Logic

```typescript
async extractFramesWithRetry(videoUrl: string, retries = 2): Promise<VideoFrame[]> {
  for (let i = 0; i < retries; i++) {
    try {
      return await this.extractFrames(videoUrl);
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Retry ${i + 1}...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  throw new Error('Failed after retries');
}
```

---

## Troubleshooting

### Issue: "FFmpeg not found"
**Solution:** Make sure FFmpeg is installed and in your PATH:
```bash
which ffmpeg
ffmpeg -version
```

### Issue: "Video download fails"
**Solution:** 
- Check if URL is accessible
- For YouTube, install yt-dlp
- Check file size limits

### Issue: "Out of memory"
**Solution:**
- Reduce number of frames (use 3 instead of 5)
- Add video size limits
- Process frames one at a time instead of all at once

### Issue: "Frame extraction is slow"
**Solution:**
- This is normal for large videos
- Consider extracting frames in parallel (with caution)
- Cache results for repeated URLs

---

## Next Steps

1. ✅ Test with sample video URLs
2. ✅ Test with YouTube videos (if yt-dlp installed)
3. ✅ Monitor performance and optimize
4. ✅ Add caching for frequently accessed videos
5. ✅ Consider background job queue for long videos

---

## Summary

You now have:
- ✅ Video frame extraction service
- ✅ Integration with Gemini Vision
- ✅ Updated extract route to handle videos
- ✅ Support for YouTube (with yt-dlp)
- ✅ Error handling and optimization

**Test it:** Try extracting an event from a video URL in your app!

