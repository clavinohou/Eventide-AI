# Using Timeline Data for Predictions

Guide for integrating Google Timeline/Location History data to enhance calendar predictions.

---

## 🎯 What You Want to Do

Use your **personal timeline data** (location history) to:
- Predict travel times based on your historical patterns
- Suggest optimal event times based on your usual locations
- Provide context-aware calendar recommendations
- Improve location resolution with your frequent places

**This is a great feature for post-MVP!**

---

## ✅ Yes, This is Possible!

But it requires:
1. **OAuth 2.0** (not service account) - to access user's personal data
2. **Location History API** or **Timeline API** access
3. **User consent** - explicit permission to access location data
4. **Different authentication flow** - user must log in

---

## 🔑 Why OAuth is Required

**Service Account** (what you have now):
- ✅ Can access shared calendars
- ✅ No user login needed
- ❌ Cannot access personal timeline data
- ❌ Cannot access user's location history

**OAuth 2.0** (what you need for timeline):
- ✅ Can access user's personal data
- ✅ Can access location history/timeline
- ✅ User grants permission explicitly
- ⚠️ Requires user to log in

---

## 📋 What APIs You'll Need

### 1. Location History API (Deprecated but still works)
- Access to user's location history
- Historical location data
- **Note**: Google deprecated this but it still works for existing users

### 2. Timeline API (Newer)
- Part of Google Maps Platform
- Access to user's timeline data
- More structured than Location History

### 3. Places API (Current)
- You already have this
- Can be enhanced with timeline data

---

## 🏗️ Architecture Changes Needed

### Current (Service Account):
```
App → Backend → Service Account → Shared Calendar
```

### With Timeline (OAuth):
```
App → Backend → OAuth Flow → User Login → User Grants Permission
    ↓
User's Timeline Data → Predictions → Enhanced Calendar Events
```

---

## 📝 Implementation Steps

### Step 1: Set Up OAuth 2.0

1. **Go to Google Cloud Console**
2. **APIs & Services** → **Credentials**
3. **Create Credentials** → **OAuth 2.0 Client ID**
4. **Application type**: Web application
5. **Authorized redirect URIs**: 
   - `http://localhost:3000/auth/callback` (dev)
   - `https://your-domain.com/auth/callback` (prod)

### Step 2: Request Scopes

You'll need these OAuth scopes:
```javascript
const scopes = [
  'https://www.googleapis.com/auth/calendar',           // Calendar access
  'https://www.googleapis.com/auth/location',           // Location data
  'https://www.googleapis.com/auth/timeline.readonly',   // Timeline read
  'https://www.googleapis.com/auth/userinfo.email',      // User email
];
```

### Step 3: Implement OAuth Flow

**Backend changes needed:**

```typescript
// New route: /auth/login
router.get('/auth/login', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });
  res.redirect(authUrl);
});

// New route: /auth/callback
router.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  // Store tokens (in session, database, or JWT)
  // Redirect to app
});
```

### Step 4: Access Timeline Data

```typescript
// After OAuth, use user's tokens
const timeline = await fetch('https://www.googleapis.com/timeline/v1/timeline', {
  headers: {
    'Authorization': `Bearer ${userAccessToken}`
  }
});
```

---

## 🎯 Use Cases for Timeline Data

### 1. Travel Time Prediction
```typescript
// Use historical data to predict travel time
const historicalTravelTime = await getAverageTravelTime(
  userLocation,
  eventLocation,
  timeOfDay,
  dayOfWeek
);
```

### 2. Location Context
```typescript
// Suggest locations based on where user usually is
const frequentLocations = await getFrequentLocations(userId);
const suggestedLocation = findNearestFrequentLocation(eventLocation);
```

### 3. Time Optimization
```typescript
// Suggest better event times based on location patterns
const optimalTime = await suggestOptimalTime(
  eventLocation,
  userTimeline,
  userPreferences
);
```

---

## 🔒 Privacy & Security Considerations

