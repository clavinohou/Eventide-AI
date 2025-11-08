# Cal-MGR Backend

Express.js/TypeScript backend API for the agentic calendar app.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (see `.env.example` for template):
```bash
# Required API keys:
GEMINI_API_KEY=your-key-here
GOOGLE_MAPS_API_KEY=your-key-here
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
```

3. Place your service account JSON key as `service-account-key.json`

4. Start development server:
```bash
npm run dev
```

Server runs on `http://localhost:3000`

## API Endpoints

### POST /extract
Extract event information from image, URL, or text.

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
    "title": "Event Title",
    "startTime": "2024-03-15T20:00:00",
    "location": { ... },
    "conflicts": [ ... ]
  }
}
```

### POST /save
Save extracted event to Google Calendar.

**Request:** Canonical event JSON

**Response:**
```json
{
  "success": true,
  "eventId": "abc123",
  "htmlLink": "https://calendar.google.com/..."
}
```

### GET /health
Health check endpoint.

## Project Structure

```
src/
├── index.ts              # Server entry point
├── routes/               # API routes
│   ├── extract.ts        # POST /extract
│   └── save.ts           # POST /save
├── services/             # Business logic
│   ├── gemini-extractor.ts
│   ├── places-resolver.ts
│   ├── timezone-resolver.ts
│   ├── url-expander.ts
│   └── calendar-service.ts
└── types/                # TypeScript types
    └── event.ts
```

## Development

```bash
npm run dev      # Start with hot reload
npm run build    # Build for production
npm start        # Run production build
```

## Environment Variables

See root [API_KEYS_SETUP.md](../API_KEYS_SETUP.md) for complete list of required API keys.

