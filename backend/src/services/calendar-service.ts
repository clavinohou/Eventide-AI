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
      const response = await this.calendar.events.list({
        calendarId,
        timeMin: new Date(new Date(startTime).getTime() - 2 * 60 * 60 * 1000).toISOString(), // -2h
        timeMax: new Date(new Date(endTime).getTime() + 2 * 60 * 60 * 1000).toISOString(), // +2h
        singleEvents: true,
        orderBy: 'startTime'
      });

      const conflicts: Array<{ eventId: string; title: string; startTime: string }> = [];
      
      if (response.data.items) {
        for (const event of response.data.items) {
          if (event.start?.dateTime) {
            const eventStart = new Date(event.start.dateTime);
            const requestedStart = new Date(startTime);
            const requestedEnd = new Date(endTime || startTime);

            // Check for overlap
            if (eventStart < requestedEnd && (event.end?.dateTime ? new Date(event.end.dateTime) : eventStart) > requestedStart) {
              conflicts.push({
                eventId: event.id || '',
                title: event.summary || 'Untitled',
                startTime: event.start.dateTime
              });
            }
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
      const startDateTime = new Date(`${event.startTime.split('T')[0]}T${event.startTime.split('T')[1] || '12:00:00'}`);
      const endDateTime = event.endTime
        ? new Date(`${event.endTime.split('T')[0]}T${event.endTime.split('T')[1] || '12:00:00'}`)
        : new Date(startDateTime.getTime() + 60 * 60 * 1000); // Default 1 hour

      const googleEvent: calendar_v3.Schema$Event = {
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
}

