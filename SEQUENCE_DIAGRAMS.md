# End-to-End Sequence Diagrams

## Flow 1: Flyer → Calendar Event

```
User                    Mobile App              Backend API          Vertex Agent          ADK Tools
 |                          |                       |                    |                    |
 |--[Camera Capture]------->|                       |                    |                    |
 |                          |--[POST /extract]----->|                    |                    |
 |                          |  {image: base64}      |                    |                    |
 |                          |                       |--[FlashImage]----->|                    |
 |                          |                       |                    |--[edit]----------->|
 |                          |                       |                    |<--[cleaned image]--|
 |                          |                       |<--[processed]------|                    |
 |                          |                       |--[Gemini Extract]->|                    |
 |                          |                       |  {image, prompt}   |                    |
 |                          |                       |<--[structured]-----|                    |
 |                          |                       |  {title, date,     |                    |
 |                          |                       |   time, location}  |                    |
 |                          |                       |--[PlacesResolve]-->|                    |
 |                          |                       |                    |--[resolve]-------->|
 |                          |                       |                    |<--[placeId, coords]|
 |                          |                       |<--[location]-------|                    |
 |                          |                       |--[TimeZoneResolve]->|                    |
 |                          |                       |                    |--[resolve]-------->|
 |                          |                       |                    |<--[timezone]-------|
 |                          |                       |<--[timezone]-------|                    |
 |                          |                       |--[CalendarRead]--->|                    |
 |                          |                       |                    |--[read]------------>|
 |                          |                       |                    |<--[conflicts]------|
 |                          |                       |<--[conflicts]-------|                    |
 |                          |<--[200 OK]------------|                    |                    |
 |                          |  {event, conflicts}   |                    |                    |
 |<--[Review Screen]--------|                       |                    |                    |
 |  [Edit if needed]        |                       |                    |                    |
 |--[Confirm Save]--------->|                       |                    |                    |
 |                          |--[POST /save]-------->|                    |                    |
 |                          |  {event}              |                    |                    |
 |                          |                       |--[CalendarWrite]--->|                    |
 |                          |                       |                    |--[write]----------->|
 |                          |                       |                    |<--[eventId]---------|
 |                          |                       |<--[eventId]---------|                    |
 |                          |<--[200 OK]------------|                    |                    |
 |                          |  {eventId, link}      |                    |                    |
 |<--[Success Screen]-------|                       |                    |                    |
```

**Key Decision Points**:
- User review step (mandatory for MVP)
- Conflict detection before save
- Flash Image is optional (fallback to raw image)

---

## Flow 2: Share URL → Calendar Event

```
User                    Mobile App              Backend API          Vertex Agent          ADK Tools
 |                          |                       |                    |                    |
 |--[Share Sheet]---------->|                       |                    |                    |
 |  (Instagram/TikTok URL)  |                       |                    |                    |
 |                          |--[POST /extract]----->|                    |                    |
 |                          |  {url: string}        |                    |                    |
 |                          |                       |--[UrlExpand]------->|                    |
 |                          |                       |                    |--[expand]---------->|
 |                          |                       |                    |<--[og:title,        |
 |                          |                       |                    |    og:image, etc]   |
 |                          |                       |<--[metadata]-------|                    |
 |                          |                       |--[Gemini Extract]->|                    |
 |                          |                       |  {url, metadata,   |                    |
 |                          |                       |   thumbnail}       |                    |
 |                          |                       |<--[structured]-----|                    |
 |                          |                       |  {title, date,     |                    |
 |                          |                       |   time, location}  |                    |
 |                          |                       |--[PlacesResolve]-->|                    |
 |                          |                       |                    |--[resolve]-------->|
 |                          |                       |                    |<--[placeId, coords]|
 |                          |                       |<--[location]-------|                    |
 |                          |                       |--[TimeZoneResolve]->|                    |
 |                          |                       |                    |--[resolve]-------->|
 |                          |                       |                    |<--[timezone]-------|
 |                          |                       |<--[timezone]-------|                    |
 |                          |                       |--[CalendarRead]--->|                    |
 |                          |                       |                    |--[read]------------>|
 |                          |                       |                    |<--[conflicts]------|
 |                          |                       |<--[conflicts]-------|                    |
 |                          |<--[200 OK]------------|                    |                    |
 |                          |  {event, conflicts,   |                    |                    |
 |                          |   sourceImage}        |                    |                    |
 |<--[Review Screen]--------|                       |                    |                    |
 |  [Edit if needed]        |                       |                    |                    |
 |--[Confirm Save]--------->|                       |                    |                    |
 |                          |                    |                    |
 |                          |--[POST /save]-------->|                    |                    |
 |                          |  {event}              |                    |                    |
 |                          |                       |--[CalendarWrite]--->|                    |
 |                          |                       |                    |--[write]----------->|
 |                          |                       |                    |<--[eventId]---------|
 |                          |                       |<--[eventId]---------|                    |
 |                          |<--[200 OK]------------|                    |                    |
 |                          |  {eventId, link}      |                    |                    |
 |<--[Success Screen]-------|                       |                    |                    |
```

