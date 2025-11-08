import { SpeechClient } from '@google-cloud/speech';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export class AudioTranscriber {
  private speechClient: SpeechClient | null = null;

  constructor() {
    // Initialize Google Cloud Speech client using same credentials as Calendar service
    try {
      // Use service account key file if available (same as Calendar service)
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        this.speechClient = new SpeechClient({
          keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
        });
        console.log('[AudioTranscriber] Google Cloud Speech-to-Text initialized');
      } else if (process.env.GOOGLE_CLOUD_PROJECT) {
        // Fallback to application default credentials
        this.speechClient = new SpeechClient();
        console.log('[AudioTranscriber] Google Cloud Speech-to-Text initialized (ADC)');
      } else {
        console.warn('[AudioTranscriber] Google Cloud credentials not found, transcription will be skipped');
      }
    } catch (error: any) {
      console.warn('[AudioTranscriber] Failed to initialize Speech client:', error.message);
      this.speechClient = null;
    }
  }

  /**
   * Transcribe audio file to text
   * @param audioPath - Path to audio file (WAV, MP3, FLAC, etc.)
   * @returns Transcribed text
   */
  async transcribe(audioPath: string): Promise<string> {
    try {
      // Try Google Cloud Speech-to-Text first
      if (this.speechClient) {
        return await this.transcribeWithGoogleSpeech(audioPath);
      }
      
      // Fallback: Use Gemini to transcribe (if audio is short enough)
      // Or use a local Whisper model
      return await this.transcribeWithGemini(audioPath);
    } catch (error: any) {
      console.error('[AudioTranscriber] Transcription error:', error.message);
      throw new Error(`Failed to transcribe audio: ${error.message}`);
    }
  }

  /**
   * Transcribe using Google Cloud Speech-to-Text API
   */
  private async transcribeWithGoogleSpeech(audioPath: string): Promise<string> {
    if (!this.speechClient) {
      throw new Error('Speech client not initialized');
    }

    const audioBytes = fs.readFileSync(audioPath).toString('base64');
    
    const request = {
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: 'LINEAR16' as const,
        sampleRateHertz: 16000,
        languageCode: 'en-US',
        enableAutomaticPunctuation: true,
        enableWordTimeOffsets: false,
      },
    };

    const [response] = await this.speechClient.recognize(request);
    
    if (!response.results || response.results.length === 0) {
      return '';
    }

    const transcription = response.results
      .map(result => result.alternatives?.[0]?.transcript || '')
      .join(' ');

    return transcription;
  }

  /**
   * Fallback: Use Gemini to analyze audio (if available)
   * Note: Gemini doesn't directly support audio, so this is a placeholder
   * In production, you'd use Whisper API or local Whisper model
   */
  private async transcribeWithGemini(audioPath: string): Promise<string> {
    // For now, return empty string
    // In a real implementation, you could:
    // 1. Use OpenAI Whisper API
    // 2. Use a local Whisper model
    // 3. Use AssemblyAI or other transcription services
    
    console.warn('[AudioTranscriber] Gemini transcription not implemented, returning empty string');
    return '';
  }
}

