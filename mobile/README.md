# Cal-MGR Mobile App

Expo React Native app for iOS and Android.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update API URL in `src/config/api.ts` if needed:
```typescript
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000'  // iOS Simulator
  // ? 'http://10.0.2.2:3000'  // Android Emulator
  // ? 'http://YOUR_IP:3000'    // Physical device
  : 'https://your-production-api.com';
```

3. Start Expo dev server:
```bash
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app (physical device)

## Project Structure

```
src/
├── screens/              # App screens
│   ├── HomeScreen.tsx    # Input screen (camera, URL, text)
│   ├── ReviewScreen.tsx  # Review/edit extracted event
│   └── SuccessScreen.tsx # Success confirmation
├── services/             # API client
│   └── api.ts
├── types/                # TypeScript types
│   └── event.ts
└── config/               # Configuration
    └── api.ts
```

## Features

- **Camera Capture**: Take photo of event flyer
- **URL Sharing**: Share Instagram/TikTok/Facebook event URLs
- **Text Input**: Paste event description
- **Event Review**: Edit extracted fields before saving
- **Conflict Detection**: See overlapping events
- **Calendar Integration**: Save directly to Google Calendar

## Development

```bash
npm start        # Start Expo dev server
npm run ios      # Start iOS simulator
npm run android  # Start Android emulator
```

## Requirements

- Expo Go app (for physical device testing)
- iOS Simulator (for iOS development)
- Android Emulator (for Android development)

See root [QUICK_START.md](../QUICK_START.md) for setup instructions.

