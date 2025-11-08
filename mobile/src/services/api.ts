import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { CanonicalEvent } from '../types/event';

export interface ExtractionRequest {
  type: 'image' | 'url' | 'text';
  data: string;
}

export interface ExtractionResponse {
  event: CanonicalEvent;
  confidence?: number;
}

export interface SaveResponse {
  success: boolean;
  eventId: string;
  htmlLink: string;
  message: string;
}

export class ApiService {
  async extract(request: ExtractionRequest): Promise<ExtractionResponse> {
    try {
      const response = await axios.post<ExtractionResponse>(
        API_ENDPOINTS.extract,
        request,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000 // 30s timeout
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Extraction failed');
      } else if (error.request) {
        throw new Error('Network error. Please check your connection.');
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  async save(event: CanonicalEvent): Promise<SaveResponse> {
    try {
      const response = await axios.post<SaveResponse>(
        API_ENDPOINTS.save,
        event,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 15000 // 15s timeout
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Save failed');
      } else if (error.request) {
        throw new Error('Network error. Please check your connection.');
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(API_ENDPOINTS.health, { timeout: 5000 });
      return response.status === 200;
    } catch {
      return false;
    }
  }
}

