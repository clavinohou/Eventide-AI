# Grant Speech-to-Text Permissions to Service Account

## Quick Setup

Since you already have a service account for Calendar API, you just need to add Speech-to-Text permissions to it.

## Steps

### 1. Go to IAM & Admin

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: **aiatlcal**
3. Go to **IAM & Admin** > **IAM**

### 2. Find Your Service Account

1. Look for your service account email (it should end with `@aiatlcal.iam.gserviceaccount.com`)
2. Click the **pencil icon** (Edit) next to it

### 3. Add Speech-to-Text Role

**Option A: Search for the role name (try these):**
1. Click **"ADD ANOTHER ROLE"**
2. Try searching for these (one at a time):
   - **"Speech"** (should show Speech-related roles)
   - **"Cloud Speech"**
   - **"Speech API"**
   - **"speech.client"** (the role ID)
3. Look for any of these:
   - **"Cloud Speech Client"** or **"Speech Client"**
   - **"Cloud Speech API User"**
   - **"Speech API User"**
4. Select the role
5. Click **"SAVE"**

**Option B: If you can't find it, use Editor role (temporary workaround):**
1. Click **"ADD ANOTHER ROLE"**
2. Search for: **"Editor"**
3. Select **"Editor"** (this gives broader permissions but will work)
4. Click **"SAVE"**

**Option C: Type the role ID directly:**
1. Click **"ADD ANOTHER ROLE"**
2. In the role dropdown, click **"SELECT A ROLE"**
3. Type: `roles/speech.client`
4. If it appears, select it
5. Click **"SAVE"**

**Note:** The role might be called:
- `roles/speech.client` (Cloud Speech Client) - **Recommended**
- `roles/speech.admin` (Cloud Speech Admin) - More permissions than needed
- Sometimes just "Speech" in the UI

### 4. Verify

After adding the role, your service account should have:
- ✅ Calendar API permissions (already have)
- ✅ Speech-to-Text API permissions (just added)

## Test It

1. **Restart your backend server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Look for this log message**:
   ```
   [AudioTranscriber] Google Cloud Speech-to-Text initialized
   ```

3. **Test with a video**:
   - Send a video URL with speech
   - Check backend logs for transcription output

## Troubleshooting

### Issue: "Permission denied" error
**Solution**: Make sure you added the role correctly (step 3 above)

### Issue: "API not enabled"
**Solution**: Double-check that Speech-to-Text API is enabled:
- Go to **APIs & Services** > **Library**
- Search for "Cloud Speech-to-Text API"
- Should show "Enabled"

### Issue: "Service account not found"
**Solution**: Make sure `GOOGLE_APPLICATION_CREDENTIALS` in `.env` points to the correct file:
```env
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
```

## That's It!

Once you add the role, restart the backend and it should work! 🎉

