import ffmpeg from 'fluent-ffmpeg';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);
const mkdir = promisify(fs.mkdir);
const { exec } = require('child_process');
const { promisify: promisifyUtil } = require('util');
const execAsync = promisifyUtil(exec);

export interface VideoFrame {
  timestamp: number;
  base64: string;
}

export interface VideoExtractionResult {
  frames: VideoFrame[];
  audioPath?: string;
  duration: number;
}

export class VideoFrameExtractor {
  private tempDir: string;

  constructor() {
    // Create temp directory for frames
    this.tempDir = path.join(process.cwd(), 'temp', 'video-frames');
    this.ensureTempDir();
  }

  /**
   * Extract frames and audio from a video URL
   * @param videoUrl - URL of the video to extract frames from
   * @param frameCount - Number of frames to extract (default: 5)
   * @param extractAudio - Whether to extract audio (default: true)
   * @returns Video extraction result with frames and audio path
   */
  async extractFrames(videoUrl: string, frameCount: number = 5, extractAudio: boolean = true): Promise<VideoExtractionResult> {
    try {
      // Step 1: Download video to temp file
      console.log(`[VideoFrameExtractor] Downloading video from: ${videoUrl}`);
      const videoPath = await this.downloadVideo(videoUrl);
      
      // Step 2: Get video duration
      const duration = await this.getVideoDuration(videoPath);
      console.log(`[VideoFrameExtractor] Video duration: ${duration}s`);

      // Skip videos longer than 10 minutes
      if (duration > 600) {
        await this.cleanupFile(videoPath);
        throw new Error('Video too long. Maximum 10 minutes supported.');
      }

      // Step 3: Calculate timestamps for frames
      // For videos longer than 5 minutes, extract fewer frames
      const actualFrameCount = duration > 300 ? 3 : frameCount;
      const timestamps = this.calculateTimestamps(duration, actualFrameCount);
      console.log(`[VideoFrameExtractor] Extracting frames at: ${timestamps.join(', ')}s`);

      // Step 4: Extract frames
      const frames: VideoFrame[] = [];
      for (const timestamp of timestamps) {
        try {
          const frameBase64 = await this.extractFrameAtTime(videoPath, timestamp);
          if (frameBase64) {
            frames.push({
              timestamp,
              base64: frameBase64
            });
          }
        } catch (error) {
          console.warn(`[VideoFrameExtractor] Failed to extract frame at ${timestamp}s:`, error);
          // Continue with other frames
        }
      }

      // Step 5: Extract audio if requested
      let audioPath: string | undefined;
      if (extractAudio) {
        try {
          audioPath = await this.extractAudio(videoPath);
          console.log(`[VideoFrameExtractor] Extracted audio to: ${audioPath}`);
        } catch (error: any) {
          console.warn(`[VideoFrameExtractor] Failed to extract audio:`, error.message);
          // Continue without audio
        }
      }

      // Step 6: Clean up temp video file (but keep audio for now)
      await this.cleanupFile(videoPath);

      if (frames.length === 0) {
        throw new Error('No frames could be extracted from video');
      }

      console.log(`[VideoFrameExtractor] Extracted ${frames.length} frames${audioPath ? ' and audio' : ''}`);
      return {
        frames,
        audioPath,
        duration
      };
    } catch (error: any) {
      console.error('[VideoFrameExtractor] Error extracting frames:', error.message);
      throw new Error(`Failed to extract video frames: ${error.message}`);
    }
  }

  /**
   * Download video from URL to temporary file
   */
  private async downloadVideo(videoUrl: string): Promise<string> {
    // Check if it's a YouTube URL
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      return await this.downloadYouTubeVideo(videoUrl);
    }
    
    // For other videos, try direct download
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
      throw new Error(`Failed to download video: ${error.message}`);
    }
  }

  /**
   * Download YouTube video using yt-dlp
   */
  private async downloadYouTubeVideo(videoUrl: string): Promise<string> {
    try {
      const videoPath = path.join(this.tempDir, `video-${Date.now()}.mp4`);
      
      // Use yt-dlp to download video (best quality, audio+video)
      const { stdout, stderr } = await execAsync(
        `yt-dlp -f "best[ext=mp4]/best" -o "${videoPath}" "${videoUrl}"`,
        { timeout: 60000 } // 60 second timeout
      );

      // yt-dlp might add extension, check if file exists
      if (fs.existsSync(videoPath)) {
        return videoPath;
      }
      
      // Try with .mp4 extension
      const pathWithExt = videoPath + '.mp4';
      if (fs.existsSync(pathWithExt)) {
        return pathWithExt;
      }
      
      // Try to find the actual downloaded file
      const files = fs.readdirSync(this.tempDir);
      const downloadedFile = files.find(f => f.startsWith('video-') && f.endsWith('.mp4'));
      if (downloadedFile) {
        return path.join(this.tempDir, downloadedFile);
      }
      
      throw new Error('Downloaded video file not found');
    } catch (error: any) {
      if (error.message.includes('yt-dlp')) {
        throw new Error('yt-dlp not found. Install it with: brew install yt-dlp (macOS) or pip install yt-dlp');
      }
      throw new Error(`Failed to download YouTube video: ${error.message}`);
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
   * Extract audio from video file
   */
  private async extractAudio(videoPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const audioPath = path.join(this.tempDir, `audio-${Date.now()}.wav`);
      
      ffmpeg(videoPath)
        .output(audioPath)
        .audioCodec('pcm_s16le') // WAV format, 16-bit PCM
        .audioFrequency(16000) // 16kHz sample rate (good for speech)
        .audioChannels(1) // Mono
        .noVideo()
        .on('end', () => {
          if (fs.existsSync(audioPath)) {
            resolve(audioPath);
          } else {
            reject(new Error('Audio file was not created'));
          }
        })
        .on('error', (err) => {
          reject(err);
        })
        .run();
    });
  }

  /**
   * Clean up temporary file
   */
  private async cleanupFile(filePath: string): Promise<void> {
    try {
      if (fs.existsSync(filePath)) {
        await unlink(filePath);
      }
    } catch (error) {
      // File might not exist, that's fine
      console.warn(`[VideoFrameExtractor] Could not delete ${filePath}`);
    }
  }

  /**
   * Clean up audio file after transcription
   */
  async cleanupAudio(audioPath: string): Promise<void> {
    await this.cleanupFile(audioPath);
  }
}

