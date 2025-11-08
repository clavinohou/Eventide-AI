# Google Maps API Key Setup

Guide for setting up Google Maps API key (can use different Google account if preferred).

---

## 🎯 Quick Answer

**Yes, using a different Google account is fine!** 

However, the Google Maps API (Places, Geocoding, Time Zone) **doesn't access personal timeline data**. It only:
- Resolves location names to coordinates
- Gets timezone information
- Finds place details

But if you prefer to use a different account, that's totally fine!

---

## 📋 What Google Maps API Actually Does

The Maps API we're using does **NOT** access:
- ❌ Your location history
- ❌ Your timeline
- ❌ Personal location data
- ❌ Any user-specific information

It **ONLY** does:
- ✅ Convert location names → coordinates (e.g., "Blue Note NYC" → lat/lng)
- ✅ Get timezone for coordinates
- ✅ Find place details (address, place ID)

**It's a public API** - no personal data involved.

---

## 🔑 Setting Up Maps API Key (Any Account)

### Step 1: Go to Google Cloud Console

1. Sign in with **your preferred Google account** (can be different from service account)
2. Go to [Google Cloud Console](https://console.cloud.google.com/)
3. Create a new project or select existing one

### Step 2: Enable Required APIs

1. Go to **"APIs & Services"** → **"Library"**
2. Enable these APIs:
   - **Places API** (for location resolution)
   - **Geocoding API** (for address lookup)
   - **Time Zone API** (for timezone resolution)
3. Click "ENABLE" for each

### Step 3: Create API Key

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"API Key"**
3. A key will be created automatically
4. **Copy the key** (looks like: `AIzaSy...`)

### Step 4: Restrict the Key (Recommended)

1. Click on the API key you just created
2. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Check only:
     - ✅ Places API
     - ✅ Geocoding API
     - ✅ Time Zone API
3. Click **"SAVE"**

### Step 5: Add to .env

1. Open `backend/.env`
2. Find: `GOOGLE_MAPS_API_KEY=your-google-maps-api-key`
3. Replace with: `GOOGLE_MAPS_API_KEY=AIzaSy...` (your actual key)
4. Save

---

## ✅ Using Different Account is Fine

**Pros:**
- ✅ Separate billing/project management
- ✅ Better organization if you have multiple projects
- ✅ Can use free tier credits separately

**Cons:**
- ⚠️ Need to manage two Google Cloud projects
- ⚠️ Two sets of billing/quotas

**For MVP**: Either approach works! Use whichever you prefer.

---

## 🔍 What Data Does Maps API Access?

**None of your personal data!**

The Maps API:
- Takes a location string (e.g., "123 Main St, NYC")
- Returns public information (coordinates, address, timezone)
- No user authentication needed
- No personal data involved

**It's like using Google Maps search** - public data only.

---

## 💰 Cost Considerations

**Google Maps API Pricing:**
- Places API: ~$0.017 per request
- Geocoding API: ~$0.005 per request
- Time Zone API: ~$0.005 per request

**Free Tier:**
- $200/month free credit (most projects)
- That's ~11,000+ requests/month free
- More than enough for MVP/testing

**Billing:**
- Can be on different account (separate billing)
- Or same account (consolidated billing)

---

## 🎯 Quick Setup Steps

1. **Sign in** to Google Cloud Console (any account)
2. **Create/select project**
3. **Enable APIs**: Places, Geocoding, Time Zone
4. **Create API key** (Credentials → Create → API Key)
5. **Restrict key** (optional but recommended)
6. **Add to .env**: `GOOGLE_MAPS_API_KEY=your-key`

---

## ✅ Verification

After adding the key:

```bash
cd backend
grep "GOOGLE_MAPS_API_KEY" .env
```

Should show your key (not placeholder).

---

## 🚨 Important Notes

- **API Key ≠ Personal Data Access**: The key doesn't access your timeline
- **Public Data Only**: Maps API only uses public location data
- **No User Auth Needed**: Works without user login
- **Can Use Different Account**: Totally fine if you prefer

---

## 📝 Summary

- ✅ Using different account is fine
- ✅ Maps API doesn't access personal data
- ✅ It's just for location resolution (public data)
- ✅ Follow the steps above to create the key
- ✅ Add it to your `.env` file

**Once you have the key, add it to `backend/.env` and you're all set!** 🚀

