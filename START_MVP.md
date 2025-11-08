# How to Start Your MVP

Complete guide to starting the backend and mobile app, including Expo Go setup.

---

## ✅ Verification Complete!

All your configuration is set:
- ✅ Service Account Key
- ✅ Gemini API Key
- ✅ Google Maps API Key
- ✅ Calendar ID
- ✅ Project Configuration
- ✅ Server Configuration

**You're ready to start!** 🚀

---

## 🚀 Step 1: Install Dependencies

### Backend Dependencies

```bash
cd backend
npm install
```

This will install:
- Express.js
- Google APIs (Calendar, Maps)
- Gemini API client
- TypeScript and dev tools

### Mobile Dependencies

```bash
cd mobile
npm install
```

This will install:
- Expo and React Native
- Navigation
- Camera and image picker
- API client

---

## 🖥️ Step 2: Start Backend Server

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

**You should see:**
```
🚀 Server running on port 3000
📋 Health check: http://localhost:3000/health
```

**If you see errors:**
- Check that all API keys are in `.env`
- Verify `service-account-key.json` exists
- Make sure port 3000 is not in use

### Test Backend

Open another terminal and test:

```bash
curl http://localhost:3000/health
```

Should return: `{"status":"ok","timestamp":"..."}`

---

## 📱 Step 3: Start Mobile App

### Terminal 2 - Mobile

```bash
cd mobile
npm start
```

**You should see:**
- Expo DevTools opens in browser
- QR code displayed in terminal
- Options: `[i] iOS simulator`, `[a] Android emulator`

---

## 📲 Step 4: Use Expo Go on Your Phone

### Option A: Physical Device (Recommended for Testing)

1. **Install Expo Go**:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Connect to Same Network**:
   - Make sure your phone and computer are on the same WiFi network

3. **Scan QR Code**:
   - Open Expo Go app
   - Tap "Scan QR Code"
   - Scan the QR code from the terminal
   - App will load!

4. **If QR Code Doesn't Work**:
   - In Expo Go, tap "Enter URL manually"
   - Enter: `exp://YOUR_COMPUTER_IP:8081`
   - Find your IP: 
     - Mac: `ifconfig | grep "inet " | grep -v 127.0.0.1`
     - Windows: `ipconfig` (look for IPv4 Address)

### Option B: iOS Simulator (Mac Only)

1. **Press `i`** in the Expo terminal
2. iOS Simulator will open automatically
3. App loads in simulator

### Option C: Android Emulator

1. **Press `a`** in the Expo terminal
2. Android Emulator must be running first
3. App loads in emulator

---

## 🔧 Step 5: Configure API URL for Physical Device

If using Expo Go on a physical device, you need to update the API URL:

### Find Your Computer's IP Address

**Mac/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" (e.g., `192.168.1.100`)

### Update Mobile App Config

Edit `mobile/src/config/api.ts`:

```typescript
export const API_BASE_URL = __DEV__
  ? 'http://192.168.1.100:3000'  // ← Replace with YOUR computer's IP
  : 'https://your-production-api.com';
```

**Important**: Replace `192.168.1.100` with your actual IP address!

### Restart Mobile App

After changing the config:
1. Stop Expo (Ctrl+C)
2. Restart: `npm start`
3. Reload app in Expo Go (shake device → "Reload")

---

## 🧪 Step 6: Test the App

### Test 1: Image Extraction

1. Open the app in Expo Go
2. Tap **"📷 Capture Flyer"**
3. Take a photo of an event flyer (or use a test image)
4. Wait for extraction (should take a few seconds)
5. Review the extracted event
6. Tap **"Save to Calendar"**
7. Check your Google Calendar - event should appear!

### Test 2: URL Extraction

1. Tap **"🔗 Share URL"**
2. Enter an Instagram/TikTok event URL
3. Review extracted event
4. Save to calendar

### Test 3: Text Extraction

1. Paste event text (e.g., "Concert Friday 8pm at Blue Note")
2. Tap **"Extract Event"**
3. Review and save

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error: "Port 3000 already in use"**
```bash
# Find what's using port 3000
lsof -i :3000
# Kill it or change PORT in .env
```

**Error: "Cannot find module"**
```bash
cd backend
npm install
```

**Error: "Service account not found"**
- Check `service-account-key.json` is in `backend/` folder
- Verify path in `.env`: `GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json`

### Mobile App Can't Connect

**"Network error" or "Connection refused"**
- Make sure backend is running (`npm run dev`)
- Check API URL in `mobile/src/config/api.ts`
- For physical device: Use your computer's IP, not `localhost`
- Make sure phone and computer are on same WiFi

**"Expo Go can't find app"**
- Make sure you're scanning the QR code from the correct terminal
- Try "Enter URL manually" in Expo Go
- Check that Expo dev server is running

### Extraction Fails

**"Extraction failed" error**
- Check Gemini API key is correct in `.env`
- Verify billing is enabled in Google Cloud
- Check API quotas in Cloud Console

**"Location not found"**
- Check Google Maps API key is correct
- Verify Places API is enabled
- Check API quotas

### Calendar Write Fails

**"Calendar not found" or "Forbidden"**
- Verify calendar is shared with service account email
- Check calendar ID in `.env` is correct
- Make sure service account has "Make changes to events" permission

---

## 📋 Quick Reference

### Start Commands

**Backend:**
```bash
cd backend
npm run dev
```

**Mobile:**
```bash
cd mobile
npm start
```

### Test Endpoints

**Health Check:**
```bash
curl http://localhost:3000/health
```

**Test Extraction (example):**
```bash
curl -X POST http://localhost:3000/extract \
  -H "Content-Type: application/json" \
  -d '{"type":"text","data":"Concert Friday 8pm at Blue Note"}'
```

---

## 🎯 What to Expect

### First Time Setup:
1. Install dependencies: ~2-3 minutes
2. Start backend: ~10 seconds
3. Start mobile: ~30 seconds
4. Load in Expo Go: ~30 seconds

### App Usage:
- Image extraction: ~3-5 seconds
- URL extraction: ~5-8 seconds
- Text extraction: ~2-3 seconds
- Calendar save: ~1-2 seconds

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Backend shows "Server running on port 3000"
- ✅ Mobile app loads in Expo Go
- ✅ You can capture/input events
- ✅ Events extract successfully
- ✅ Events appear in your Google Calendar

---

## 🎉 You're All Set!

1. **Backend running** → Terminal 1: `npm run dev`
2. **Mobile running** → Terminal 2: `npm start`
3. **Expo Go connected** → Scan QR code or use simulator
4. **Test the app** → Create your first event!

**Have fun testing your MVP!** 🚀