**Key Differences from Flyer Flow**:
- No Flash Image step
- UrlExpand provides initial metadata
- Thumbnail image attached to event description

---

## Flow 3: Text/Email → Calendar Event

```
User                    Mobile App              Backend API          Vertex Agent          ADK Tools
 |                          |                       |                    |                    |
 |--[Paste Text]----------->|                       |                    |                    |
 |  or                      |                       |                    |                    |
 |--[Forward Email]-------->|                       |                    |                    |
 |                          |--[POST /extract]----->|                    |                    |
 |                          |  {text: string}       |                    |                    |
 |                          |                       |--[Gemini Extract]->|                    |
 |                          |                       |  {text, prompt}    |                    |
 |                          |                       |<--[structured]-----|                    |
 |                          |                       |  {title, date,     |                    |
 |                          |                       |   time, location}  |                    |
 |                          |                       |--[PlacesResolve]-->|                    |
 |                          |                       |                    |--[resolve]-------->|
 |                          |                       |                    |<--[placeId, coords]|
 |                          |                       |<--[location]-------|                    |
 |                          |                       |--[TimeZoneResolve]->|                    |
 |                          |                       |                    |--[resolve]-------->|
 |                          |                       |                    |<--[timezone]-------|
 |                          |                       |<--[timezone]-------|                    |
 |                          |                       |--[CalendarRead]--->|                    |
 |                          |                       |                    |--[read]------------>|
 |                          |                       |                    |<--[conflicts]------|
 |                          |                       |<--[conflicts]-------|                    |
 |                          |<--[200 OK]------------|                    |                    |
 |                          |  {event, conflicts}   |                    |                    |
 |<--[Review Screen]--------|                       |                    |                    |
 |  [Edit if needed]        |                       |                    |                    |
 |--[Confirm Save]--------->|                       |                    |                    |
 |                          |--[POST /save]-------->|                    |                    |
 |                          |  {event}              |                    |                    |
 |                          |                       |--[CalendarWrite]--->|                    |
 |                          |                       |                    |--[write]----------->|
 |                          |                       |                    |<--[eventId]---------|
 |                          |                       |<--[eventId]---------|                    |
 |                          |<--[200 OK]------------|                    |                    |
 |                          |  {eventId, link}      |                    |                    |
 |<--[Success Screen]-------|                       |                    |                    |
```

**Simplest Flow**:
- No media processing
- Direct text → Gemini extraction
- Fastest path to calendar event

---

## Error Handling Flows

### Extraction Failure
```
Gemini Extract fails → Return partial event + error message → User can manually fill
```

### Places Resolution Failure
```
PlacesResolve fails → Use raw location string → Event still created
```

### Calendar Write Failure
```
CalendarWrite fails → Show error + retry option → Log error for debugging
```

### Timeout Handling
```
Any tool timeout → Retry once → If still fails, proceed with partial data or show error
```

