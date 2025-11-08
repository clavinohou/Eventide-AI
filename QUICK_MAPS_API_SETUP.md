# Quick Guide: Get Google Maps API Key

Simple steps to get your Google Maps API key.

---

## 🎯 Quick Steps

1. **Go to Google Cloud Console**
   - Sign in with your Google account (can be different from service account)
   - URL: https://console.cloud.google.com/
    
2. **Create or Select Project**
   - Create new project or select existing one
   - Name it whatever you like (e.g., "Cal-MGR Maps")

3. **Enable Required APIs**
   - Go to **"APIs & Services"** → **"Library"**
   - Enable these APIs:
     - ✅ **Places API**
     - ✅ **Geocoding API**
     - ✅ **Time Zone API**
   - Click "ENABLE" for each

4. **Create API Key**
   - Go to **"APIs & Services"** → **"Credentials"**
   - Click **"Create Credentials"** → **"API Key"**
   - A key will be created (starts with `AIza...`)
   - **Copy the key immediately**

5. **Restrict the Key (Recommended)**
   - Click on the API key you just created
   - Under **"API restrictions"**:
     - Select **"Restrict key"**
     - Check only:
       - ✅ Places API
       - ✅ Geocoding API
       - ✅ Time Zone API
   - Click **"SAVE"**

6. **Add to .env**
   - Open `backend/.env`
   - Find: `GOOGLE_MAPS_API_KEY=your-google-maps-api-key`
   - Replace with: `GOOGLE_MAPS_API_KEY=AIzaSy...` (your actual key)
   - Save

---

## ✅ Verification

After adding the key:

```bash
cd backend
grep "GOOGLE_MAPS_API_KEY" .env
```

Should show your key (not placeholder).

---

## 💰 Cost

- **Free Tier**: $200/month credit
- **Places API**: ~$0.017 per request
- **Geocoding API**: ~$0.005 per request
- **Time Zone API**: ~$0.005 per request
- **For MVP**: Free tier is more than enough!

---

## 🎯 What This API Does

- **Places API**: Resolves location names → coordinates
- **Geocoding API**: Converts addresses → coordinates
- **Time Zone API**: Gets timezone for coordinates

**No personal data accessed** - just public location information.

---

## 🆘 Troubleshooting

**"I can't create an API key"**
- Make sure you're signed in
- Check that you have a project selected
- Try creating a new project

**"The key doesn't work"**
- Make sure APIs are enabled (Places, Geocoding, Time Zone)
- Check that billing is enabled (even for free tier)
- Verify the key is copied correctly (no spaces)

**"I lost my key"**
- Go back to Credentials
- You can view existing keys or create a new one

---

**Once you have the key, add it to `backend/.env` and you're ready!** 🚀

