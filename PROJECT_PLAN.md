# CAL-MGR: Agentic Calendar App - Project Plan

## Product Summary

**Mission**: Transform any user-shared content (flyers, social media URLs, text, emails) into verified Google Calendar events with conflict detection, travel time holds, and optional AI-generated media assets.

**Core Value**: Zero-friction event creation from any input source with intelligent extraction, validation, and enrichment.

---

## MVP Scope & Cutlines

### ✅ MVP In-Scope (Week 1)

**Input Handling**
- [x] Camera image capture (mobile)
- [x] Share sheet URL handling (iOS/Android)
- [x] Text paste/input
- [x] Email forwarding (basic text extraction)

**Core Extraction**
- [x] Flash Image cleanup for flyers
- [x] Gemini multimodal extraction (date, time, location, title, description)
- [x] URL expansion (oEmbed/OG tags) for social links

**Calendar Integration**
- [x] Google Calendar write (single event)
- [x] Conflict detection (existing events in time window)
- [x] Timezone resolution
- [x] Basic travel time estimation (15min default hold)

**Backend Orchestration**
- [x] Vertex AI Agent Engine setup
- [x] ADK tool integration (Calendar, Places, TimeZone, Directions)
- [x] Event JSON canonical format

**UI (Minimal)**
- [x] Camera/share input screen
- [x] Review/edit extracted event before save
- [x] Success confirmation

### ❌ MVP Out-of-Scope (Post-MVP)

- Imagen poster generation
- Veo day-preview video
- Suggested todos
- Multi-event batch processing
- Recurring events
- Event updates/edits
- Memory/context persistence
- Advanced conflict resolution (auto-reschedule)
- Multi-calendar support
- Email parsing (full MIME)

---

## Architecture Decisions

**Stack Choice**: TypeScript/Node.js/Express (backend) + Expo (mobile frontend)

**Rationale**:
- TypeScript provides type safety for ADK tool interfaces
- Node.js ecosystem aligns with Google Cloud SDKs
- Expo enables rapid mobile development with share intents

**Data Model**:
```typescript
interface CanonicalEvent {
  title: string;
  description?: string;
  startTime: ISO8601;
  endTime?: ISO8601;
  location?: {
    name: string;
    address?: string;
    placeId?: string;
    coordinates?: { lat: number; lng: number };
  };
  timezone: string;
  source: 'flyer' | 'url' | 'text' | 'email';
  sourceMetadata?: {
    imageUrl?: string;
    originalUrl?: string;
    extractedText?: string;
  };
  travelBufferMinutes?: number;
  conflicts?: Array<{ eventId: string; title: string; startTime: string }>;
}
```

---

## Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Gemini extraction accuracy | High | Structured prompts + validation rules + user review step |
| ADK tool latency | Medium | Timeout 10s, retry 1x, cache Places results |
| ToS compliance (scraping) | High | Use oEmbed/OG only, no headless browsers |
| Cost (API calls) | Medium | Cache extractions, batch where possible, rate limit |
| Share intent reliability | Medium | Fallback to paste/camera, test on iOS/Android |

---

## Milestone Timeline

**Sprint 1 (48h)**: Core extraction + Calendar write
**Sprint 2 (48h)**: Conflict detection + Travel holds
**Sprint 3 (48h)**: UI polish + Error handling
**Sprint 4 (48h)**: Media generation (Imagen/Veo) + Todos

---

## Success Metrics (MVP)

- 80%+ extraction accuracy (title, date, time, location)
- <5s end-to-end latency (image → review screen)
- Zero ToS violations
- <$0.10 per event (API costs)

