# Quick Workaround: Can't Find Calendar Role

If you've enabled the Calendar API but still can't find "Calendar API User" in the roles dropdown, here's what to do:

---

## ✅ Solution: Use "Editor" Role (Works Immediately)

**This is the fastest way to proceed:**

1. In the "Select a role" dropdown, **clear the "Calendar" search**
2. Type: **"Editor"**
3. Select: **"Editor"** (or "Project Editor")
4. Click **"Continue"**

**Why this works:**
- "Editor" role gives full access to the project, including Calendar API
- It's perfect for MVP/testing
- You can refine permissions later if needed

---

## ✅ Alternative: Skip Roles Now, Add Later

**You can create the service account without roles and add them later:**

1. **Skip the role selection** (or select "Editor")
2. Click **"Continue"** → **"Done"**
3. **After creation**, click on your service account email
4. Go to **"PERMISSIONS"** tab
5. Click **"GRANT ACCESS"**
6. Add the service account email
7. Try searching for roles again (sometimes they appear after a refresh)

---

## ✅ Alternative: Try These Role Names

Instead of "Calendar", try searching for:

- **"Editor"** ← This will definitely work
- **"Owner"** ← Also works (full access)
- **"Service Account User"** ← Basic role, then add Calendar permissions later
- **"Project Editor"** ← Same as Editor

---

## 🔍 Why Calendar Roles Might Not Appear

1. **API just enabled** - Sometimes takes a few minutes to propagate
2. **Role name is different** - Google sometimes uses different naming
3. **Project permissions** - You might not have permission to see all roles
4. **API not fully enabled** - Double-check it's actually enabled

---

## ✅ Recommended: Just Use "Editor" for Now

**For MVP, this is the simplest approach:**

1. Search for: **"Editor"**
2. Select it
3. Continue creating the service account
4. Download the JSON key
5. Proceed with calendar setup

**The service account will work perfectly with "Editor" role!**

---

## 🎯 What Happens Next

Once you select "Editor" and continue:

1. You'll finish creating the service account
2. You can create and download the JSON key
3. The service account will have permission to use Calendar API
4. Everything will work for your MVP

---

## 📝 After Setup

If you want to be more specific later (for production), you can:

1. Go to IAM & Admin → Service Accounts
2. Click on your service account
3. Go to PERMISSIONS tab
4. Remove "Editor" and add more specific roles

But for now, **"Editor" works perfectly!**

---

**TL;DR**: Just search for "Editor", select it, and continue. Your service account will work fine! 🚀

