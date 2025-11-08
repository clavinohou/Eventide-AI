# Step-by-Step: Connect Google Calendar to Cal-MGR

This guide explains exactly what you're doing and why, then walks you through each step.

---

## 🎯 What You're Actually Doing

**The Problem**: Service accounts (the automated "robot" account that runs your backend) can't access your personal Google Calendar directly. Google doesn't allow robots to read/write your personal calendar for security reasons.

**The Solution**: Create a **shared calendar** that both you and the service account can access. Think of it like a shared workspace calendar that your app can write to.

**What Happens**:
1. You create a calendar (or use an existing one)
2. You share it with your service account (the robot)
3. Your app writes events to this shared calendar
4. You can see these events in your Google Calendar app

---

## 📋 Step-by-Step Instructions

### Step 1: Get Your Service Account Email

**What you're doing**: Finding the email address of your "robot" account that needs calendar access.

1. Open your `service-account-key.json` file (in `backend/` folder)
2. Look for the `"client_email"` field
3. Copy that email address (it looks like: `cal-mgr@your-project.iam.gserviceaccount.com`)

**Example**:
```json
{
  "type": "service_account",
  "project_id": "your-project",
  "private_key_id": "...",
  "private_key": "...",
  "client_email": "cal-mgr@your-project.iam.gserviceaccount.com",  ← COPY THIS
  ...
}
```

**Save this email** - you'll need it in Step 3.

---

### Step 2: Create or Choose a Google Calendar

**What you're doing**: Creating a calendar that your app will write events to.

**Option A: Create a New Calendar (Recommended)**

