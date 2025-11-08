# Video & Social Media Content Extraction Implementation Guide

## Current Limitations

The app currently only extracts **metadata** from URLs (title, description, thumbnail via oEmbed/OG tags). It does **NOT** extract:
- Video content (frames, visual information)
- Video captions/subtitles
- Social media post captions/text
- Comments or engagement data
- Audio transcription

## What Needs to Be Implemented

### 1. Video Content Extraction
- Extract video frames at key timestamps
- Parse video captions/subtitles
- Use Gemini Vision to analyze video frames
- Extract text overlays from videos

### 2. Social Media Post Content
- **Instagram**: Extract post captions, video captions, location tags
- **TikTok**: Extract video captions, hashtags, description
- **Twitter/X**: Extract tweet text, media descriptions
- **YouTube**: Extract video title, description, captions, comments

### 3. Platform-Specific APIs

## Implementation Approaches

### Option 1: Platform APIs (Recommended for Production)

#### YouTube
**API**: YouTube Data API v3
- **Endpoint**: `https://www.googleapis.com/youtube/v3/videos`
- **What it provides**: Video metadata, captions, descriptions
- **Setup**:
  1. Enable YouTube Data API v3 in Google Cloud Console
  2. Get API key (or OAuth for user's own videos)
  3. Extract video ID from URL: `https://www.youtube.com/watch?v=VIDEO_ID`

**Example**:
```typescript
// backend/src/services/youtube-extractor.ts
import axios from 'axios';

export class YouTubeExtractor {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.YOUTUBE_API_KEY || '';
  }

  async extractVideoContent(videoUrl: string) {
    const videoId = this.extractVideoId(videoUrl);
    
    // Get video details
    const videoResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`,
      {
        params: {
          part: 'snippet,contentDetails',
          id: videoId,
          key: this.apiKey
        }
      }
    );

    const video = videoResponse.data.items[0];
    
    // Get captions if available
    const captions = await this.getCaptions(videoId);
    
    return {
      title: video.snippet.title,
      description: video.snippet.description,
      captions: captions,
      publishedAt: video.snippet.publishedAt,
      channelTitle: video.snippet.channelTitle
    };
  }

  private extractVideoId(url: string): string {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : '';
  }

  private async getCaptions(videoId: string): Promise<string> {
    try {
      // Use YouTube Transcript API (unofficial but works)
      // Or implement caption download via YouTube API
      const response = await axios.get(
        `https://www.youtube.com/api/timedtext`,
        {
          params: {
            v: videoId,
            lang: 'en'
          }
        }
      );
      // Parse XML captions
      return this.parseCaptionsXML(response.data);
    } catch (error) {
      return '';
    }
  }
}
```

#### Instagram
**API**: Instagram Graph API (requires Facebook App + App Review)
- **Alternative**: Web scraping (less reliable, may violate ToS)
- **What it provides**: Post captions, media URLs, location, hashtags

**Setup**:
1. Create Facebook App
2. Get Instagram Business Account
3. Request `instagram_basic`, `instagram_content_publish` permissions
4. Go through App Review process

**Example**:
```typescript
// backend/src/services/instagram-extractor.ts
import axios from 'axios';

export class InstagramExtractor {
  private accessToken: string;

  constructor() {
    this.accessToken = process.env.INSTAGRAM_ACCESS_TOKEN || '';
  }

  async extractPostContent(postUrl: string) {
    const mediaId = await this.getMediaIdFromUrl(postUrl);
    
    const response = await axios.get(
      `https://graph.instagram.com/${mediaId}`,
      {
        params: {
          fields: 'id,caption,media_type,media_url,permalink,timestamp,location',
          access_token: this.accessToken
        }
      }
    );

    return {
      caption: response.data.caption,
      mediaUrl: response.data.media_url,
      mediaType: response.data.media_type,
      location: response.data.location,
      timestamp: response.data.timestamp
    };
  }

