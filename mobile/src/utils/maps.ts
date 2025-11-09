import { Linking, Platform, Alert } from 'react-native';

/**
 * Opens Google Maps with the specified location
 * @param location - Location object with coordinates, placeId, or address, or a string
 */
export async function openInGoogleMaps(location: {
  coordinates?: { lat: number; lng: number };
  placeId?: string;
  address?: string;
  name?: string;
} | string): Promise<void> {
  try {
    let url: string;

    // Handle string location (from calendar events)
    if (typeof location === 'string') {
      const query = encodeURIComponent(location);
      url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    }
    // Prefer coordinates if available
    else if (location.coordinates) {
      const { lat, lng } = location.coordinates;
      url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    }
    // Use placeId if available
    else if (location.placeId) {
      url = `https://www.google.com/maps/search/?api=1&query=place_id:${location.placeId}`;
    }
    // Fall back to address or name
    else if (location.address || location.name) {
      const query = encodeURIComponent(location.address || location.name || '');
      url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    } else {
      Alert.alert('Error', 'No location information available');
      return;
    }

    // Try to open Google Maps app first, fall back to web
    const locationForNav = typeof location === 'string' 
      ? location 
      : (location.coordinates ? `${location.coordinates.lat},${location.coordinates.lng}` : (location.address || location.name || ''));
    
    const googleMapsUrl = Platform.select({
      ios: `comgooglemaps://${url.replace('https://www.google.com/maps/', '')}`,
      android: `google.navigation:q=${encodeURIComponent(locationForNav)}`,
    });

    const canOpen = googleMapsUrl ? await Linking.canOpenURL(googleMapsUrl) : false;
    
    if (canOpen && googleMapsUrl) {
      await Linking.openURL(googleMapsUrl);
    } else {
      // Fall back to web version
      await Linking.openURL(url);
    }
  } catch (error: any) {
    console.error('Error opening Google Maps:', error);
    Alert.alert('Error', 'Could not open Google Maps');
  }
}

/**
 * Check if a location can be opened in Google Maps
 */
export function canOpenInMaps(location?: {
  coordinates?: { lat: number; lng: number };
  placeId?: string;
  address?: string;
  name?: string;
} | string): boolean {
  if (!location) return false;
  if (typeof location === 'string') return location.trim().length > 0;
  return !!(location.coordinates || location.placeId || location.address || location.name);
}

