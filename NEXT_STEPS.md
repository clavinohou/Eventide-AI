# Next Steps: Complete MVP Setup

Your backend is running! Here's what to do next.

---

## ✅ Current Status

- ✅ Backend server running on port 3000
- ✅ Health endpoint working
- ✅ Mobile app dependencies installed
- ✅ API configuration ready

---

## 📱 Step 1: Start Mobile App

### Open a New Terminal

**Terminal 2 - Mobile App:**

```bash
cd mobile
npm start
```

**You'll see:**
- Expo DevTools opens in browser
- QR code in terminal
- Options: `[i] iOS simulator`, `[a] Android emulator`

---

## 📲 Step 2: Choose Your Testing Method

### Option A: iOS Simulator (Mac Only) ⭐ Easiest

1. **Press `i`** in the Expo terminal
2. iOS Simulator opens automatically
3. App loads in simulator
4. **No configuration needed** - `localhost:3000` works!

### Option B: Android Emulator

1. **Start Android Emulator first** (Android Studio)
2. **Press `a`** in the Expo terminal
3. App loads in emulator
4. **For Android emulator**, update API URL to `http://10.0.2.2:3000`

### Option C: Physical Device (Expo Go)

1. **Install Expo Go** on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Update API URL** for physical device:
   - Find your computer's IP:
     ```bash
     # Mac/Linux
     ifconfig | grep "inet " | grep -v 127.0.0.1
     
     # Windows
     ipconfig
     ```
   - Edit `mobile/src/config/api.ts`:
     ```typescript
     export const API_BASE_URL = __DEV__
       ? 'http://192.168.1.100:3000'  // ← Your computer's IP
       : 'https://your-production-api.com';
     ```
   - Restart Expo: Stop (Ctrl+C) → `npm start`
   - Scan QR code with Expo Go

---

## 🧪 Step 3: Test the App

### Test 1: Health Check (Optional)

In the mobile app, you can test the connection by checking if the backend is reachable.

### Test 2: Image Extraction

1. **Tap "📷 Capture Flyer"**
2. **Take a photo** of an event flyer (or use a test image)
3. **Wait for extraction** (3-5 seconds)
4. **Review** the extracted event:
   - Title
   - Date & Time
   - Location
   - Conflicts (if any)
5. **Edit if needed**
6. **Tap "Save to Calendar"**
7. **Check Google Calendar** - event should appear!

### Test 3: URL Extraction

1. **Tap "🔗 Share URL"**
2. **Enter an Instagram/TikTok event URL**
3. **Review extracted event**
4. **Save to calendar**

### Test 4: Text Extraction

1. **Paste event text** (e.g., "Concert Friday 8pm at Blue Note")
2. **Tap "Extract Event"**
3. **Review and save**

---

## 🎯 What to Expect

### Successful Extraction:
- ✅ Event details extracted (title, date, time, location)
- ✅ Location resolved to coordinates
- ✅ Timezone detected
- ✅ Conflicts shown (if any)
- ✅ Event saved to calendar

### In Google Calendar:
- ✅ Event appears in your shared calendar
- ✅ Correct date and time
- ✅ Location included
- ✅ Description with source info

---

## 🐛 Troubleshooting

### Mobile App Can't Connect

**"Network error" or "Connection refused"**

**For iOS Simulator:**
- Should work with `localhost:3000` (current config)
- Make sure backend is running

**For Physical Device:**
- Update `mobile/src/config/api.ts` with your computer's IP
- Make sure phone and computer are on same WiFi
- Make sure backend is running

**For Android Emulator:**
- Update API URL to `http://10.0.2.2:3000`
- Restart Expo after changing

### Extraction Fails

**"Extraction failed" error:**
- Check Gemini API key in `.env`
- Verify billing is enabled in Google Cloud
- Check backend logs for error details

**"Location not found":**
- Check Google Maps API key
- Verify Places API is enabled
- Check API quotas

### Calendar Write Fails

**"Calendar not found" or "Forbidden":**
- Verify calendar is shared with service account
- Check calendar ID in `.env`
- Make sure service account has "Make changes to events" permission

---

## ✅ Success Checklist

- [ ] Backend running (`npm run dev`)
- [ ] Mobile app started (`npm start`)
- [ ] App loaded in simulator/Expo Go
- [ ] Can capture/input events
- [ ] Events extract successfully
- [ ] Events save to calendar
- [ ] Events appear in Google Calendar

---

## 🎉 You're Ready!

1. **Start mobile app**: `cd mobile && npm start`
2. **Choose testing method** (simulator or Expo Go)
3. **Test creating an event**
4. **Verify in Google Calendar**

**Your MVP is ready to test!** 🚀

