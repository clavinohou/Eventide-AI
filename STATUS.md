# CAL-MGR Status Report

**Date**: Project Kickoff  
**Sprint**: Sprint 1 (48h) - Core Extraction + Calendar Write  
**Status**: 🟢 Ready to Start

---

## Greeting

Hey Developer! 👋

I'm **CAL-MGR**, your pragmatic project manager and technical co-pilot for this agentic calendar app. I've just set up the project foundation with all the planning artifacts you need to hit the ground running.

---

## Product Summary Confirmation ✅

**Mission**: Transform any user-shared content (flyers, social URLs, text, emails) into verified Google Calendar events with conflict detection, travel time holds, and optional AI-generated media.

**Confirmed Scope**:
- ✅ Inputs: Camera image, share sheet URL, pasted text, forwarded email
- ✅ Core: Gemini extraction → Places/Time/Directions resolve → Calendar write
- ✅ MVP: Conflict checks, basic travel holds (15min default)
- ⏸️ Post-MVP: Imagen posters, Veo videos, suggested todos

**Architecture**: Expo (mobile) + Node.js/Express/TypeScript (backend) + Vertex AI Agent Engine (orchestration) + ADK tools (Calendar, Places, TimeZone, Directions, UrlExpand, Media)

---

## First 48-Hour Plan (Sprint 1)

### Goal
End-to-end flow from input (image/URL/text) → extraction → user review → Google Calendar event creation.

### P0 Issues (12 total, ~48h)

**Backend (Day 1 Morning - 4h)**:
1. Express API setup (`/extract`, `/save` endpoints)
2. Vertex AI Agent Engine integration + ADK tool registration

**Extraction & Resolution (Day 1 Afternoon - 12h)**:
3. Gemini multimodal extraction (image + text)
4. Flash Image cleanup (optional, can defer)
5. Places & Timezone resolution
6. URL expansion (oEmbed/OG tags)

**Calendar Integration (Day 1 Evening - 7h)**:
7. Conflict detection (CalendarRead)
8. Calendar write (CalendarWrite)

**Mobile App (Day 2 - 17h)**:
9. Input screens (camera, share sheet, text)
10. Review screen (edit extracted fields, show conflicts)
11. API integration (calls to backend)
12. Success confirmation screen

### Timeline
- **Day 1 (24h)**: Backend + extraction + calendar integration
- **Day 2 (24h)**: Mobile app + end-to-end testing

### Definition of Done
- [ ] User can capture flyer → see extracted event → save to calendar
- [ ] User can share URL → see extracted event → save to calendar
- [ ] User can paste text → see extracted event → save to calendar
- [ ] Conflicts detected and shown
- [ ] Events appear in Google Calendar
- [ ] 80%+ extraction accuracy on test dataset

---

## Next 3 Actions (Start Here)

1. **Review [SPRINT_1_P0_ISSUES.md](./SPRINT_1_P0_ISSUES.md)** - Detailed breakdown of all 12 P0 issues with tasks, acceptance criteria, and dependencies.

2. **Set up Google Cloud project** - Ensure you have:
   - Vertex AI Agent Engine access
   - ADK tools enabled (Calendar, Places, TimeZone, Directions, UrlExpand, Media)
   - Service account with appropriate permissions

3. **Initialize codebase**:
   ```bash
   # Backend
   mkdir backend && cd backend
   npm init -y
   npm install express typescript @types/express ts-node
   
   # Mobile
   npx create-expo-app mobile --template blank-typescript
   ```

---

## Artifacts Created

✅ **PROJECT_PLAN.md** - MVP scope, architecture decisions, risks, milestones  
✅ **TOOL_INTERFACES.md** - ADK tool signatures, I/O shapes, timeouts, retries  
✅ **SEQUENCE_DIAGRAMS.md** - End-to-end flows for flyer, URL, and text inputs  
✅ **TEST_DATASET.md** - 40 test cases (20 flyers, 10 URLs, 10 text snippets) with acceptance criteria  
✅ **SPRINT_1_P0_ISSUES.md** - Detailed 48h sprint plan with 12 P0 issues  
✅ **README.md** - Project overview and quick start guide

---

## Key Decisions Made

1. **Stack**: TypeScript/Node.js/Express (backend) + Expo (mobile) - consistent, type-safe, rapid development
2. **User Review Step**: Mandatory before save (MVP) - ensures accuracy, enables corrections
3. **Flash Image**: Optional in Sprint 1 - can defer if time-constrained
4. **Conflict Detection**: Simple time-window check (±2h) - no auto-reschedule in MVP
5. **Travel Buffer**: 15min default if DirectionsEstimate unavailable - simple fallback

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Gemini extraction accuracy | Structured prompts + validation + user review step |
| ADK tool latency | 10s timeout, 1 retry, caching where possible |
| Share sheet reliability | Test early on iOS/Android, fallback to paste/camera |
| Cost (API calls) | Cache extractions, rate limit, batch where possible |

---

## Questions?

- **Scope questions** → Check PROJECT_PLAN.md
- **Tool integration** → Check TOOL_INTERFACES.md
- **Flow questions** → Check SEQUENCE_DIAGRAMS.md
- **Testing** → Check TEST_DATASET.md
- **Sprint tasks** → Check SPRINT_1_P0_ISSUES.md

---

**Let's ship this! 🚀**

Start with Issue #1 (Backend API Setup) and work through the sprint plan. I'm here to help with architecture decisions, scope clarifications, and risk mitigation.