  private async getMediaIdFromUrl(url: string): Promise<string> {
    // Instagram URLs need to be converted to media IDs
    // Use oEmbed endpoint first
    const oembed = await axios.get(
      `https://api.instagram.com/oembed`,
      { params: { url } }
    );
    // Extract shortcode and convert to media ID
    // Implementation depends on Instagram API version
    return '';
  }
}
```

#### TikTok
**API**: TikTok Research API (limited access) or Web Scraping
- **Alternative**: Use `tiktok-scraper` npm package (unofficial)
- **What it provides**: Video description, captions, hashtags, music info

**Example**:
```typescript
// backend/src/services/tiktok-extractor.ts
import axios from 'axios';
// Note: TikTok doesn't have official public API
// This is a placeholder for web scraping approach

export class TikTokExtractor {
  async extractVideoContent(videoUrl: string) {
    // Option 1: Use unofficial scraper library
    // npm install tiktok-scraper
    // const TikTokScraper = require('tiktok-scraper');
    
    // Option 2: Web scraping (may violate ToS)
    const html = await this.fetchPage(videoUrl);
    
    // Extract from page metadata
    return {
      description: this.extractDescription(html),
      captions: this.extractCaptions(html),
      hashtags: this.extractHashtags(html)
    };
  }

  private async fetchPage(url: string): Promise<string> {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    return response.data;
  }
}
```

#### Twitter/X
**API**: Twitter API v2
- **What it provides**: Tweet text, media, engagement metrics
- **Setup**:
  1. Create Twitter Developer Account
  2. Create App and get API keys
  3. Use Bearer Token for read-only access

**Example**:
```typescript
// backend/src/services/twitter-extractor.ts
import axios from 'axios';

export class TwitterExtractor {
  private bearerToken: string;

  constructor() {
    this.bearerToken = process.env.TWITTER_BEARER_TOKEN || '';
  }

  async extractTweetContent(tweetUrl: string) {
    const tweetId = this.extractTweetId(tweetUrl);
    
    const response = await axios.get(
      `https://api.twitter.com/2/tweets/${tweetId}`,
      {
        headers: {
          Authorization: `Bearer ${this.bearerToken}`
        },
        params: {
          'tweet.fields': 'text,created_at,attachments,entities',
          expansions: 'attachments.media_keys',
          'media.fields': 'url,preview_image_url,type'
        }
      }
    );

    return {
      text: response.data.data.text,
      createdAt: response.data.data.created_at,
      media: response.data.includes?.media || []
    };
  }

  private extractTweetId(url: string): string {
    const match = url.match(/twitter\.com\/\w+\/status\/(\d+)/) ||
                  url.match(/x\.com\/\w+\/status\/(\d+)/);
    return match ? match[1] : '';
  }
}
```

### Option 2: Video Frame Extraction + Gemini Vision

For platforms without APIs or for general video URLs:

```typescript
// backend/src/services/video-frame-extractor.ts
import ffmpeg from 'fluent-ffmpeg';
import { GeminiExtractor } from './gemini-extractor';

export class VideoFrameExtractor {
  private geminiExtractor: GeminiExtractor;

  constructor() {
    this.geminiExtractor = new GeminiExtractor();
  }

  async extractFramesFromVideo(videoUrl: string): Promise<string[]> {
    // Download video temporarily
    const videoPath = await this.downloadVideo(videoUrl);
    
    // Extract frames at key timestamps (0s, 25%, 50%, 75%, 100%)
    const frames: string[] = [];
    const duration = await this.getVideoDuration(videoPath);
    
    const timestamps = [
      0,
      duration * 0.25,
      duration * 0.5,
      duration * 0.75,
      duration * 0.9
    ];

    for (const timestamp of timestamps) {
      const frameBase64 = await this.extractFrameAtTime(videoPath, timestamp);
      frames.push(frameBase64);
    }

    // Clean up
    await this.deleteFile(videoPath);
    
    return frames;
  }

