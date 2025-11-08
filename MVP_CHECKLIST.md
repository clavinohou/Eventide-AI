# MVP Setup Checklist

Complete this checklist to get your Cal-MGR app running at MVP level.

---

## ✅ Step 1: API Keys & Credentials

- [ ] **Gemini API Key**
  - Get from: https://makersuite.google.com/app/apikey
  - Add to `.env`: `GEMINI_API_KEY=your-key`

- [ ] **Google Maps API Key**
  - Enable APIs: Places API, Geocoding API, Time Zone API
  - Get from: Google Cloud Console → APIs & Services → Credentials
  - Add to `.env`: `GOOGLE_MAPS_API_KEY=your-key`

- [ ] **Google Service Account**
  - Create service account in Google Cloud Console
  - Grant roles: `Calendar API User`, `Vertex AI User`
  - Download JSON key → Save as `backend/service-account-key.json`
  - Add to `.env`: `GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json`

- [ ] **Google Cloud Project**
  - Create project with billing enabled
  - Enable APIs: Calendar API, Vertex AI API, Maps APIs
  - Add to `.env`: `GOOGLE_CLOUD_PROJECT_ID=your-project-id`

---

## ✅ Step 2: Backend Setup

- [ ] **Install Dependencies**
  ```bash
  cd backend
  npm install
  ```

- [ ] **Configure .env File**
  - Copy `.env.example` to `.env` (if not done)
  - Fill in all API keys (see Step 1)
  - Verify `PORT=3000` and `CORS_ORIGIN=http://localhost:19006`

- [ ] **Place Service Account Key**
  - Ensure `service-account-key.json` is in `backend/` folder
  - Verify path in `.env` matches: `./service-account-key.json`

- [ ] **Test Backend Server**
  ```bash
  cd backend
  npm run dev
  ```
  - Should see: `🚀 Server running on port 3000`
  - Test: `curl http://localhost:3000/health`
  - Should return: `{"status":"ok","timestamp":"..."}`

---

## ✅ Step 3: Calendar Access Setup

**⚠️ IMPORTANT**: Service accounts can't access user calendars directly. Choose one:

### Option A: Shared Calendar (Easiest for MVP)
- [ ] Create a Google Calendar (e.g., "Cal-MGR Events")
- [ ] Share it with your service account email (found in `service-account-key.json`)
- [ ] Grant "Make changes to events" permission
- [ ] Update code to use calendar ID instead of 'primary' (see below)

### Option B: Use OAuth (More Complex)
- [ ] Set up OAuth 2.0 credentials in Google Cloud Console
- [ ] Implement OAuth flow in backend
- [ ] Store user tokens
- [ ] Use user tokens for calendar access

**For MVP, use Option A** - it's simpler and works immediately.

---

## ✅ Step 4: Mobile App Setup

- [ ] **Install Dependencies**
  ```bash
  cd mobile
  npm install
  ```

- [ ] **Configure API URL**
  - Edit `mobile/src/config/api.ts`
  - For iOS Simulator: `http://localhost:3000` (default)
  - For Android Emulator: `http://10.0.2.2:3000`
  - For Physical Device: `http://YOUR_COMPUTER_IP:3000`

- [ ] **Test Mobile App**
  ```bash
  cd mobile
  npm start
  ```
  - Press `i` for iOS simulator
  - Press `a` for Android emulator
  - Or scan QR code with Expo Go app

---

## ✅ Step 5: Code Updates (If Using Shared Calendar)

If you chose Option A (shared calendar), update the calendar ID:

**File**: `backend/src/routes/extract.ts` and `backend/src/routes/save.ts`

Change:
```typescript
calendarService.checkConflicts('primary', ...)
calendarService.createEvent('primary', ...)
```

To:
```typescript
calendarService.checkConflicts('your-calendar-id@group.calendar.google.com', ...)
calendarService.createEvent('your-calendar-id@group.calendar.google.com', ...)
```

Or better: Add to `.env`:
```env
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
```

Then update code to use `process.env.GOOGLE_CALENDAR_ID || 'primary'`

---

## ✅ Step 6: End-to-End Testing

- [ ] **Test Image Extraction**
  - Open mobile app
  - Tap "Capture Flyer"
  - Take photo of event flyer
  - Verify extraction shows title, date, time, location
  - Save to calendar
  - Check Google Calendar for new event

- [ ] **Test URL Extraction**
  - Tap "Share URL"
  - Paste Instagram/TikTok event URL
  - Verify extraction
  - Save to calendar

- [ ] **Test Text Extraction**
  - Paste event text (e.g., "Concert Friday 8pm at Blue Note")
  - Verify extraction
  - Save to calendar

- [ ] **Test Conflict Detection**
  - Create an event manually in calendar
  - Extract an event that overlaps
  - Verify conflicts are shown in review screen

---

## ✅ Step 7: Error Handling Verification

- [ ] **Test API Errors**
  - Disconnect internet → Should show network error
  - Invalid API key → Should show error message
  - Missing fields → Should show validation error

- [ ] **Test Edge Cases**
  - Image with no text → Should handle gracefully
  - URL that can't be expanded → Should still extract
  - Text with no date → Should use default or show error

---

## 🚨 Common Issues & Fixes

### Backend won't start
- **Issue**: Missing dependencies
- **Fix**: `cd backend && npm install`

### "Service account does not have permission"
- **Issue**: Service account lacks Calendar API access
- **Fix**: Grant `Calendar API User` role in Google Cloud Console

### "Calendar not found" or "Forbidden"
- **Issue**: Service account can't access 'primary' calendar
- **Fix**: Use shared calendar (Option A above) or implement OAuth

### Mobile app can't connect to backend
- **Issue**: CORS or network issue
- **Fix**: 
  - Check `CORS_ORIGIN` in backend `.env` matches Expo URL
  - For physical device, use computer's IP address
  - Verify backend is running: `curl http://localhost:3000/health`

### Extraction fails
- **Issue**: Invalid Gemini API key or quota exceeded
- **Fix**: 
  - Verify API key in `.env`
  - Check billing is enabled in Google Cloud
  - Check API quotas in Cloud Console

---

## 🎯 MVP Definition of Done

Your app is at MVP level when:

- ✅ Backend server runs without errors
- ✅ Mobile app connects to backend
- ✅ Can extract events from images, URLs, and text
- ✅ Can save events to Google Calendar
- ✅ Conflict detection works
- ✅ Basic error handling (shows user-friendly messages)

---

## 📝 Next Steps After MVP

Once MVP is working:

1. **Add Travel Time** (Sprint 2)
   - Integrate DirectionsEstimate API
   - Add travel buffer to events

2. **Improve UI/UX**
   - Better loading states
   - Error recovery flows
   - Success animations

3. **Add Media Generation** (Post-MVP)
   - Imagen poster generation
   - Veo day-preview videos

4. **Production Ready**
   - OAuth for user-specific calendars
   - Deploy to Cloud Run / App Store
   - Add monitoring and logging

---

## 🆘 Need Help?

- **API Keys**: See [API_KEYS_SETUP.md](./API_KEYS_SETUP.md)
- **Workflow**: See [WORKFLOW.md](./WORKFLOW.md)
- **Quick Start**: See [QUICK_START.md](./QUICK_START.md)

