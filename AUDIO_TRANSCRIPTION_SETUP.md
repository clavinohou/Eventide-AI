# Audio Transcription Setup Guide

## Overview

The video extraction system now extracts **both visual frames AND audio** from videos, then transcribes the audio to get spoken information. This significantly improves event extraction from videos.

## How It Works

1. **Video Download**: Downloads video from URL
2. **Frame Extraction**: Extracts key frames (visual information)
3. **Audio Extraction**: Extracts audio track as WAV file
4. **Audio Transcription**: Converts speech to text
5. **Combined Analysis**: Uses both visual frames + transcription to extract event info

## Setup Options

### Option 1: Google Cloud Speech-to-Text (Recommended if using Google Cloud)

**Pros:**
- Already using Google services (Gemini, Calendar, Maps)
- High accuracy
- Free tier: 60 minutes/month

**Setup Steps:**

1. **Enable Speech-to-Text API**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to "APIs & Services" > "Library"
   - Search for "Cloud Speech-to-Text API"
   - Click "Enable"

2. **Set up Authentication**:
   - Option A: Use existing service account (if you have one)
     ```bash
     export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
     ```
   
   - Option B: Use Application Default Credentials
     ```bash
     gcloud auth application-default login
     ```

3. **Add to `.env`** (optional, if using service account):
   ```env
   GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
   ```

4. **Test it**:
   - Restart backend
   - Send a video URL with speech
   - Check logs for transcription

---

### Option 2: OpenAI Whisper API (Alternative)

**Pros:**
- Very high accuracy
- Easy to set up
- Pay-as-you-go pricing

**Setup Steps:**

1. **Get OpenAI API Key**:
   - Sign up at [OpenAI](https://platform.openai.com/)
   - Get API key from dashboard

2. **Install Package**:
   ```bash
   cd backend
   npm install openai
   ```

3. **Update AudioTranscriber**:
   Replace the `transcribeWithGemini` method in `audio-transcriber.ts`:

   ```typescript
   import OpenAI from 'openai';

   private async transcribeWithOpenAI(audioPath: string): Promise<string> {
     const openai = new OpenAI({
       apiKey: process.env.OPENAI_API_KEY
     });

     const transcription = await openai.audio.transcriptions.create({
       file: fs.createReadStream(audioPath),
       model: 'whisper-1',
       language: 'en'
     });

     return transcription.text;
   }
   ```

4. **Add to `.env`**:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

---

### Option 3: Local Whisper (Free, but slower)

**Pros:**
- Completely free
- No API limits
- Works offline

**Cons:**
- Requires more setup
- Slower processing
- Uses more CPU/memory

**Setup Steps:**

1. **Install Whisper**:
   ```bash
   pip install openai-whisper
   ```

2. **Update AudioTranscriber** to use local Whisper via command line:

   ```typescript
   private async transcribeWithLocalWhisper(audioPath: string): Promise<string> {
     return new Promise((resolve, reject) => {
       exec(
         `whisper "${audioPath}" --model base --language en --output_format txt`,
         (error, stdout, stderr) => {
           if (error) {
             reject(error);
             return;
           }
           // Read transcription file
           const txtPath = audioPath.replace('.wav', '.txt');
           const transcription = fs.readFileSync(txtPath, 'utf-8');
           resolve(transcription);
         }
       );
     });
   }
   ```

---

## Current Implementation

The current code uses **Google Cloud Speech-to-Text** with graceful fallback:

- ✅ If Google Cloud credentials are set → Uses Speech-to-Text API
- ⚠️ If not set → Falls back gracefully (continues without transcription)

## Testing

1. **Test with a video that has speech**:
   ```bash
   # Example: YouTube video with narration
   curl -X POST http://localhost:3000/extract \
     -H "Content-Type: application/json" \
     -d '{
       "type": "url",
       "data": "https://www.youtube.com/watch?v=VIDEO_WITH_SPEECH"
     }'
   ```

2. **Check logs**:
   - Look for `[Extract] Transcribing audio...`
   - Look for `[Extract] Transcription: ...`
   - Check `sourceMetadata.transcription` in response

3. **Verify transcription is used**:
   - The transcription is combined with frame analysis
   - Event extraction should be more accurate with audio

## Troubleshooting

### Issue: "Speech client not initialized"
**Solution**: Set up Google Cloud credentials (see Option 1)

### Issue: "Transcription returns empty"
**Solution**: 
- Check if video has audio track
- Verify audio file was created (check `temp/video-frames/` directory)
- Check audio file format (should be WAV, 16kHz, mono)

### Issue: "Transcription is slow"
**Solution**: 
- This is normal for longer videos
- Consider limiting video length (currently 10 minutes max)
- For production, use async processing with a queue

## Next Steps

1. ✅ Choose transcription service (Google Cloud, OpenAI, or Local)
2. ✅ Set up API keys/credentials
3. ✅ Test with a video containing speech
4. ✅ Verify transcription improves event extraction

## Performance Notes

- **Audio extraction**: ~1-2 seconds
- **Transcription**: 
  - Google Cloud: ~2-5 seconds per minute of audio
  - OpenAI Whisper: ~3-6 seconds per minute
  - Local Whisper: ~10-30 seconds per minute (depends on hardware)

For videos longer than 5 minutes, consider:
- Extracting only first 2-3 minutes of audio
- Using async processing
- Caching transcriptions

