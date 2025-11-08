import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export interface TimeZoneResult {
  timeZoneId: string;
  offsetSeconds: number;
}

export class TimeZoneResolver {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
  }

  async resolve(lat: number, lng: number, timestamp?: string): Promise<TimeZoneResult | null> {
    try {
      const time = timestamp ? new Date(timestamp).getTime() / 1000 : Math.floor(Date.now() / 1000);

      const response = await client.timezone({
        params: {
          location: { lat, lng },
          timestamp: time,
          key: this.apiKey
        },
        timeout: 3000
      });

      if (response.data.timeZoneId) {
        return {
          timeZoneId: response.data.timeZoneId,
          offsetSeconds: response.data.rawOffset + (response.data.dstOffset || 0)
        };
      }

      return null;
    } catch (error: any) {
      console.error('Timezone resolution error:', error.message);
      return null; // Fallback to user's timezone
    }
  }
}

