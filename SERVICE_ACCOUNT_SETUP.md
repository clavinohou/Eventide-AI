# How to Create and Download service-account-key.json

The `service-account-key.json` file is a credential file that allows your app to access Google APIs. You need to create it in Google Cloud Console.

---

## 🎯 What You're Doing

You're creating a "service account" - think of it as a robot account that your app uses to access Google Calendar. This file is like the robot's ID card that proves it has permission to do things.

---

## 📋 Step-by-Step Instructions

### Step 1: Go to Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Make sure you're in the correct project (the one where you enabled the APIs)
3. If you don't have a project yet:
   - Click the project dropdown at the top
   - Click "New Project"
   - Give it a name (e.g., "Cal-MGR")
   - Click "Create"

---

### Step 2: Navigate to Service Accounts

1. In the left sidebar, click **"IAM & Admin"**
2. Click **"Service Accounts"**
   - (If you don't see it, click the "☰" menu icon first)

---

### Step 3: Create a New Service Account

1. Click the **"+ CREATE SERVICE ACCOUNT"** button at the top
2. **Step 1 - Service account details**:
   - **Service account name**: `cal-mgr-backend` (or any name you like)
   - **Service account ID**: Will auto-fill (you can change it if needed)
   - **Description**: `Service account for Cal-MGR calendar app` (optional)
   - Click **"CREATE AND CONTINUE"**

3. **Step 2 - Grant this service account access to project**:
   
   **⚠️ IMPORTANT: Enable Calendar API First!**
   - If you don't see "Calendar API User", you need to enable the Calendar API first:
     1. Click "CANCEL" or go back
     2. Go to "APIs & Services" → "Library" (in left sidebar)
     3. Search for "Google Calendar API"
     4. Click on it and click "ENABLE"
     5. Wait for it to enable (takes a few seconds)
     6. Go back to creating the service account
   
   **Now select roles:**
   - Click **"Select a role"** dropdown
   - **Option 1**: Search for **"Calendar API User"** (should appear after API is enabled)
   - **Option 2**: If still not there, search for **"Calendar"** and look for:
     - "Calendar API User" 
     - "Calendar Admin" (more permissions, but works)
     - "Editor" (works but gives more permissions than needed)
   - Click **"ADD ANOTHER ROLE"** (optional)
   - Search for **"Vertex AI User"** (if using Vertex AI)
   - Click **"CONTINUE"**
   
   **Note**: If you can't find the exact role, you can:
   - Use "Editor" role (works but gives broader access)
   - Or skip roles here and add them later in IAM

4. **Step 3 - Grant users access to this service account** (optional):
   - You can skip this step for MVP
   - Click **"DONE"**

---

### Step 4: Create and Download the Key

1. You should now see your service account in the list
2. Click on the service account name (the email address)
3. Click the **"KEYS"** tab at the top
4. Click **"ADD KEY"** → **"Create new key"**
5. Select **"JSON"** as the key type
6. Click **"CREATE"**

**Important**: A JSON file will automatically download to your computer!

---

### Step 5: Move the File to Your Project

1. **Find the downloaded file**:
   - It's probably in your Downloads folder
   - The filename looks like: `your-project-name-abc123def456.json`
   - Or: `cal-mgr-backend-abc123def456.json`

2. **Rename it** (optional but recommended):
   - Rename it to: `service-account-key.json`
   - This makes it easier to reference

3. **Move it to your backend folder**:
   ```bash
   # From your Downloads folder, move it to:
   /Users/calvin/Documents/Cursor/backend/service-account-key.json
   ```

   **Or manually**:
   - Drag and drop the file into the `backend/` folder
   - Make sure it's named `service-account-key.json`

---

### Step 6: Verify the File

1. Open the file to check it looks correct:
   ```json
   {
     "type": "service_account",
     "project_id": "your-project-id",
     "private_key_id": "...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...",
     "client_email": "cal-mgr-backend@your-project.iam.gserviceaccount.com",
     "client_id": "...",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     ...
   }
   ```

2. **Important**: Note the `client_email` field - this is what you'll use to share the calendar with!

---

## ✅ Quick Checklist

- [ ] Created Google Cloud project (or using existing one)
- [ ] Navigated to IAM & Admin → Service Accounts
- [ ] Created new service account
- [ ] Added "Calendar API User" role
- [ ] Created JSON key and downloaded it
- [ ] Moved file to `backend/service-account-key.json`
- [ ] Verified file contains `client_email` field

---

## 🔍 Where to Find the Service Account Email

After creating the key, you need the service account email for calendar sharing:

1. **From the JSON file**: Look for `"client_email"` field
2. **From Google Cloud Console**:
   - Go to IAM & Admin → Service Accounts
   - Click on your service account
   - The email is shown at the top (e.g., `cal-mgr-backend@your-project.iam.gserviceaccount.com`)

---

## 🚨 Common Issues

### "I can't find the downloaded file"
- Check your Downloads folder
- Check your browser's download history
- The file might have a long name with random characters

### "The file has a weird name"
- That's normal! Google gives it a unique name
- Just rename it to `service-account-key.json` for convenience

### "I can't create a service account"
- Make sure you have the "Owner" or "Editor" role on the project
- If you created the project, you should have this automatically

### "I don't see 'Calendar API User' role"
- Make sure Calendar API is enabled:
  1. Go to "APIs & Services" → "Library"
  2. Search for "Google Calendar API"
  3. Click on it and make sure it's "Enabled"

### "The file is in the wrong location"
- It needs to be in: `backend/service-account-key.json`
- The `.env` file references it as: `./service-account-key.json`
- Make sure both files are in the same `backend/` folder

---

## 📁 File Structure Should Look Like:

```
backend/
├── .env                          ← Your API keys
├── service-account-key.json     ← The file you just created
├── package.json
├── src/
│   └── ...
└── ...
```

---

## 🎯 Next Steps

Once you have the `service-account-key.json` file:

1. **Get the service account email** from the file (`client_email` field)
2. **Follow [CALENDAR_SETUP_GUIDE.md](./CALENDAR_SETUP_GUIDE.md)** to share a calendar with it
3. **Add the email to your `.env` file** (if needed)
4. **Test the connection**

---

## 🔒 Security Note

**Important**: The `service-account-key.json` file contains sensitive credentials:
- ✅ It's already in `.gitignore` (won't be committed to git)
- ✅ Never share this file publicly
- ✅ Never commit it to version control
- ✅ If you accidentally share it, delete the service account and create a new one

---

## 🆘 Still Can't Find It?

If you've downloaded the file but can't locate it:

1. **Check your browser's download folder**:
   - Chrome: Usually `~/Downloads/`
   - Safari: Usually `~/Downloads/`
   - Firefox: Check browser settings for download location

2. **Search your computer**:
   ```bash
   # On Mac/Linux
   find ~ -name "*service*account*.json" -o -name "*cal-mgr*.json" 2>/dev/null
   
   # Or search for files modified today
   find ~/Downloads -name "*.json" -mtime -1
   ```

3. **Re-download if needed**:
   - Go back to Service Accounts → Keys
   - If you see the key listed, you can delete it and create a new one
   - Or if it's not listed, create a new key

---

## ✅ Verification

To verify everything is set up correctly:

1. **File exists**: `ls backend/service-account-key.json` should show the file
2. **File is valid JSON**: Open it and make sure it's valid JSON
3. **Has client_email**: The file should contain a `client_email` field
4. **.env references it**: Your `.env` should have: `GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json`

Once all these are true, you're ready to proceed with calendar setup!

