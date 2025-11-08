# API Keys & Configuration Setup

This document outlines all the API keys, credentials, and configuration needed to run the Cal-MGR MVP.

---

## Required API Keys & Credentials

### 1. Google Cloud Project Setup

**What you need:**
- Google Cloud Project with billing enabled
- Service Account with appropriate permissions

**Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable billing (required for Vertex AI and Maps API)
4. Enable the following APIs:
   - **Vertex AI API**
   - **Google Calendar API**
   - **Maps JavaScript API** (for Places)
   - **Geocoding API** (for Places resolution)
   - **Time Zone API** (for timezone resolution)

**Service Account:**
1. Go to **IAM & Admin** → **Service Accounts**
2. Create a new service account
3. Grant roles:
   - `Vertex AI User`
   - `Calendar API User`
4. Create a JSON key and download it
5. Save as `backend/service-account-key.json`

**Environment Variable:**
```bash
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
```

---

### 2. Gemini API Key

**What you need:**
- Gemini API key for multimodal extraction

**Steps:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the API key

**Environment Variable:**
```bash
GEMINI_API_KEY=your-gemini-api-key-here
```

**Note:** You can also use Vertex AI Gemini models, but for MVP, the direct API is simpler.

---

### 3. Google Maps API Key

**What you need:**
- Google Maps API key for Places and Timezone resolution

**Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click "Create Credentials" → "API Key"
4. Restrict the key to:
   - **Places API**
   - **Geocoding API**
   - **Time Zone API**
5. Copy the API key

**Environment Variable:**
```bash
GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

**Cost Note:** Free tier includes $200/month credit. Places API costs ~$0.017 per request.

---

### 4. Google Calendar OAuth (Optional for MVP)

**What you need:**
- OAuth 2.0 credentials for user calendar access

**Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Click "Create Credentials" → "OAuth 2.0 Client ID"
4. Application type: **Web application**
5. Authorized redirect URIs: `http://localhost:3000/auth/callback`
6. Copy Client ID and Client Secret

**Environment Variables:**
```bash
GOOGLE_CALENDAR_CLIENT_ID=your-client-id-here
GOOGLE_CALENDAR_CLIENT_SECRET=your-client-secret-here
GOOGLE_CALENDAR_REDIRECT_URI=http://localhost:3000/auth/callback
```

**Note:** For MVP, we're using a service account that has access to a shared calendar. For production, you'll need OAuth for user-specific calendars.

---

### 5. Vertex AI Agent Engine (Post-MVP)

**What you need:**
- Vertex AI Agent Engine agent ID (if using Agent Engine for orchestration)

**Steps:**
1. Go to [Vertex AI Console](https://console.cloud.google.com/vertex-ai)
2. Navigate to **Agent Builder** (if available)
3. Create an agent and note the Agent ID

**Environment Variables:**
```bash
ADK_AGENT_ID=your-agent-id-here
ADK_PROJECT_ID=your-project-id-here
```

**Note:** For MVP, we're using direct API calls instead of Agent Engine. This can be refactored later.

---

## Environment Configuration

### Backend `.env` File

Create `backend/.env` from `backend/.env.example`:

```bash
# Google Cloud Configuration
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_REGION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json

# Vertex AI Configuration
VERTEX_AI_LOCATION=us-central1
VERTEX_AI_MODEL=gemini-1.5-pro

# Gemini API
GEMINI_API_KEY=your-gemini-api-key

# Google Calendar API (Service Account)
# OAuth credentials only needed for user-specific calendars
GOOGLE_CALENDAR_CLIENT_ID=your-client-id
GOOGLE_CALENDAR_CLIENT_SECRET=your-client-secret
GOOGLE_CALENDAR_REDIRECT_URI=http://localhost:3000/auth/callback

# Google Maps/Places API
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Server Configuration
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:19006
```

### Mobile App Configuration

Update `mobile/src/config/api.ts`:

```typescript
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000'  // For local development
  : 'https://your-production-api.com';  // For production
```

**For iOS Simulator:** Use `http://localhost:3000`  
**For Android Emulator:** Use `http://10.0.2.2:3000`  
**For Physical Device:** Use your computer's local IP (e.g., `http://192.168.1.100:3000`)

---

## Quick Setup Checklist

- [ ] Google Cloud project created with billing enabled
- [ ] Required APIs enabled (Vertex AI, Calendar, Maps, Geocoding, Time Zone)
- [ ] Service account created with JSON key downloaded
- [ ] Service account key saved as `backend/service-account-key.json`
- [ ] Gemini API key obtained from Google AI Studio
- [ ] Google Maps API key created and restricted
- [ ] `.env` file created in `backend/` with all keys
- [ ] Mobile app API URL configured for your development environment

---

## Cost Estimates (MVP)

**Per Event Creation:**
- Gemini API: ~$0.001-0.002 (multimodal extraction)
- Places API: ~$0.017 (location resolution)
- Time Zone API: ~$0.005 (timezone resolution)
- Calendar API: Free (within quotas)

**Total per event:** ~$0.02-0.03

**Monthly (100 events):** ~$2-3

**Note:** Google provides $200/month free credit for Maps API, so you can process ~11,000 events/month before hitting costs.

---

## Security Best Practices

1. **Never commit API keys to git**
   - `.env` files are in `.gitignore`
   - Use environment variables in production
   - Rotate keys if accidentally exposed

2. **Restrict API keys**
   - Restrict Maps API key to specific APIs
   - Restrict by IP address (for production)
   - Use service accounts with minimal permissions

3. **Service Account Security**
   - Store `service-account-key.json` securely
   - Don't commit to version control
   - Use separate service accounts for dev/prod

---

## Troubleshooting

### "API key not valid"
- Check that the key is copied correctly (no extra spaces)
- Verify the API is enabled in Google Cloud Console
- Check API key restrictions

### "Service account does not have permission"
- Verify service account has `Vertex AI User` and `Calendar API User` roles
- Check that the JSON key file path is correct

### "Quota exceeded"
- Check billing is enabled
- Verify you're within free tier limits
- Check API quotas in Cloud Console

### "CORS error" (mobile app)
- Verify `CORS_ORIGIN` in backend `.env` matches your Expo dev server URL
- Check that backend is running and accessible

---

## Next Steps

Once all API keys are configured:

1. Start backend: `cd backend && npm install && npm run dev`
2. Start mobile app: `cd mobile && npm install && npm start`
3. Test extraction: Capture a flyer or paste text
4. Verify calendar event creation

See [WORKFLOW.md](./WORKFLOW.md) for detailed workflow documentation.

