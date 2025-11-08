# Test Dataset Definition

## Acceptance Criteria

**Extraction Accuracy**: ≥80% of fields (title, date, time, location) correctly extracted  
**Latency**: <5s from input to review screen  
**User Satisfaction**: User can correct errors in <30s

---

## Test Cases: Flyers (20 samples)

### Category: Concerts & Music Events

1. **Jazz Night at Blue Note**
   - Image: Flyer with "Jazz Night" title, "Friday, March 15, 2024, 8:00 PM", "Blue Note, 131 W 3rd St, NYC"
   - Expected: title="Jazz Night", date="2024-03-15", time="20:00", location="Blue Note, 131 W 3rd St, NYC"
   - Acceptance: All fields correct

2. **Summer Music Festival**
   - Image: Flyer with festival logo, "June 20-22, 2024", "Golden Gate Park, San Francisco"
   - Expected: title="Summer Music Festival", date="2024-06-20", endDate="2024-06-22", location="Golden Gate Park"
   - Acceptance: Multi-day event detected

3. **DJ Set at Warehouse**
   - Image: Low-quality flyer, "Saturday 10pm", "The Warehouse, 456 Industrial Blvd"
   - Expected: title="DJ Set", date=[next Saturday], time="22:00", location="The Warehouse"
   - Acceptance: Relative date resolution works

4. **Classical Concert**
   - Image: Formal flyer, "Beethoven Symphony No. 9", "Sunday, April 7, 3:00 PM", "Carnegie Hall"
   - Expected: All fields correct, timezone="America/New_York"
   - Acceptance: Venue name resolution

5. **Open Mic Night**
   - Image: Hand-drawn flyer, "Every Tuesday 7pm", "The Coffee House"
   - Expected: Recurring pattern detected (MVP: create single instance)
   - Acceptance: Basic extraction works despite poor image quality

### Category: Sports & Fitness

6. **Basketball Game**
   - Image: Team flyer, "Warriors vs Lakers", "March 10, 7:30 PM", "Chase Center"
   - Expected: title="Warriors vs Lakers", date="2024-03-10", time="19:30"
   - Acceptance: Sports event format

7. **Yoga Class**
   - Image: Wellness flyer, "Morning Yoga", "Every Monday 9am", "Central Park"
   - Expected: title="Morning Yoga", date=[next Monday], time="09:00"
   - Acceptance: Recurring event (single instance)

8. **5K Run**
   - Image: Race flyer, "Spring 5K", "Saturday, May 4, 8:00 AM", "Start: Marina Green"
   - Expected: title="5K Run", date="2024-05-04", time="08:00", location="Marina Green"
   - Acceptance: Time extraction (AM/PM)

9. **Soccer Match**
   - Image: Flyer with team logos, "FC Barcelona vs Real Madrid", "April 20, 4:00 PM", "Camp Nou"
   - Expected: All fields correct
   - Acceptance: International venue resolution

10. **CrossFit Challenge**
    - Image: Fitness flyer, "CrossFit Challenge", "Sunday, June 2, 10am-2pm", "The Box Gym"
    - Expected: title="CrossFit Challenge", date="2024-06-02", start="10:00", end="14:00"
    - Acceptance: Duration extraction

### Category: Food & Dining

11. **Wine Tasting**
    - Image: Elegant flyer, "Wine Tasting Evening", "Friday, March 22, 6:30 PM", "Napa Valley Winery"
    - Expected: All fields correct
    - Acceptance: Venue name with region

12. **Food Truck Festival**
    - Image: Colorful flyer, "Food Truck Festival", "Saturday, April 13, 12pm-6pm", "Pier 39"
    - Expected: title="Food Truck Festival", date="2024-04-13", start="12:00", end="18:00"
    - Acceptance: Time range extraction

13. **Cooking Class**
    - Image: Flyer, "Italian Cooking Class", "Wednesday, March 27, 7:00 PM", "Culinary Institute, 789 Main St"
    - Expected: All fields correct
    - Acceptance: Street address resolution

14. **Farmers Market**
    - Image: Simple flyer, "Farmers Market", "Every Sunday 9am-1pm", "Downtown Plaza"
    - Expected: title="Farmers Market", date=[next Sunday], start="09:00", end="13:00"
    - Acceptance: Recurring + time range

