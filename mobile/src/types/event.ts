export interface CanonicalEvent {
  title: string;
  description?: string;
  startTime: string; // ISO8601
  endTime?: string; // ISO8601
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

