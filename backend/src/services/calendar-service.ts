import { calendar_v3, google } from 'googleapis';
import { CanonicalEvent } from '../types/event';

export class CalendarService {
  private calendar: calendar_v3.Calendar;
  private auth: any;

  constructor() {
    // Initialize with service account or OAuth2
    // For MVP, we'll use service account
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    this.calendar = google.calendar({ version: 'v3', auth });
  }

  async checkConflicts(
    calendarId: string,
    startTime: string,
    endTime: string
  ): Promise<Array<{ eventId: string; title: string; startTime: string }>> {
    try {
      // Check if this is an all-day event
      const isAllDay = !startTime.includes('T');
      
      let timeMin: string;
      let timeMax: string;
      
      if (isAllDay) {
        // For all-day events, check the entire day
        const startDate = new Date(startTime);
        startDate.setHours(0, 0, 0, 0);
        timeMin = startDate.toISOString();
        
        const endDate = new Date(endTime || this.getNextDay(startTime));
        endDate.setHours(23, 59, 59, 999);
        timeMax = endDate.toISOString();
      } else {
        // For timed events, check ±2 hours
        timeMin = new Date(new Date(startTime).getTime() - 2 * 60 * 60 * 1000).toISOString();
        timeMax = new Date(new Date(endTime || startTime).getTime() + 2 * 60 * 60 * 1000).toISOString();
      }

      const response = await this.calendar.events.list({
        calendarId,
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: 'startTime'
      });

      const conflicts: Array<{ eventId: string; title: string; startTime: string }> = [];
      
      if (response.data.items) {
        for (const event of response.data.items) {
          // Handle both timed and all-day events
          const eventStart = event.start?.dateTime 
            ? new Date(event.start.dateTime)
            : (event.start?.date ? new Date(event.start.date) : null);
          
          const eventEnd = event.end?.dateTime
            ? new Date(event.end.dateTime)
            : (event.end?.date ? new Date(event.end.date) : null);

          if (!eventStart) continue;

          const requestedStart = isAllDay 
            ? new Date(startTime)
            : new Date(startTime);
          const requestedEnd = isAllDay
            ? new Date(endTime || this.getNextDay(startTime))
            : new Date(endTime || startTime);

          // Check for overlap
          if (eventStart < requestedEnd && (eventEnd || eventStart) > requestedStart) {
            conflicts.push({
              eventId: event.id || '',
              title: event.summary || 'Untitled',
              startTime: event.start.dateTime || event.start.date || startTime
            });
          }
        }
      }

      return conflicts;
    } catch (error: any) {
      console.error('Conflict check error:', error.message);
      return []; // Return empty on error
    }
  }

  async createEvent(calendarId: string, event: CanonicalEvent): Promise<{ id: string; htmlLink: string }> {
    try {
      // Check if this is an all-day event (startTime is just a date, no time component)
      const isAllDay = !event.startTime.includes('T');
      
      let googleEvent: calendar_v3.Schema$Event;

      if (isAllDay) {
        // All-day event: use date format (YYYY-MM-DD)
        const startDate = event.startTime.split('T')[0];
        const endDate = event.endTime 
          ? (event.endTime.includes('T') ? event.endTime.split('T')[0] : event.endTime)
          : this.getNextDay(startDate); // All-day events need end date (next day)

        googleEvent = {
          summary: event.title,
          description: event.description || '',
          start: {
            date: startDate
          },
          end: {
            date: endDate
          },
          location: event.location?.address || event.location?.name || '',
          reminders: {
            useDefault: true
          }
        };
      } else {
        // Timed event: use dateTime format
        const startDateTime = new Date(event.startTime);
        const endDateTime = event.endTime
          ? new Date(event.endTime)
          : new Date(startDateTime.getTime() + 60 * 60 * 1000); // Default 1 hour

        googleEvent = {
          summary: event.title,
          description: event.description || '',
          start: {
            dateTime: startDateTime.toISOString(),
            timeZone: event.timezone
          },
          end: {
            dateTime: endDateTime.toISOString(),
            timeZone: event.timezone
          },
          location: event.location?.address || event.location?.name || '',
          reminders: {
            useDefault: true
          }
        };
      }

      const response = await this.calendar.events.insert({
        calendarId,
        requestBody: googleEvent
      });

      return {
        id: response.data.id || '',
        htmlLink: response.data.htmlLink || ''
      };
    } catch (error: any) {
      console.error('Calendar write error:', error.message);
      throw new Error(`Failed to create calendar event: ${error.message}`);
    }
  }

  /**
   * Get the next day for all-day event end date
   */
  private getNextDay(dateString: string): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  }
}

