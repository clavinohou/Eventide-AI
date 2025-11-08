# How to Get Your Gemini API Key

Step-by-step guide to get your Gemini API key from Google AI Studio.

---

## 🎯 Quick Steps

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key
5. Add it to your `.env` file

---

## 📋 Detailed Steps

### Step 1: Go to Google AI Studio

1. Open your browser
2. Go to: **https://makersuite.google.com/app/apikey**
   - Or search: "Google AI Studio API key"
   - Or go to: https://aistudio.google.com/ → Click "Get API key"

### Step 2: Sign In

1. Sign in with your **Google account** (same one you use for Google Cloud)
2. You might need to accept terms of service

### Step 3: Create API Key

1. You'll see a page with "Get API key" or "Create API Key" button
2. Click **"Create API Key"**
3. You might be asked to:
   - Select a Google Cloud project (choose `aiatlcal`)
   - Or create a new project
4. Click **"Create API key in new project"** or select your existing project

### Step 4: Copy the Key

1. A popup will show your API key
2. **Copy the key immediately** (it looks like: `AIzaSyAbc123...`)
3. **Important**: You can only see it once! Copy it now.
4. Click "Done" or close the popup

### Step 5: Add to .env File

1. Open `backend/.env`
2. Find: `GEMINI_API_KEY=your-gemini-api-key`
3. Replace `your-gemini-api-key` with your actual key:
   ```
   GEMINI_API_KEY=AIzaSyAbc123def456ghi789jkl012mno345pqr678
   ```
4. Save the file

---

## 🔍 Where to Find It Later

If you need to find your API key again:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. You'll see a list of your API keys
3. Click on the key to view it (or create a new one)

**Note**: You can have multiple API keys per project.

---

## ✅ Verification

After adding the key, verify it's set:

```bash
cd backend
grep "GEMINI_API_KEY" .env
```

You should see your key (not `your-gemini-api-key`).

---

## 🚨 Important Notes

- **Free Tier**: Gemini API has a generous free tier for development
- **Rate Limits**: Free tier has rate limits (usually enough for testing)
- **Billing**: Make sure billing is enabled in your Google Cloud project (even if free tier)
- **Security**: Never commit the API key to git (it's already in `.gitignore`)

---

## 🎯 Quick Reference

- **URL**: https://makersuite.google.com/app/apikey
- **Key Format**: `AIzaSy...` (starts with "AIza")
- **Location in .env**: `GEMINI_API_KEY=your-key-here`

---

## 🆘 Troubleshooting

### "I can't create an API key"
- Make sure you're signed in with a Google account
- Check that you have access to the Google Cloud project
- Try creating it in a different project

### "The key doesn't work"
- Make sure you copied the entire key (no spaces)
- Check that it starts with "AIza"
- Verify it's in your `.env` file correctly
- Make sure billing is enabled (even for free tier)

### "I lost my key"
- Go back to Google AI Studio
- You can create a new key
- Or view existing keys if you saved them

---

**Once you have the key, add it to your `.env` file and you're ready to go!** 🚀

