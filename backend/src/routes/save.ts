import express from 'express';
import { CalendarService } from '../services/calendar-service';
import { PlacesResolver } from '../services/places-resolver';
import { TimeZoneResolver } from '../services/timezone-resolver';
import { CanonicalEvent } from '../types/event';
import { z } from 'zod';

const router = express.Router();
const calendarService = new CalendarService();
const placesResolver = new PlacesResolver();
const timezoneResolver = new TimeZoneResolver();

const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startTime: z.string(),
  endTime: z.string().optional(),
  location: z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    placeId: z.string().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }).optional()
  }).nullable().optional(), // Allow null or undefined
  timezone: z.string(),
  source: z.enum(['flyer', 'url', 'text', 'email']),
  sourceMetadata: z.any().optional(), // Allow sourceMetadata
  travelBufferMinutes: z.number().optional(),
  conflicts: z.any().optional() // Allow conflicts (will be ignored on save)
}).passthrough(); // Allow extra fields

router.post('/', async (req, res, next) => {
  try {
    // Validate request body
    const validated = eventSchema.parse(req.body);
    let event = validated as CanonicalEvent;

    // Resolve location if provided (and if it's just a name string, resolve to full address)
    if (event.location && event.location.name && !event.location.address) {
      // Location is just a name string - resolve it using Google Maps API
      try {
        const locationName = event.location.name;
        console.log(`[Save] Resolving location: "${locationName}"`);
        
        const placeResult = await placesResolver.resolve(locationName);
        if (placeResult) {
          // Update location with resolved address and coordinates
          event.location = {
            name: placeResult.name || locationName,
            address: placeResult.formattedAddress,
            placeId: placeResult.placeId,
            coordinates: placeResult.location
          };

          // Resolve timezone from coordinates if available
          if (placeResult.location) {
            const tzResult = await timezoneResolver.resolve(
              placeResult.location.lat,
              placeResult.location.lng
            );
            if (tzResult) {
              event.timezone = tzResult.timeZoneId;
              console.log(`[Save] Resolved timezone: ${tzResult.timeZoneId}`);
            }
          }

          console.log(`[Save] Successfully resolved location to: ${placeResult.formattedAddress}`);
        } else {
          // Couldn't resolve - keep the name as-is
          console.log(`[Save] Could not resolve location "${locationName}", keeping as name only`);
        }
      } catch (error: any) {
        // If resolution fails, keep the location as-is (just the name)
        console.error(`[Save] Error resolving location: ${error.message}`);
      }
    }

    // Create event in calendar
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    const result = await calendarService.createEvent(calendarId, event);

    res.json({
      success: true,
      eventId: result.id,
      htmlLink: result.htmlLink,
      message: 'Event created successfully'
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      return res.status(400).json({ 
        error: 'Invalid event data', 
        details: error.errors,
        received: Object.keys(req.body)
      });
    }
    next(error);
  }
});

export { router as saveRouter };