  async analyzeVideoFrames(frames: string[]): Promise<any> {
    // Use Gemini Vision to analyze each frame
    const analyses = await Promise.all(
      frames.map(frame => this.geminiExtractor.extractFromImage(frame))
    );
    
    // Combine analyses
    return this.combineFrameAnalyses(analyses);
  }

  private async extractFrameAtTime(videoPath: string, timestamp: number): Promise<string> {
    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .screenshots({
          timestamps: [timestamp],
          filename: 'frame-%s.png',
          folder: '/tmp'
        })
        .on('end', () => {
          // Read frame and convert to base64
          const framePath = `/tmp/frame-${timestamp}.png`;
          const frameBase64 = this.imageToBase64(framePath);
          resolve(frameBase64);
        })
        .on('error', reject);
    });
  }
}
```

**Dependencies**:
```bash
npm install fluent-ffmpeg @ffmpeg-installer/ffmpeg
```

### Option 3: Caption/Subtitle Extraction

For videos with embedded captions:

```typescript
// backend/src/services/caption-extractor.ts
import axios from 'axios';
import { parseString } from 'xml2js';

export class CaptionExtractor {
  async extractCaptions(videoUrl: string): Promise<string> {
    // Try multiple methods
    
    // Method 1: YouTube captions
    if (videoUrl.includes('youtube.com')) {
      return await this.extractYouTubeCaptions(videoUrl);
    }
    
    // Method 2: WebVTT captions (common format)
    const webvttUrl = await this.findWebVTTCaptions(videoUrl);
    if (webvttUrl) {
      return await this.downloadWebVTT(webvttUrl);
    }
    
    // Method 3: SRT captions
    const srtUrl = await this.findSRTCaptions(videoUrl);
    if (srtUrl) {
      return await this.downloadSRT(srtUrl);
    }
    
    return '';
  }

  private async extractYouTubeCaptions(videoUrl: string): Promise<string> {
    const videoId = this.extractVideoId(videoUrl);
    
    // Get available caption tracks
    const response = await axios.get(
      `https://www.youtube.com/api/timedtext`,
      {
        params: {
          v: videoId,
          lang: 'en',
          fmt: 'srv3' // Returns XML
        }
      }
    );
    
    // Parse XML and extract text
    return this.parseCaptionXML(response.data);
  }
}
```

## Implementation Architecture

### Updated Service Flow

```
URL Input
    ↓
Detect Platform (YouTube, Instagram, TikTok, Twitter, Generic)
    ↓
Platform-Specific Extractor
    ↓
Extract:
  - Metadata (title, description)
  - Video frames (if video)
  - Captions/subtitles
  - Post text/captions
    ↓
Combine all text content
    ↓
Send to Gemini for event extraction
    ↓
Return canonical event
```

### New File Structure

```
backend/src/services/
  ├── url-expander.ts (existing - update to detect platform)
  ├── youtube-extractor.ts (new)
  ├── instagram-extractor.ts (new)
  ├── tiktok-extractor.ts (new)
  ├── twitter-extractor.ts (new)
  ├── video-frame-extractor.ts (new)
  ├── caption-extractor.ts (new)
  └── social-media-extractor.ts (new - orchestrator)