15. **Beer Festival**
    - Image: Flyer, "Craft Beer Festival", "May 18-19, 2024", "Expo Center"
    - Expected: Multi-day event
    - Acceptance: Date range

### Category: Arts & Culture

16. **Art Gallery Opening**
    - Image: Minimalist flyer, "New Works by Jane Doe", "Friday, April 5, 6-9pm", "Modern Art Gallery"
    - Expected: title="Art Gallery Opening", date="2024-04-05", start="18:00", end="21:00"
    - Acceptance: Time range without AM/PM

17. **Theater Performance**
    - Image: Playbill-style flyer, "Hamlet", "March 28-April 14", "Shakespeare Theater, 123 Theater St"
    - Expected: Multi-day event, location resolved
    - Acceptance: Extended date range

18. **Poetry Reading**
    - Image: Flyer, "Poetry Night", "Thursday, March 21, 7:30 PM", "The Bookstore Cafe"
    - Expected: All fields correct
    - Acceptance: Basic extraction

19. **Film Screening**
    - Image: Movie poster-style, "Indie Film Night", "Saturday, April 6, 8pm", "Cinema Arts, 456 Film Ave"
    - Expected: All fields correct
    - Acceptance: Venue + address

20. **Museum Exhibition**
    - Image: Flyer, "Ancient Art Exhibition", "Opens March 15, 10am-5pm daily", "Metropolitan Museum"
    - Expected: title="Ancient Art Exhibition", date="2024-03-15", start="10:00", end="17:00"
    - Acceptance: Opening date + hours

---

## Test Cases: Social Media URLs (10 samples)

1. **Instagram Event Post**
   - URL: `https://www.instagram.com/p/ABC123xyz/`
   - OG Tags: title="Sunset Yoga Session", description="Join us for yoga at the beach", image="beach-yoga.jpg"
   - Expected: Extract from OG tags + Gemini fallback
   - Acceptance: Title and description extracted

2. **TikTok Event Video**
   - URL: `https://www.tiktok.com/@venue/video/1234567890`
   - OG Tags: title="Concert Tonight!", description="Live music at The Venue"
   - Expected: Basic extraction
   - Acceptance: Title extracted

3. **Facebook Event**
   - URL: `https://www.facebook.com/events/123456789/`
   - OG Tags: title="Community Market", start_time="2024-04-10T10:00:00", location="City Park"
   - Expected: Full event details from OG tags
   - Acceptance: Date, time, location all extracted

4. **Twitter/X Event Tweet**
   - URL: `https://twitter.com/user/status/1234567890`
   - OG Tags: title="Tech Meetup", description="Join us March 20 at 6pm"
   - Expected: Extract from description text
   - Acceptance: Date and time parsed from text

5. **LinkedIn Event**
   - URL: `https://www.linkedin.com/events/1234567890/`
   - OG Tags: title="Networking Event", start_time="2024-05-15T18:00:00"
   - Expected: Structured event data
   - Acceptance: Date and time extracted

6. **YouTube Event Video**
   - URL: `https://www.youtube.com/watch?v=ABC123`
   - OG Tags: title="Concert Livestream", description="Live on April 1, 8pm EST"
   - Expected: Extract from description
   - Acceptance: Date and time parsed

7. **Eventbrite Event**
   - URL: `https://www.eventbrite.com/e/event-123456789`
   - OG Tags: title="Workshop: AI Basics", start_time="2024-04-25T14:00:00", location="Tech Hub"
   - Expected: Full structured data
   - Acceptance: All fields extracted

8. **Meetup Event**
   - URL: `https://www.meetup.com/group/events/123456789/`
   - OG Tags: title="Hiking Group", start_time="2024-05-05T09:00:00", location="Trailhead"
   - Expected: Structured event
   - Acceptance: All fields extracted

9. **Reddit Event Post**
   - URL: `https://www.reddit.com/r/events/comments/abc123/event_title/`
   - OG Tags: title="Community Cleanup", description="Saturday, April 20, 10am"
   - Expected: Extract from description
   - Acceptance: Date and time parsed

