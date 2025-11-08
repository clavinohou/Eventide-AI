# Troubleshooting: Can't Find "Calendar API User" Role

If you don't see "Calendar API User" in the role dropdown, follow these steps:

---

## 🔧 Solution 1: Enable Calendar API First (Most Common Fix)

The role won't appear until the API is enabled in your project.

### Steps:

1. **Don't close the service account creation window** (or you can come back to it)

2. **Open a new tab/window** and go to [Google Cloud Console](https://console.cloud.google.com/)

3. **Enable Calendar API**:
   - In the left sidebar, click **"APIs & Services"**
   - Click **"Library"**
   - In the search box, type: **"Google Calendar API"**
   - Click on **"Google Calendar API"**
   - Click the big blue **"ENABLE"** button
   - Wait for it to enable (you'll see a green checkmark)

4. **Go back to service account creation**:
   - Return to the service account creation page
   - Click "Select a role" dropdown again
   - Now search for **"Calendar API User"** - it should appear!

---

## 🔧 Solution 2: Use Alternative Role Names

If "Calendar API User" still doesn't appear, try these alternatives:

### Option A: Search for "Calendar" (broader search)
- In the role dropdown, just type: **"Calendar"**
- You might see:
  - "Calendar API User" ✅ (best option)
  - "Calendar Admin" ✅ (works, but more permissions)
  - "Calendar Service Agent" ✅ (also works)

### Option B: Use "Editor" Role (works but broader)
- Search for: **"Editor"**
- Select: **"Editor"** (gives full edit access to the project)
- This works but gives more permissions than needed
- For MVP/testing, this is fine

### Option C: Use "Service Account User" + Enable API
- Select: **"Service Account User"**
- Continue creating the service account
- After creation, we'll add calendar permissions separately

---

## 🔧 Solution 3: Add Role After Creation

If you can't find the role during creation, you can add it later:

1. **Create the service account without the role** (or with "Editor" role)
2. **After creation**, click on the service account email
3. Go to **"PERMISSIONS"** tab
4. Click **"GRANT ACCESS"**
5. In "Add principals", enter the service account email
6. In "Select a role", search for **"Calendar API User"**
7. Click **"SAVE"**

---

## 🔧 Solution 4: Check API Enablement Status

Verify the Calendar API is actually enabled:

1. Go to **"APIs & Services"** → **"Enabled APIs"**
2. Search for "Calendar"
3. You should see **"Google Calendar API"** listed as "Enabled"
4. If not, go to **"Library"** and enable it

---

## ✅ Quick Fix Checklist

- [ ] Calendar API is enabled (APIs & Services → Library → Google Calendar API → ENABLE)
- [ ] Waited a few seconds after enabling (sometimes takes a moment to propagate)
- [ ] Refreshed the service account creation page
- [ ] Tried searching for just "Calendar" (not the full name)
- [ ] Tried using "Editor" role as a workaround

---

## 🎯 Recommended Approach for MVP

**For getting started quickly:**

1. **Enable Calendar API** (APIs & Services → Library → Google Calendar API → ENABLE)
2. **Create service account** with **"Editor"** role (it works and is simpler)
3. **Continue with the rest of setup**

The "Editor" role gives more permissions than needed, but:
- ✅ It works immediately
- ✅ No searching for specific roles
- ✅ Fine for MVP/testing
- ⚠️ For production, you'd want to use more specific roles

---

## 🚨 Still Not Working?

If none of the above works:

1. **Check your project permissions**:
   - Make sure you're the project owner or have "Project Editor" role
   - If you're just a viewer, you can't create service accounts

2. **Try a different browser**:
   - Sometimes caching issues can cause problems
   - Try incognito/private mode

3. **Check API quotas**:
   - Go to "APIs & Services" → "Quotas"
   - Make sure Calendar API quotas are available

4. **Create service account with "Editor" role**:
   - This will definitely work
   - You can refine permissions later if needed

---

## 📝 What Role Do You Actually Need?

For the MVP to work, the service account needs:
- ✅ Ability to read calendar events (for conflict detection)
- ✅ Ability to create calendar events (for saving events)

**Roles that provide this:**
- "Calendar API User" ✅ (ideal, specific)
- "Calendar Admin" ✅ (works, more permissions)
- "Editor" ✅ (works, broad permissions)
- "Owner" ✅ (works, full access)

**Any of these will work for MVP!**

---

## 🎓 Understanding Roles

- **Calendar API User**: Specific role for Calendar API access (best practice)
- **Editor**: Can edit resources in the project (broader, but works)
- **Owner**: Full access to everything (most permissive)

For MVP, **Editor** is perfectly fine and will work immediately.

---

## ✅ Next Steps After Getting Role

Once you've selected a role and created the service account:

1. Continue to Step 4: Create and Download the Key
2. The rest of the setup is the same regardless of which role you used
3. The service account will work the same way

---

**Need more help?** The key is usually that the Calendar API needs to be enabled first. Try Solution 1 above - that fixes it 90% of the time!

