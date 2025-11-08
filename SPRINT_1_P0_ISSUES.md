# Sprint 1: Core Extraction + Calendar Write (48h)

## Status: 🚀 Ready to Start

**Goal**: End-to-end flow from image/URL/text input to Google Calendar event creation with user review step.

---

## P0 Issues (Must-Have for MVP)

### Issue #1: Backend API Setup
**Priority**: P0  
**Estimate**: 4h  
**Owner**: Backend Dev

**Tasks**:
- [ ] Initialize Express.js server with TypeScript
- [ ] Set up Google Cloud authentication (service account)
- [ ] Create `/extract` endpoint (POST)
- [ ] Create `/save` endpoint (POST)
- [ ] Add basic error handling middleware
- [ ] Add request validation (Joi/Zod)

**Acceptance Criteria**:
- Server runs on port 3000
- Endpoints return 200/400/500 appropriately
- Request/response logging in place

**Dependencies**: None

---

### Issue #2: Vertex AI Agent Engine Integration
**Priority**: P0  
**Estimate**: 6h  
**Owner**: Backend Dev

**Tasks**:
- [ ] Set up Vertex AI Agent Engine project
- [ ] Create agent configuration
- [ ] Register ADK tools (CalendarRead, CalendarWrite, PlacesResolve, TimeZoneResolve, UrlExpand)
- [ ] Implement tool execution wrappers
- [ ] Add tool error handling (timeouts, retries)

**Acceptance Criteria**:
- Agent can be invoked with tool calls
- Tools return structured responses
- Timeout/retry logic works (10s timeout, 1 retry)

**Dependencies**: Issue #1

---

### Issue #3: Gemini Multimodal Extraction
**Priority**: P0  
**Estimate**: 5h  
**Owner**: Backend Dev

**Tasks**:
- [ ] Set up Gemini API client (multimodal)
- [ ] Create extraction prompt template
- [ ] Implement image → structured JSON extraction
- [ ] Implement text → structured JSON extraction
- [ ] Add response validation (required fields)
- [ ] Handle extraction failures gracefully

**Prompt Template** (draft):
```
Extract event information from the provided content. Return JSON with:
- title (string, required)
- description (string, optional)
- date (ISO8601 date, required)
- time (ISO8601 time, required)
- location (string, optional)

If date/time is relative (e.g., "tomorrow", "next Friday"), resolve to absolute date.
If time is missing, use 12:00 PM as default.
```

**Acceptance Criteria**:
- Extracts title, date, time from 80%+ of test samples
- Returns structured JSON
- Handles missing fields gracefully

**Dependencies**: Issue #2

---

### Issue #4: Flash Image Cleanup (Optional)
**Priority**: P0 (but can skip if time-constrained)  
**Estimate**: 3h  
**Owner**: Backend Dev

**Tasks**:
- [ ] Integrate Media.FlashImage.edit API
- [ ] Add image preprocessing step before Gemini extraction
- [ ] Fallback to original image if processing fails
- [ ] Cache processed images (optional)

**Acceptance Criteria**:
- Processed images improve extraction accuracy
- Fallback works if Flash Image fails
- Processing time <15s

**Dependencies**: Issue #3

**Note**: Can be deferred to Sprint 2 if needed

---

### Issue #5: Location & Timezone Resolution
**Priority**: P0  
**Estimate**: 4h  
**Owner**: Backend Dev

**Tasks**:
- [ ] Implement PlacesResolve tool (ADK)
- [ ] Implement TimeZoneResolve tool (ADK)
- [ ] Add location string → Place ID conversion
- [ ] Add coordinates → timezone lookup
- [ ] Cache Places results (24h TTL)

**Acceptance Criteria**:
- Location strings resolve to Place IDs 90%+ of time
- Timezone correctly identified for coordinates
- Fallback to raw string if resolution fails

**Dependencies**: Issue #2

---

### Issue #6: URL Expansion
**Priority**: P0  
**Estimate**: 3h  
**Owner**: Backend Dev

**Tasks**:
- [ ] Implement UrlExpand tool (ADK)
- [ ] Extract oEmbed/OG tags
- [ ] Return title, description, imageUrl
- [ ] Handle URL failures gracefully

**Acceptance Criteria**:
- Extracts metadata from Instagram/TikTok/Facebook URLs
- Returns structured metadata object
- Handles broken URLs (returns minimal object)

**Dependencies**: Issue #2

---

### Issue #7: Conflict Detection
**Priority**: P0  
**Estimate**: 3h  
**Owner**: Backend Dev