```

## Step-by-Step Implementation

### Phase 1: YouTube Integration (Easiest)

1. **Get YouTube API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable YouTube Data API v3
   - Create API key
   - Add to `.env`: `YOUTUBE_API_KEY=your_key`

2. **Create YouTube Extractor**:
   ```bash
   touch backend/src/services/youtube-extractor.ts
   ```

3. **Update URL Expander**:
   ```typescript
   // In url-expander.ts
   if (url.includes('youtube.com') || url.includes('youtu.be')) {
     const youtubeExtractor = new YouTubeExtractor();
     const content = await youtubeExtractor.extractVideoContent(url);
     // Combine with metadata
   }
   ```

4. **Update Extract Route**:
   ```typescript
   // In extract.ts
   if (type === 'url') {
     const metadata = await urlExpander.expand(data);
     
     // NEW: Extract video content if YouTube
     let videoContent = '';
     if (data.includes('youtube.com') || data.includes('youtu.be')) {
       const youtubeExtractor = new YouTubeExtractor();
       const content = await youtubeExtractor.extractVideoContent(data);
       videoContent = `${content.title} ${content.description} ${content.captions}`;
     }
     
     const textToExtract = `${metadata.title || ''} ${metadata.description || ''} ${videoContent} ${data}`;
     extracted = await geminiExtractor.extractFromText(textToExtract);
   }
   ```

### Phase 2: Twitter/X Integration

1. **Get Twitter API Access**:
   - Apply for [Twitter Developer Account](https://developer.twitter.com/)
   - Create App
   - Get Bearer Token
   - Add to `.env`: `TWITTER_BEARER_TOKEN=your_token`

2. **Create Twitter Extractor** (see example above)

3. **Update URL Expander** to detect Twitter URLs

### Phase 3: Video Frame Extraction (For Generic Videos)

1. **Install FFmpeg**:
   ```bash
   # macOS
   brew install ffmpeg
   
   # Or use npm package
   npm install @ffmpeg-installer/ffmpeg
   ```

2. **Create Video Frame Extractor** (see example above)

3. **Use Gemini Vision** to analyze frames:
   ```typescript
   const frames = await videoFrameExtractor.extractFramesFromVideo(url);
   const frameAnalyses = await Promise.all(
     frames.map(frame => geminiExtractor.extractFromImage(frame))
   );
   ```

### Phase 4: Instagram/TikTok (Most Complex)

1. **Instagram**: Requires Facebook App + App Review (takes weeks)
2. **TikTok**: Use web scraping (risky, may violate ToS)
3. **Alternative**: Use third-party services like:
   - [RapidAPI Instagram Scraper](https://rapidapi.com/)
   - [Apify Instagram Scraper](https://apify.com/)

## Environment Variables Needed

Add to `backend/.env`:

```env
# YouTube
YOUTUBE_API_KEY=your_youtube_api_key

# Twitter/X
TWITTER_BEARER_TOKEN=your_twitter_bearer_token

# Instagram (if using Graph API)
INSTAGRAM_ACCESS_TOKEN=your_instagram_token
INSTAGRAM_APP_ID=your_app_id
INSTAGRAM_APP_SECRET=your_app_secret

# TikTok (if using unofficial scraper)
TIKTOK_API_KEY=your_tiktok_key  # From third-party service
```

## Dependencies to Install

```bash
cd backend
npm install fluent-ffmpeg @ffmpeg-installer/ffmpeg
npm install xml2js @types/xml2js  # For parsing captions
npm install tiktok-scraper  # Optional, for TikTok
```

## Testing

### Test URLs

```typescript
// YouTube
const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

// Twitter
const twitterUrl = 'https://twitter.com/user/status/1234567890';

// Instagram
const instagramUrl = 'https://www.instagram.com/p/ABC123/';

// TikTok
const tiktokUrl = 'https://www.tiktok.com/@user/video/1234567890';
```

## Error Handling

- **API Rate Limits**: Implement retry logic with exponential backoff
- **Missing Captions**: Fall back to video description only
- **Private Videos**: Return error message to user
- **Unsupported Platforms**: Fall back to current metadata extraction

## Performance Considerations

- **Video Frame Extraction**: Can be slow (5-10 seconds per video)
- **API Calls**: Cache results to avoid repeated calls
- **Async Processing**: Consider queue system (Bull, BullMQ) for long-running extractions

## Next Steps

1. Start with **YouTube** (easiest, most reliable)
2. Add **Twitter** (good API, straightforward)
3. Implement **video frame extraction** for generic videos
4. Add **Instagram/TikTok** last (most complex, requires app review)

## Resources

- [YouTube Data API v3 Docs](https://developers.google.com/youtube/v3)
- [Twitter API v2 Docs](https://developer.twitter.com/en/docs/twitter-api)
- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-api)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [Gemini Vision API](https://ai.google.dev/docs/vision)

