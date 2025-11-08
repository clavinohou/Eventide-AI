# Fix: EMFILE - Too Many Open Files Error

This error happens when macOS hits the limit for file watchers. Here's how to fix it.

---

## 🔧 Quick Fix (Temporary)

**In the terminal where you're running Expo:**

```bash
ulimit -n 4096
```

Then restart Expo:
```bash
npm start
```

---

## ✅ Permanent Fix

### Option 1: Increase Limit in Current Session

Add to your `~/.zshrc` (or `~/.bash_profile` if using bash):

```bash
# Increase file limit for development
ulimit -n 4096
```

Then reload:
```bash
source ~/.zshrc
```

### Option 2: System-Wide Fix (Recommended)

1. **Create/edit** `/etc/launchd.conf` (requires sudo):
   ```bash
   sudo nano /etc/launchd.conf
   ```

2. **Add this line:**
   ```
   limit maxfiles 65536 200000
   ```

3. **Restart your computer** (launchd config requires restart)

---

## 🎯 Quick Solution for Now

**Just run this before starting Expo:**

```bash
ulimit -n 4096
cd mobile
npm start
```

Or combine them:
```bash
ulimit -n 4096 && cd mobile && npm start
```

---

## 📝 What This Does

- **Default limit**: Usually 256 or 1024 files
- **New limit**: 4096 files (enough for Metro bundler)
- **Why needed**: Metro watches many files for hot reload

---

## ✅ After Fixing

1. **Set the limit**: `ulimit -n 4096`
2. **Start Expo**: `npm start`
3. **Should work now!**

---

## 🆘 If Still Having Issues

**Try cleaning Metro cache:**

```bash
cd mobile
npx expo start --clear
```

**Or reduce watched files:**

```bash
# Add to .gitignore if not already
echo "node_modules/" >> .gitignore
```

---

**The `ulimit -n 4096` command should fix it immediately!** 🚀