**Tasks**:
- [ ] Implement CalendarRead tool (ADK)
- [ ] Query events in time window (±2h from event time)
- [ ] Return conflicts array
- [ ] Format conflicts for UI display

**Acceptance Criteria**:
- Detects overlapping events correctly
- Returns conflicts with event title, time
- Handles calendar read failures (returns empty array)

**Dependencies**: Issue #2

---

### Issue #8: Calendar Write
**Priority**: P0  
**Estimate**: 4h  
**Owner**: Backend Dev

**Tasks**:
- [ ] Implement CalendarWrite tool (ADK)
- [ ] Convert canonical event JSON to Google Calendar format
- [ ] Set timezone correctly
- [ ] Add event reminders (default)
- [ ] Return event ID and HTML link

**Acceptance Criteria**:
- Event created in user's primary calendar
- Event appears in Google Calendar app
- Returns event link for confirmation

**Dependencies**: Issue #2

---

### Issue #9: Mobile App - Input Screens
**Priority**: P0  
**Estimate**: 6h  
**Owner**: Frontend Dev

**Tasks**:
- [ ] Set up Expo project
- [ ] Create camera capture screen
- [ ] Implement share sheet handler (iOS/Android)
- [ ] Create text input screen
- [ ] Add image preview
- [ ] Add loading states

**Acceptance Criteria**:
- Camera opens and captures image
- Share sheet triggers app
- Text can be pasted/entered
- Images display before submission

**Dependencies**: None

---

### Issue #10: Mobile App - Review Screen
**Priority**: P0  
**Estimate**: 5h  
**Owner**: Frontend Dev

**Tasks**:
- [ ] Create event review UI
- [ ] Display extracted fields (title, date, time, location)
- [ ] Show conflicts (if any)
- [ ] Add edit capability (inline editing)
- [ ] Add "Save to Calendar" button
- [ ] Add "Cancel" button

**Acceptance Criteria**:
- All extracted fields visible
- Conflicts highlighted/warned
- User can edit any field
- Save button triggers API call

**Dependencies**: Issue #9, Issue #1

---

### Issue #11: Mobile App - API Integration
**Priority**: P0  
**Estimate**: 4h  
**Owner**: Frontend Dev

**Tasks**:
- [ ] Set up API client (axios/fetch)
- [ ] Implement POST /extract call
- [ ] Implement POST /save call
- [ ] Add error handling (network, API errors)
- [ ] Add loading states
- [ ] Add success/error toasts

**Acceptance Criteria**:
- API calls work end-to-end
- Errors displayed to user
- Loading states prevent double-submission

**Dependencies**: Issue #1, Issue #9

---

### Issue #12: Success Confirmation Screen
**Priority**: P0  
**Estimate**: 2h  
**Owner**: Frontend Dev

**Tasks**:
- [ ] Create success screen
- [ ] Display event link (open in Google Calendar)
- [ ] Add "Create Another" button
- [ ] Add "Done" button (returns to home)

**Acceptance Criteria**:
- Success message displayed
- Calendar link opens Google Calendar
- User can create another event

**Dependencies**: Issue #10, Issue #11

---

## Sprint 1 Timeline (48h)

**Day 1 (24h)**:
- Morning: Issues #1, #2 (Backend setup + Agent Engine)
- Afternoon: Issues #3, #5, #6 (Extraction + Resolution)
- Evening: Issues #7, #8 (Calendar integration)

**Day 2 (24h)**:
- Morning: Issues #9, #10 (Mobile input + review screens)
- Afternoon: Issues #11, #12 (API integration + success)
- Evening: End-to-end testing + bug fixes

**Buffer**: Issue #4 (Flash Image) can be deferred if needed

---

## Definition of Done (Sprint 1)

- [ ] User can capture flyer image → see extracted event → save to calendar
- [ ] User can share URL → see extracted event → save to calendar
- [ ] User can paste text → see extracted event → save to calendar
- [ ] Conflicts detected and shown to user
- [ ] Events appear in Google Calendar
- [ ] Error handling works (network, API failures)
- [ ] 80%+ extraction accuracy on test dataset

---

## Blockers & Risks

**Potential Blockers**:
- Google Cloud project setup delays
- ADK tool access/permissions
- Share sheet integration complexity (iOS vs Android)

**Mitigations**:
- Start with mock data for frontend development
- Use Google Calendar API directly if ADK tools unavailable
- Test share sheet on both platforms early

---

## Next Sprint Preview (Sprint 2)

- Travel time estimation (DirectionsEstimate)
- Travel buffer in event creation
- UI polish and error states
- Performance optimization

