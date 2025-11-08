# Cal-MGR Workflow & Tech Stack

## Tech Stack Overview

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **AI Services**:
  - Gemini API (multimodal extraction)
  - Google Maps API (Places, Timezone)
  - Google Calendar API (read/write)
- **Package Manager**: npm

### Mobile App
- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Navigation**: React Navigation
- **HTTP Client**: Axios

### Infrastructure
- **Cloud**: Google Cloud Platform
- **APIs**: Vertex AI, Calendar API, Maps API
- **Authentication**: Service Account (MVP), OAuth 2.0 (Production)

---

## Project Structure

```
cal-mgr/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── index.ts        # Server entry point
│   │   ├── routes/         # API routes
│   │   │   ├── extract.ts  # POST /extract
│   │   │   └── save.ts     # POST /save
│   │   ├── services/       # Business logic
│   │   │   ├── gemini-extractor.ts
│   │   │   ├── places-resolver.ts
│   │   │   ├── timezone-resolver.ts
│   │   │   ├── url-expander.ts
│   │   │   └── calendar-service.ts
│   │   └── types/          # TypeScript types
│   │       └── event.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                # API keys (not in git)
│
├── mobile/                 # Expo React Native app
│   ├── src/
│   │   ├── screens/        # App screens
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── ReviewScreen.tsx
│   │   │   └── SuccessScreen.tsx
│   │   ├── services/       # API client
│   │   │   └── api.ts
│   │   ├── types/          # TypeScript types
│   │   │   └── event.ts
│   │   └── config/         # Configuration
│   │       └── api.ts
│   ├── App.tsx            # App entry point
│   ├── package.json
│   └── app.json
│
└── docs/                  # Documentation
    ├── PROJECT_PLAN.md
    ├── API_KEYS_SETUP.md
    └── WORKFLOW.md
```

---

## Development Workflow

### 1. Setup

```bash
# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys (see API_KEYS_SETUP.md)

# Mobile setup
cd ../mobile
npm install
```

### 2. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:3000
```

**Terminal 2 - Mobile:**
```bash
cd mobile
npm start
# Expo dev server starts
# Press 'i' for iOS simulator, 'a' for Android
```

### 3. Development Flow

1. **Backend Development:**
   - Edit files in `backend/src/`
   - Server auto-reloads with `ts-node-dev`
   - Test endpoints with Postman or curl

2. **Mobile Development:**
   - Edit files in `mobile/src/`
   - Expo hot-reloads changes
   - Test on simulator/emulator or physical device

---

## API Workflow

### Endpoint 1: POST /extract

**Purpose**: Extract event information from input (image, URL, or text)

**Request:**
```json
{
  "type": "image" | "url" | "text",
  "data": "base64_image_or_url_or_text"
}
```

**Response:**
```json
{
  "event": {
    "title": "Jazz Night",
    "description": "Live jazz performance",
    "startTime": "2024-03-15T20:00:00",
    "endTime": "2024-03-15T22:00:00",
    "location": {
      "name": "Blue Note",
      "address": "131 W 3rd St, New York, NY",
      "placeId": "ChIJ...",
      "coordinates": { "lat": 40.7306, "lng": -73.9986 }
    },
    "timezone": "America/New_York",
    "source": "flyer",
    "conflicts": [
      {
        "eventId": "abc123",
        "title": "Existing Event",
        "startTime": "2024-03-15T19:30:00"
      }
    ]
  },
  "confidence": 0.85
}
```

**Flow:**
1. Receive input (image/URL/text)
2. If image → Gemini multimodal extraction
3. If URL → UrlExpand → Gemini text extraction
4. If text → Gemini text extraction
5. Resolve location → Places API
6. Resolve timezone → Time Zone API
7. Check conflicts → Calendar API (read)
8. Return canonical event + conflicts

---

### Endpoint 2: POST /save

**Purpose**: Save extracted event to Google Calendar

**Request:**
```json
{
  "title": "Jazz Night",
  "startTime": "2024-03-15T20:00:00",
  "endTime": "2024-03-15T22:00:00",
  "location": { "name": "Blue Note", "address": "..." },
  "timezone": "America/New_York",
  "source": "flyer"
}
```

**Response:**
```json
{
  "success": true,
  "eventId": "abc123xyz",
  "htmlLink": "https://calendar.google.com/calendar/event?eid=...",
  "message": "Event created successfully"
}
```

**Flow:**
1. Validate event data (Zod schema)
2. Convert to Google Calendar format
3. Create event via Calendar API
4. Return event ID and link

---

## Mobile App Workflow

### Screen 1: HomeScreen

**User Actions:**
- Tap "Capture Flyer" → Camera opens → Capture image
- Tap "Share URL" → Enter URL → Extract
- Paste text → Tap "Extract Event"

**Flow:**
1. User provides input
2. Call `POST /extract` with input
3. Navigate to ReviewScreen with extracted event

---

### Screen 2: ReviewScreen

**User Actions:**
- Review extracted fields (title, date, time, location)
- Edit any field if needed
- See conflicts (if any)
- Tap "Save to Calendar" or "Cancel"

**Flow:**
1. Display extracted event (editable)
2. Show conflicts if detected
3. On "Save" → Call `POST /save`
4. Navigate to SuccessScreen

---

### Screen 3: SuccessScreen

**User Actions:**
- Tap "Open in Calendar" → Opens Google Calendar
- Tap "Create Another Event" → Returns to HomeScreen

---

## Data Flow Diagram

```
User Input (Image/URL/Text)
    ↓
