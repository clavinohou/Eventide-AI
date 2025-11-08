/**
 * Application-wide constants
 */

export const SITE_NAME = 'CAL-MGR';
export const SITE_DESCRIPTION =
  'Transform any content into verified Google Calendar events. Share flyers, URLs, or text and let AI handle the rest.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cal-mgr.app';

export const BRAND_COLORS = {
  primary: '#0694ff',
  secondary: '#8b5cf6',
  accent: '#f97316',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  neutral: '#111827',
};

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
};

export const API_ENDPOINTS = {
  extract: process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/extract`
    : 'http://localhost:3001/extract',
  save: process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/save`
    : 'http://localhost:3001/save',
  health: process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/health`
    : 'http://localhost:3001/health',
};