10. **Generic Event Website**
    - URL: `https://example.com/events/summer-festival-2024`
    - OG Tags: title="Summer Festival 2024", description="June 15-17, 2024", image="festival.jpg"
    - Expected: Basic extraction
    - Acceptance: Title and date range extracted

---

## Test Cases: Text Snippets (10 samples)

1. **Email Forward**
   ```
   Subject: You're invited!
   Body: Join us for a networking event on Friday, March 15, 2024 at 6:00 PM at The Tech Hub, 123 Innovation Drive.
   ```
   - Expected: title="Networking Event", date="2024-03-15", time="18:00", location="The Tech Hub"
   - Acceptance: All fields extracted

2. **Text Message**
   ```
   Hey! Don't forget about the concert tomorrow at 8pm at Madison Square Garden
   ```
   - Expected: title="Concert", date=[tomorrow], time="20:00", location="Madison Square Garden"
   - Acceptance: Relative date resolution

3. **Calendar Invite Text**
   ```
   Event: Team Meeting
   Date: April 10, 2024
   Time: 2:00 PM - 3:30 PM
   Location: Conference Room A
   ```
   - Expected: All fields + duration
   - Acceptance: Structured format parsed

4. **Casual Text**
   ```
   coffee meetup this saturday 3pm at blue bottle
   ```
   - Expected: title="Coffee Meetup", date=[next Saturday], time="15:00", location="Blue Bottle"
   - Acceptance: Informal text parsed

5. **Event Description**
   ```
   Annual Charity Gala
   Saturday, May 4, 2024
   7:00 PM - 11:00 PM
   Grand Ballroom, Hotel Intercontinental
   ```
   - Expected: All fields + time range
   - Acceptance: Multi-line format

6. **Reminder Text**
   ```
   Reminder: Doctor's appointment on Monday, March 25 at 10:30 AM, 456 Medical Center
   ```
   - Expected: title="Doctor's Appointment", date="2024-03-25", time="10:30", location="456 Medical Center"
   - Acceptance: Appointment format

7. **Social Media Caption**
   ```
   Can't wait for the festival this weekend! June 8-9 at the park, gates open at 11am
   ```
   - Expected: title="Festival", date="2024-06-08", endDate="2024-06-09", time="11:00"
   - Acceptance: Multi-day + time

8. **Newsletter Snippet**
   ```
   Upcoming Event: Book Club Discussion
   When: Thursday, April 18, 7:00 PM
   Where: The Book Nook, 789 Reading St
   ```
   - Expected: All fields extracted
   - Acceptance: Newsletter format

9. **Voice-to-Text**
   ```
   meeting with john next tuesday at 2pm in the office
   ```
   - Expected: title="Meeting with John", date=[next Tuesday], time="14:00", location="Office"
   - Acceptance: Informal + relative date

10. **Multi-Event Text**
    ```
    Weekend plans:
    - Friday: Dinner at 7pm, The Restaurant
    - Saturday: Movie at 8pm, Cinema
    - Sunday: Brunch at 11am, Cafe
    ```
    - Expected: MVP creates first event only
    - Acceptance: Basic extraction from first item

---

## Edge Cases & Failure Modes

### Ambiguous Dates
- "Next week" → Should resolve to specific date
- "Tomorrow" → Should resolve based on current date
- "Friday" → Should resolve to next Friday

### Missing Fields
- No time → Default to 12:00 PM or prompt user
- No location → Event created without location
- No title → Use "Untitled Event" or first 50 chars of description

### Invalid Inputs
- Corrupted image → Show error, allow retry
- Broken URL → Show error, allow manual entry
- Empty text → Show validation error

### Conflict Scenarios
- Exact time conflict → Show warning, allow override
- Overlapping events → Show warning, suggest adjustment
- No conflicts → Proceed normally

---

## Test Execution Plan

1. **Automated Tests**: Unit tests for extraction logic, tool interfaces
2. **Manual Tests**: Run all 40 samples through UI, record accuracy
3. **Performance Tests**: Measure latency for each input type
4. **Error Tests**: Inject failures, verify graceful degradation

---

## Success Metrics

- **Extraction Accuracy**: ≥32/40 samples (80%) with all critical fields correct
- **Latency**: <5s for 90% of samples
- **Error Recovery**: 100% of errors show user-friendly message + retry option