1. Go to [Google Calendar](https://calendar.google.com/)
2. On the left sidebar, click the **"+"** button next to "Other calendars"
3. Select **"Create new calendar"**
4. Fill in:
   - **Name**: `Cal-MGR Events` (or any name you like)
   - **Description**: `Events created by Cal-MGR app` (optional)
   - **Time zone**: Your timezone
5. Click **"Create calendar"**

**Option B: Use an Existing Calendar**

- If you already have a calendar you want to use, that's fine too
- Just make sure you're okay with the app writing events to it

---

### Step 3: Share the Calendar with Your Service Account

**What you're doing**: Giving your service account permission to write events to your calendar.

1. In Google Calendar, find your calendar in the left sidebar (under "My calendars")
2. Click the **three dots (⋮)** next to your calendar name
3. Select **"Settings and sharing"**
4. Scroll down to **"Share with specific people"**
5. Click **"Add people"**
6. Paste the service account email you copied in Step 1
7. Set permission to **"Make changes to events"** (important!)
8. Click **"Send"** (or "Add" if it doesn't require sending)

**Note**: You might see a warning that the email wasn't found - that's okay, just click "Add anyway" or similar.

---

### Step 4: Get Your Calendar ID

**What you're doing**: Finding the unique identifier for your calendar so the app knows which calendar to write to.

1. Still in the calendar settings (from Step 3)
2. Scroll to the top of the settings page
3. Look for **"Integrate calendar"** section
4. Find **"Calendar ID"**
5. Copy the calendar ID (it looks like: `abc123def456@group.calendar.google.com`)

**Alternative method**:
- If you don't see "Calendar ID", look for "Calendar address" or "iCal format"
- The calendar ID is usually: `your-calendar-name@group.calendar.google.com`
- Or it might be a long string of characters

**Save this calendar ID** - you'll add it to your `.env` file.

---

### Step 5: Add Calendar ID to Your .env File

**What you're doing**: Telling your app which calendar to use.

1. Open `backend/.env` file
2. Find the line: `GOOGLE_CALENDAR_ID=primary`
3. Replace `primary` with your calendar ID from Step 4

**Example**:
```env
GOOGLE_CALENDAR_ID=cal-mgr-events@group.calendar.google.com
```

**Save the file**.

---

### Step 6: Verify It Works

**What you're doing**: Testing that everything is connected correctly.

1. **Start your backend server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Test with a simple event**:
   - Use the mobile app or test the API directly
   - Try extracting and saving an event
   - Check your Google Calendar - you should see the new event!

3. **If it doesn't work**, check:
   - Service account email is correct
   - Calendar is shared with "Make changes to events" permission
   - Calendar ID in `.env` is correct
   - Backend server restarted after changing `.env`

---

## 🔍 How to Verify Calendar Sharing Worked

1. Go back to Google Calendar
2. Click the three dots (⋮) next to your calendar
3. Select "Settings and sharing"
4. Under "Share with specific people", you should see your service account email listed
5. It should show "Make changes to events" permission

---

## 🎯 Quick Reference: What Goes Where

| What | Where to Find It | Where to Put It |
|------|------------------|-----------------|
| Service Account Email | `service-account-key.json` → `client_email` | Share calendar with this email |
| Calendar ID | Calendar Settings → "Integrate calendar" → "Calendar ID" | `backend/.env` → `GOOGLE_CALENDAR_ID` |
| Permission Level | When sharing calendar | Set to "Make changes to events" |

---

## 🚨 Common Issues

### "Calendar not found" error
- **Problem**: Calendar ID is wrong
- **Fix**: Double-check the calendar ID in `.env` matches exactly what's in Google Calendar settings

### "Forbidden" or "Permission denied" error
- **Problem**: Service account doesn't have permission
- **Fix**: 
  1. Verify calendar is shared with service account email
  2. Make sure permission is "Make changes to events" (not just "See all event details")
  3. Wait a few minutes for permissions to propagate

### "Service account email not found" when sharing
- **Problem**: Google Calendar might not recognize service account emails
- **Fix**: 
  1. Click "Add anyway" or similar option
  2. The sharing should still work even if it says "not found"
  3. Wait a few minutes and check if it appears in the shared list

### Events not appearing
- **Problem**: Wrong calendar ID or permissions issue
- **Fix**:
  1. Check `.env` has correct `GOOGLE_CALENDAR_ID`
  2. Restart backend server after changing `.env`
  3. Verify calendar sharing is set up correctly
  4. Check backend logs for error messages

---

## 📱 What Happens When You Use the App

1. **You capture a flyer** → App extracts event info
2. **You review and save** → App sends event to backend
3. **Backend uses service account** → Writes event to your shared calendar
4. **Event appears in Google Calendar** → You see it in the "Cal-MGR Events" calendar

The event will appear in your Google Calendar app, website, and any other calendar apps you use (like on your phone).

---

## ✅ Success Checklist

- [ ] Service account email copied from `service-account-key.json`
- [ ] Calendar created (or existing one chosen)
- [ ] Calendar shared with service account email
- [ ] Permission set to "Make changes to events"
- [ ] Calendar ID copied from settings
- [ ] Calendar ID added to `backend/.env` as `GOOGLE_CALENDAR_ID`
- [ ] Backend server restarted
- [ ] Test event created successfully
- [ ] Event appears in Google Calendar

---

## 🎓 Understanding the Architecture

```
Your Phone/App
    ↓
Backend Server (running on your computer/cloud)
    ↓
Service Account (robot with calendar access)
    ↓
Shared Google Calendar
    ↓
Your Google Calendar App (you see the events)
```

**Why this works**: 
- The service account is like a shared key that can write to the calendar
- You share the calendar with the service account (like giving someone a key)
- The app uses the service account to write events (like using the key to add events)
- You see the events because you own the calendar

---

## 🆘 Still Having Issues?

1. **Check backend logs**: Look for error messages when trying to save events
2. **Verify API is enabled**: Make sure Calendar API is enabled in Google Cloud Console
3. **Check service account roles**: Ensure it has "Calendar API User" role
4. **Wait a few minutes**: Sometimes permissions take a few minutes to propagate

Need more help? Check the error message and search for it in [MVP_CHECKLIST.md](./MVP_CHECKLIST.md) or [API_KEYS_SETUP.md](./API_KEYS_SETUP.md).

