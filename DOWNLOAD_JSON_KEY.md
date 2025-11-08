# How to Download the Service Account JSON Key

After creating your service account, here's how to download the JSON key file.

---

## 📥 Step 1: Navigate to Your Service Account

1. You should still be in Google Cloud Console
2. If you just created the service account, you might see a success message
3. **Click on the service account email** (it looks like: `cal-mgr-backend@your-project.iam.gserviceaccount.com`)
   - Or go to: **IAM & Admin** → **Service Accounts**
   - Find your service account in the list
   - Click on the service account name/email

---

## 🔑 Step 2: Go to the Keys Tab

1. Once you're viewing the service account details
2. Click the **"KEYS"** tab at the top of the page
3. You should see an empty list (or existing keys if you've created any)

---

## ➕ Step 3: Create a New Key

1. Click the **"ADD KEY"** button
2. Select **"Create new key"**
3. A popup will appear asking for key type
4. Select **"JSON"** (not P12)
5. Click **"CREATE"**

---

## 💾 Step 4: File Downloads Automatically

1. **The JSON file will automatically download** to your computer
2. It usually goes to your **Downloads folder**
3. The filename looks like: `your-project-name-abc123def456.json`
   - Or: `cal-mgr-backend-abc123def456.json`
   - Or just a long string of characters

---

## 📁 Step 5: Move and Rename the File

1. **Find the downloaded file** in your Downloads folder
2. **Rename it** to: `service-account-key.json` (easier to reference)
3. **Move it** to your backend folder:
   ```
   /Users/calvin/Documents/Cursor/backend/service-account-key.json
   ```

**You can do this by:**
- Dragging and dropping the file into the `backend/` folder
- Or using Finder/File Explorer to copy it there

---

## ✅ Step 6: Verify the File

1. **Open the file** to check it looks correct
2. It should contain JSON like this:
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

3. **Important**: Note the `client_email` field - this is what you'll use for calendar sharing!

---

## 📋 What You Need from This File

### 1. The File Itself
- Location: `backend/service-account-key.json`
- Used by: Your backend code to authenticate

### 2. The Service Account Email
- Found in: `client_email` field in the JSON
- Looks like: `cal-mgr-backend@your-project.iam.gserviceaccount.com`
- Used for: Sharing your Google Calendar with the service account

---

## 🎯 Next Steps After Downloading

Once you have the JSON file:

1. **✅ File is in `backend/service-account-key.json`**
2. **✅ Get the `client_email` from the file** (for calendar sharing)
3. **✅ Follow [CALENDAR_SETUP_GUIDE.md](./CALENDAR_SETUP_GUIDE.md)** to:
   - Create a calendar
   - Share it with the service account email
   - Get the calendar ID
   - Add it to your `.env` file

---

## 🔍 Can't Find the Downloaded File?

1. **Check your Downloads folder**
2. **Check browser download history**:
   - Chrome: Press `Cmd+J` (Mac) or `Ctrl+J` (Windows)
   - Look for a `.json` file downloaded recently
3. **Search your computer**:
   ```bash
   # On Mac
   find ~/Downloads -name "*.json" -mtime -1
   ```
4. **Re-download if needed**:
   - Go back to Service Accounts → Keys
   - If you see a key listed, you can delete it and create a new one
   - Or create another key (you can have multiple)

---

## 🚨 Important Notes

- **Only download the key once** - Google only shows it once for security
- **If you lose it**, you'll need to delete the old key and create a new one
- **Keep it secure** - This file gives full access to your service account
- **It's already in `.gitignore`** - Won't be committed to git

---

## ✅ Quick Checklist

- [ ] Service account created
- [ ] Clicked on service account email
- [ ] Went to "KEYS" tab
- [ ] Clicked "ADD KEY" → "Create new key" → "JSON"
- [ ] File downloaded automatically
- [ ] Renamed to `service-account-key.json`
- [ ] Moved to `backend/` folder
- [ ] Verified file contains `client_email` field
- [ ] Ready for calendar setup!

---

**Once you have the file, you're ready to set up calendar sharing!** 🎉

