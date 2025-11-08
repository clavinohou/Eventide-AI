# Quick Start Guide

Get Cal-MGR running in 10 minutes.

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Google Cloud account (with billing enabled)
- Expo CLI: `npm install -g expo-cli` (optional, but recommended)

---

## Step 1: Set Up API Keys

See [API_KEYS_SETUP.md](./API_KEYS_SETUP.md) for detailed instructions.

**Quick checklist:**
1. Create Google Cloud project
2. Enable APIs: Vertex AI, Calendar, Maps, Geocoding, Time Zone
3. Create service account → Download JSON key
4. Get Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
5. Get Google Maps API key from Cloud Console

---

## Step 2: Configure Backend

```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_REGION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json

GEMINI_API_KEY=your-gemini-api-key
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:19006
EOF

# Place your service account key
# Download from Cloud Console → Save as service-account-key.json
```

---

## Step 3: Start Backend Server

```bash
cd backend
npm run dev
```

Server should start on `http://localhost:3000`

Test it:
```bash
curl http://localhost:3000/health
```

---

## Step 4: Configure Mobile App

```bash
cd mobile
npm install
```

Update `mobile/src/config/api.ts` if needed (defaults to `http://localhost:3000` for dev).

**For physical device testing:**
- Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
- Update `API_BASE_URL` to `http://YOUR_IP:3000`

---

## Step 5: Start Mobile App

```bash
cd mobile
npm start
```

This starts the Expo dev server. Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app (physical device)

---

## Step 6: Test the App

1. **Test Image Extraction:**
   - Tap "Capture Flyer"
   - Take a photo of an event flyer
   - Review extracted event
   - Save to calendar

2. **Test URL Extraction:**
   - Tap "Share URL"
   - Paste an Instagram/TikTok event URL
   - Review extracted event
   - Save to calendar

3. **Test Text Extraction:**
   - Paste event text (e.g., "Concert on Friday, March 15 at 8pm at Blue Note")
   - Tap "Extract Event"
   - Review and save

---

## Troubleshooting

### Backend won't start
- Check `.env` file exists and has all keys
- Verify `service-account-key.json` is in `backend/` folder
- Check Node.js version: `node --version` (should be 18+)

### Mobile app can't connect to backend
- Verify backend is running: `curl http://localhost:3000/health`
- Check `CORS_ORIGIN` in backend `.env` matches Expo URL
- For physical device, use computer's IP address

### Extraction fails
- Check Gemini API key is valid
- Verify Google Cloud project has billing enabled
- Check API quotas in Cloud Console

### Calendar write fails
- Verify service account has Calendar API access
- Check service account has `Calendar API User` role
- Ensure Calendar API is enabled in Cloud Console

---

## Next Steps

- Review [WORKFLOW.md](./WORKFLOW.md) for detailed architecture
- Check [SPRINT_1_P0_ISSUES.md](./SPRINT_1_P0_ISSUES.md) for development tasks
- See [TEST_DATASET.md](./TEST_DATASET.md) for test cases

---

## Development Commands

**Backend:**
```bash
cd backend
npm run dev      # Start dev server with hot reload
npm run build    # Build for production
npm start        # Run production build
```

**Mobile:**
```bash
cd mobile
npm start        # Start Expo dev server
npm run ios      # Start iOS simulator
npm run android  # Start Android emulator
```

---

## Project Structure

```
cal-mgr/
├── backend/          # Express.js API
│   ├── src/
│   │   ├── routes/   # API endpoints
│   │   └── services/ # Business logic
│   └── .env          # API keys (create this)
│
├── mobile/           # Expo React Native app
│   ├── src/
│   │   ├── screens/  # App screens
│   │   └── services/ # API client
│   └── App.tsx       # Entry point
│
└── docs/             # Documentation
```

---

## Need Help?

- **API Keys**: See [API_KEYS_SETUP.md](./API_KEYS_SETUP.md)
- **Workflow**: See [WORKFLOW.md](./WORKFLOW.md)
- **Architecture**: See [PROJECT_PLAN.md](./PROJECT_PLAN.md)