### User Consent
- **Explicit permission required** - user must grant access
- **Clear explanation** - tell users why you need location data
- **Granular permissions** - request only what you need

### Data Storage
- **Don't store raw timeline data** - process and aggregate
- **Store only what's needed** - travel patterns, not exact locations
- **Respect user privacy** - allow opt-out

### Compliance
- **GDPR compliance** - if serving EU users
- **Data retention policies** - don't keep data forever
- **User data deletion** - allow users to delete their data

---

## 📊 Data Processing Strategy

### What to Store:
- ✅ Aggregated travel patterns (not raw locations)
- ✅ Frequent locations (anonymized)
- ✅ Average travel times by route/time
- ✅ Location preferences

### What NOT to Store:
- ❌ Exact GPS coordinates
- ❌ Full timeline history
- ❌ Personal identifiable location data
- ❌ Real-time location tracking

---

## 🚀 Implementation Phases

### Phase 1: MVP (Current)
- ✅ Service account
- ✅ Shared calendar
- ✅ Basic event creation
- ✅ No timeline data

### Phase 2: OAuth Setup
- Add OAuth 2.0 flow
- User login
- Token management
- Access user's calendar

### Phase 3: Timeline Integration
- Request timeline permissions
- Fetch timeline data
- Process and aggregate
- Use for predictions

### Phase 4: Enhanced Features
- Travel time predictions
- Location-based suggestions
- Context-aware recommendations
- Smart scheduling

---

## 💻 Code Example: OAuth Setup

```typescript
// backend/src/services/oauth-service.ts
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CALENDAR_CLIENT_ID,
  process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
  process.env.GOOGLE_CALENDAR_REDIRECT_URI
);

export const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/location',
      'https://www.googleapis.com/auth/timeline.readonly',
    ],
    prompt: 'consent'
  });
};

export const getTokens = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

export const getTimelineData = async (accessToken: string) => {
  // Fetch timeline data using user's access token
  const response = await fetch('https://www.googleapis.com/timeline/v1/timeline', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  return response.json();
};
```

---

## 🎯 Timeline API Endpoints

### Get Timeline Data
```
GET https://www.googleapis.com/timeline/v1/timeline
Authorization: Bearer {access_token}
```

### Get Location History
```
GET https://www.googleapis.com/locationhistory/v1/locationhistory
Authorization: Bearer {access_token}
```

**Note**: These APIs may require special access or be in beta. Check Google's documentation.

---

## 📝 Required OAuth Scopes

```javascript
const requiredScopes = [
  // Calendar
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
  
  // Location/Timeline
  'https://www.googleapis.com/auth/location',
  'https://www.googleapis.com/auth/timeline.readonly',
  
  // User info
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];
```

---

## ⚠️ Important Notes

1. **Timeline API Access**: May require special approval from Google
2. **Location History**: Deprecated but still works for existing users
3. **Privacy**: Users must explicitly grant permission
4. **Rate Limits**: Timeline API has rate limits
5. **Data Volume**: Timeline data can be large - need efficient processing

---

## 🎯 Recommendation

**For MVP**: 
- ✅ Keep current service account setup
- ✅ Get basic functionality working
- ✅ Test with shared calendar

**For Post-MVP**:
- Add OAuth flow
- Integrate timeline data
- Build prediction features
- Enhance with location context

---

## 📚 Resources

- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Location History API](https://developers.google.com/maps/documentation/location-history)
- [Timeline API](https://developers.google.com/maps/documentation/timeline)
- [OAuth Scopes](https://developers.google.com/identity/protocols/oauth2/scopes)

---

## ✅ Summary

- **Yes, it's possible** to use timeline data
- **Yes, you need OAuth** (not service account)
- **Great for post-MVP** - adds powerful prediction features
- **Requires user consent** - privacy-first approach
- **Can enhance** travel time, location suggestions, scheduling

**Start with MVP, then add timeline features!** 🚀