Mobile App (HomeScreen)
    ↓
POST /extract
    ↓
Backend Services:
  ├─ Gemini Extractor (extract title, date, time, location)
  ├─ Places Resolver (location → Place ID, coordinates)
  ├─ Timezone Resolver (coordinates → timezone)
  └─ Calendar Service (check conflicts)
    ↓
Return Canonical Event + Conflicts
    ↓
Mobile App (ReviewScreen)
    ↓
User Reviews/Edits
    ↓
POST /save
    ↓
Calendar Service (create event)
    ↓
Return Event ID + Link
    ↓
Mobile App (SuccessScreen)
```

---

## Error Handling

### Backend Errors

**Extraction Failure:**
- Return 400 with error message
- Mobile app shows alert to user

**API Timeout:**
- Retry once (if configured)
- Fallback to partial data or error

**Calendar Write Failure:**
- Return 500 with error message
- User can retry

### Mobile Errors

**Network Error:**
- Show "Network error" message
- Allow retry

**API Error:**
- Show error message from backend
- Allow user to go back and edit

---

## Testing Workflow

### Manual Testing

1. **Test Image Extraction:**
   - Capture a flyer with clear date/time/location
   - Verify extraction accuracy
   - Check conflicts if event overlaps

2. **Test URL Extraction:**
   - Share Instagram/TikTok event URL
   - Verify metadata extraction
   - Check event creation

3. **Test Text Extraction:**
   - Paste event description
   - Verify date/time parsing
   - Check relative dates ("tomorrow", "next Friday")

### Automated Testing (Future)

- Unit tests for extraction logic
- Integration tests for API endpoints
- E2E tests for mobile flows

---

## Deployment Workflow (Future)

### Backend Deployment

1. Build TypeScript: `npm run build`
2. Deploy to Cloud Run or App Engine
3. Set environment variables in Cloud Console
4. Update mobile app API URL

### Mobile Deployment

1. Build Expo app: `expo build:android` or `expo build:ios`
2. Submit to App Store / Play Store
3. Update API URL to production endpoint

---

## Performance Considerations

### Latency Targets

- **Extraction**: <5s (Gemini API)
- **Location Resolution**: <2s (Places API)
- **Conflict Check**: <1s (Calendar API)
- **Total**: <8s end-to-end

### Optimization Strategies

- Cache Places API results (24h TTL)
- Parallel API calls where possible
- Compress images before sending
- Use Gemini Flash for faster responses

---

## Next Steps

1. **Complete MVP**: All P0 issues from Sprint 1
2. **Add Travel Time**: DirectionsEstimate integration
3. **Add Media**: Imagen poster generation
4. **Add Todos**: Task creation from events
5. **Production Ready**: Error handling, logging, monitoring

See [SPRINT_1_P0_ISSUES.md](./SPRINT_1_P0_ISSUES.md) for current sprint tasks.

