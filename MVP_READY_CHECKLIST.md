# MVP Ready Checklist

Final checklist before starting your MVP.

---

## ✅ Required for MVP

### 1. Service Account Key
- [x] `service-account-key.json` in `backend/` folder
- [x] `.env` has `GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json`

### 2. Gemini API Key
- [x] Get from: https://makersuite.google.com/app/apikey
- [x] Add to `.env`: `GEMINI_API_KEY=your-key`

### 3. Google Maps API Key
- [x] Get from: Google Cloud Console → Credentials
- [x] Enable: Places API, Geocoding API, Time Zone API
- [x] Add to `.env`: `GOOGLE_MAPS_API_KEY=your-key`

### 4. Calendar Configuration
- [x] Calendar created and shared with service account
- [x] Calendar ID in `.env`: `GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com`

### 5. Project Configuration
- [x] Project ID in `.env`: `GOOGLE_CLOUD_PROJECT_ID=your-project-id`
- [x] Region in `.env`: `GOOGLE_CLOUD_REGION=us-central1`

### 6. Server Configuration
- [x] Port: `PORT=3000` (default)
- [x] CORS: `CORS_ORIGIN=http://localhost:19006` (for Expo)

---

## ❌ NOT Required for MVP

### ADK / Agent Engine
- **Not needed!** We use direct API calls, not Vertex AI Agent Engine
- The code uses:
  - Direct Gemini API calls
  - Direct Google Calendar API calls
  - Direct Google Maps API calls
- No ADK setup required

### OAuth
- **Not needed for MVP!** We use service account
- OAuth is only needed for user-specific calendars or timeline data
- Service account works perfectly for shared calendar

### Additional Server Config
- Basic config is already in `.env`
- No additional setup needed

---

## 🚀 Starting the MVP

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Mobile:**
```bash
cd mobile
npm install
```

### Step 2: Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 3000
📋 Health check: http://localhost:3000/health
```

### Step 3: Test Backend

```bash
curl http://localhost:3000/health
```

Should return: `{"status":"ok","timestamp":"..."}`

### Step 4: Start Mobile App

```bash
cd mobile
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Or scan QR code with Expo Go app

### Step 5: Test End-to-End

1. **Test Image Extraction:**
   - Tap "Capture Flyer"
   - Take photo of event flyer
   - Review extracted event
   - Save to calendar

2. **Test URL Extraction:**
   - Tap "Share URL"
   - Paste Instagram/TikTok event URL
   - Review and save

3. **Test Text Extraction:**
   - Paste event text
   - Review and save

4. **Verify in Calendar:**
   - Check your Google Calendar
   - Event should appear!

---

## 🎯 What You Have vs. What You Need

### ✅ You Have (Current Setup):
- Service account authentication
- Direct API calls (Gemini, Calendar, Maps)
- Shared calendar access
- All required API keys

### ❌ You DON'T Need:
- ADK / Agent Engine (we use direct APIs)
- OAuth (service account works)
- Vertex AI Agent setup
- Complex orchestration

**Your current setup is perfect for MVP!** 🎉

---

## 🔍 Quick Verification

Run this to check everything:

```bash
cd backend
# Check service account
[ -f service-account-key.json ] && echo "✅ Service account" || echo "❌ Service account"

# Check API keys
grep -q "GEMINI_API_KEY=" .env && ! grep -q "GEMINI_API_KEY=your" .env && echo "✅ Gemini" || echo "❌ Gemini"
grep -q "GOOGLE_MAPS_API_KEY=" .env && ! grep -q "GOOGLE_MAPS_API_KEY=your" .env && echo "✅ Maps" || echo "❌ Maps"
grep -q "GOOGLE_CALENDAR_ID=" .env && ! grep -q "GOOGLE_CALENDAR_ID=primary" .env && echo "✅ Calendar" || echo "❌ Calendar"
```

---

## 🎉 You're Ready!

Once all items are checked:
1. Install dependencies
2. Start backend: `npm run dev`
3. Start mobile: `npm start`
4. Test the app!

**No ADK needed - you're using direct API calls which is simpler and works great for MVP!** 🚀

