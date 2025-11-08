import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export interface PlaceResult {
  placeId: string;
  formattedAddress: string;
  location: { lat: number; lng: number };
  name?: string;
}

export class PlacesResolver {
  private apiKey: string;
  private cache: Map<string, { result: PlaceResult; timestamp: number }>;
  private cacheTTL = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
    this.cache = new Map();
  }

  async resolve(query: string, regionCode: string = 'US'): Promise<PlaceResult | null> {
    // Check cache
    const cached = this.cache.get(query);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.result;
    }

    try {
      const response = await client.findPlaceFromText({
        params: {
          input: query,
          inputtype: 'textquery',
          fields: ['place_id', 'formatted_address', 'geometry', 'name'],
          key: this.apiKey,
          region: regionCode
        },
        timeout: 5000
      });

      if (response.data.candidates && response.data.candidates.length > 0) {
        const candidate = response.data.candidates[0];
        const result: PlaceResult = {
          placeId: candidate.place_id!,
          formattedAddress: candidate.formatted_address || query,
          location: {
            lat: candidate.geometry!.location.lat,
            lng: candidate.geometry!.location.lng
          },
          name: candidate.name
        };

        // Cache result
        this.cache.set(query, { result, timestamp: Date.now() });
        return result;
      }

      return null;
    } catch (error: any) {
      console.error('Places resolution error:', error.message);
      return null; // Fallback to raw string
    }
  }
}

