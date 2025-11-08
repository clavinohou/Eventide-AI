# How to Find Your Google Cloud Project Configuration

This guide shows you how to find all the Google Cloud configuration details you need.

---

## 🎯 What You Need

From your Google Cloud project, you need:
1. **Project ID** (e.g., `aiatlcal`)
2. **Project Number** (optional, but useful)
3. **Region** (e.g., `us-central1`)

---

## 📋 Method 1: From Service Account JSON (Easiest)

Your `service-account-key.json` file already contains your project ID!

1. **Open** `backend/service-account-key.json`
2. **Look for** `"project_id"` field
3. **Copy** the value (e.g., `"project_id": "aiatlcal"`)

**That's your Project ID!**

---

## 📋 Method 2: From Google Cloud Console

### Find Project ID:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Look at the **top of the page** - you'll see a project selector
3. Click on it - it shows:
   - **Project Name**: The display name (e.g., "Cal-MGR")
   - **Project ID**: The actual ID (e.g., `aiatlcal`) ← **This is what you need!**

### Find Project Number:

1. In Google Cloud Console, click the project selector at the top
2. Click **"Project settings"** (gear icon)
3. You'll see:
   - **Project ID**: `aiatlcal`
   - **Project number**: `123456789012` ← This is the number

### Find Region:

1. Go to any service (like Cloud Run, Compute Engine, etc.)
2. The region is usually shown (e.g., `us-central1`, `us-east1`)
3. **For MVP, use**: `us-central1` (most common default)

---

## ✅ Update Your .env File

Once you have your Project ID, update `backend/.env`:

```env
GOOGLE_CLOUD_PROJECT_ID=your-project-id-here
GOOGLE_CLOUD_REGION=us-central1
```

**Example:**
```env
GOOGLE_CLOUD_PROJECT_ID=aiatlcal
GOOGLE_CLOUD_REGION=us-central1
```

---

## 🔍 Quick Check: What's Already in Your JSON

Your `service-account-key.json` already has:
- ✅ `project_id` - Your project ID
- ✅ `client_email` - Your service account email
- ✅ Other auth details

**You can extract the project ID directly from the JSON file!**

---

## 📝 Complete .env Configuration

Here's what your `.env` should have:

```env
# Google Cloud Configuration
GOOGLE_CLOUD_PROJECT_ID=aiatlcal
GOOGLE_CLOUD_REGION=us-central1
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json

# Gemini API
GEMINI_API_KEY=your-gemini-key

# Google Maps API
GOOGLE_MAPS_API_KEY=your-maps-key

# Calendar Configuration
GOOGLE_CALENDAR_ID=69c22d5a1b88e4afb712ef66f128a0b3593eba4eecdd1de8cccf3a75c102431e@group.calendar.google.com

# Server Configuration
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:19006
```

---

## 🎯 Quick Steps

1. **Get Project ID**: From `service-account-key.json` → `project_id` field
2. **Set Region**: Use `us-central1` (default, works for most services)
3. **Update .env**: Add `GOOGLE_CLOUD_PROJECT_ID` and `GOOGLE_CLOUD_REGION`

---

## ✅ Verification

After updating, verify:
```bash
cd backend
grep "GOOGLE_CLOUD_PROJECT_ID" .env
grep "GOOGLE_CLOUD_REGION" .env
```

Both should show your values!

---

## 🚨 Common Questions

**Q: Do I need the project number?**
A: Not for MVP. Project ID is enough.

**Q: What region should I use?**
A: `us-central1` is the default and works for most services.

**Q: Where do I find this in the console?**
A: Top of the page - click the project selector dropdown.

**Q: Is this the same as the project name?**
A: No. Project name is the display name. Project ID is the unique identifier (what you need).

---

## 🎉 That's It!

Once you have the Project ID from your JSON file, you're all set!

