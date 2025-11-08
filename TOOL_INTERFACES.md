# ADK Tool Interface Specifications

## Tool Signatures & I/O Shapes

### 1. CalendarRead
**Purpose**: Check for existing events in a time window (conflict detection)

```typescript
interface CalendarReadRequest {
  calendarId: string; // 'primary' or specific calendar
  timeMin: string; // ISO8601
  timeMax: string; // ISO8601
  singleEvents?: boolean; // default true
}

interface CalendarReadResponse {
  events: Array<{
    id: string;
    summary: string;
    start: { dateTime: string; timeZone: string };
    end: { dateTime: string; timeZone: string };
    location?: string;
  }>;
}
```

**Timeout**: 5s  
**Retries**: 1  
**Error Handling**: Return empty array on failure, log error

---

### 2. CalendarWrite
**Purpose**: Create a new calendar event

```typescript
interface CalendarWriteRequest {
  calendarId: string; // 'primary'
  event: {
    summary: string;
    description?: string;
    start: { dateTime: string; timeZone: string };
    end?: { dateTime: string; timeZone: string };
    location?: string;
    reminders?: { useDefault: boolean };
  };
}

interface CalendarWriteResponse {
  id: string;
  htmlLink: string;
  created: string; // ISO8601
}
```

**Timeout**: 10s  
**Retries**: 2  
**Error Handling**: Throw on failure, user sees error message

---

### 3. PlacesResolve
**Purpose**: Resolve location string to Place ID and coordinates

```typescript
interface PlacesResolveRequest {
  query: string; // "123 Main St, San Francisco" or "Golden Gate Park"
  regionCode?: string; // 'US'
}

interface PlacesResolveResponse {
  placeId: string;
  formattedAddress: string;
  location: { lat: number; lng: number };
  name?: string;
}
```

**Timeout**: 5s  
**Retries**: 1  
**Caching**: 24h TTL on query string  
**Error Handling**: Return null, fallback to raw string in event

---

### 4. TimeZoneResolve
**Purpose**: Get timezone for a location

```typescript
interface TimeZoneResolveRequest {
  location: { lat: number; lng: number };
  timestamp?: string; // ISO8601, default now
}

interface TimeZoneResolveResponse {
  timeZoneId: string; // 'America/Los_Angeles'
  offsetSeconds: number;
}
```

**Timeout**: 3s  
**Retries**: 1  
**Error Handling**: Default to user's detected timezone

---

### 5. DirectionsEstimate
**Purpose**: Estimate travel time from user location to event

```typescript
interface DirectionsEstimateRequest {
  origin: { lat: number; lng: number }; // user location
  destination: { lat: number; lng: number }; // event location
  mode?: 'driving' | 'transit' | 'walking'; // default 'driving'
  departureTime?: string; // ISO8601
}

interface DirectionsEstimateResponse {
  durationSeconds: number;
  distanceMeters: number;
  travelBufferMinutes: number; // rounded up + 5min buffer
}
```

**Timeout**: 8s  
**Retries**: 1  
**Error Handling**: Default to 15min buffer if unavailable

---

### 6. UrlExpand
**Purpose**: Extract metadata from social media URLs

```typescript
interface UrlExpandRequest {
  url: string;
}

interface UrlExpandResponse {
  title?: string;
  description?: string;
  imageUrl?: string;
  siteName?: string; // 'Instagram', 'TikTok', etc.
  oEmbed?: Record<string, any>;
  openGraph?: Record<string, any>;
}
```

**Timeout**: 10s  
**Retries**: 1  
**Error Handling**: Return minimal object, proceed with URL as-is

---

### 7. Media.FlashImage.edit
**Purpose**: Clean up flyer images for better OCR/extraction

```typescript
interface FlashImageEditRequest {
  imageBytes: Uint8Array | string; // base64 or binary
  operations?: Array<'denoise' | 'enhance_text' | 'remove_background'>;
}

interface FlashImageEditResponse {
  processedImageBytes: string; // base64
  confidence?: number; // 0-1
}
```

**Timeout**: 15s  
**Retries**: 0 (expensive)  
**Error Handling**: Return original image if processing fails

---

### 8. Media.Imagen3.generatePoster
**Purpose**: Generate event poster (Post-MVP)

```typescript
interface ImagenGeneratePosterRequest {
  eventTitle: string;
  eventDescription?: string;
  style?: 'modern' | 'classic' | 'vibrant';
  dimensions?: { width: number; height: number }; // default 1080x1920
}

interface ImagenGeneratePosterResponse {
  imageUrl: string;
  imageBytes?: string; // base64
}
```

**Timeout**: 30s  
**Retries**: 0  
**Status**: Post-MVP

---

### 9. Media.Veo.createDayPreview
**Purpose**: Generate day-preview video (Post-MVP)

```typescript
interface VeoCreateDayPreviewRequest {
  events: Array<CanonicalEvent>;
  date: string; // ISO8601 date
  style?: 'cinematic' | 'documentary';
}

interface VeoCreateDayPreviewResponse {
  videoUrl: string;
  durationSeconds: number;
}
```

**Timeout**: 60s  
**Retries**: 0  
**Status**: Post-MVP

---

### 10. TasksWrite
**Purpose**: Create suggested todos (Post-MVP)

```typescript
interface TasksWriteRequest {
  eventId: string;
  todos: Array<{
    title: string;
    dueDate?: string; // ISO8601
    notes?: string;
  }>;
}

interface TasksWriteResponse {
  taskIds: string[];
}
```

**Status**: Post-MVP

---

## Agent Orchestration Tool

### Vertex AI Agent Engine Tool Registry

```typescript
interface AgentTool {
  name: string;
  description: string;
  parameters: JSONSchema;
  execute: (params: any) => Promise<any>;
}

const ADK_TOOLS: AgentTool[] = [
  {
    name: 'calendar_read',
    description: 'Check for existing calendar events in a time range',
    parameters: { /* JSON Schema */ },
    execute: calendarRead
  },
  {
    name: 'calendar_write',
    description: 'Create a new calendar event',
    parameters: { /* JSON Schema */ },
    execute: calendarWrite
  },
  // ... etc
];
```

