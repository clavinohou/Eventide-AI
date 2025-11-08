# Quick Fix: You're Creating the Wrong Type of Credential

I see you're in the credential creation wizard. You're currently set up to create **OAuth credentials** (for user data), but you need to create a **Service Account** (for application data).

---

## ✅ What to Do Right Now

**In the form you're looking at:**

1. **"What data will you be accessing?"**
   - ❌ Currently selected: **"User data"** (this creates OAuth, not what you need)
   - ✅ **Select: "Application data"** (this creates a service account)

2. Click **"Next"**

This will take you to create a service account instead of OAuth credentials.

---

## 🎯 Why This Matters

- **"User data"** = OAuth credentials (for accessing individual users' calendars)
- **"Application data"** = Service account (for your app to access a shared calendar)

For MVP, you want the **service account** (Application data).

---

## 📋 After Selecting "Application data"

Once you select "Application data" and click "Next", you'll:

1. See a form to create the service account
2. Fill in:
   - Service account name: `cal-mgr-backend`
   - Service account ID: (auto-filled)
   - Description: `Service account for Cal-MGR calendar app`
3. Click "CREATE AND CONTINUE"
4. Add roles (Calendar API User or Editor)
5. Create and download the JSON key

---

## 🔄 If You Already Created OAuth Credentials

If you already went through and created OAuth credentials:

1. That's okay - you can have both
2. But you still need to create a service account
3. Go to: **IAM & Admin** → **Service Accounts** → **+ CREATE SERVICE ACCOUNT**
4. Follow the steps in [SERVICE_ACCOUNT_SETUP.md](./SERVICE_ACCOUNT_SETUP.md)

---

**TL;DR**: Change "User data" to "Application data" and click Next! 🚀

