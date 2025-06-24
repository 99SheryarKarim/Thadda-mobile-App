# Thadda Mobile App

A React Native mobile application for interactive quiz games with Arabic language support.

## Tech Stack

- React Native 0.79.3
- Expo SDK 53
- TypeScript
- React Navigation 6
- AsyncStorage
- Axios

## Project Structure

```
src/
├── components/          # Reusable UI components
├── config/             # API configuration
├── context/            # React Context providers
├── routers/            # Navigation structure
│   ├── index.tsx       # Main router container
│   ├── BottomNavigation.tsx  # Tab navigation
│   ├── HomeStack.tsx   # Home tab stack
│   └── CreateGameStack.tsx   # Create Game tab stack
├── screens/            # App screens
├── services/           # API services
├── types/              # TypeScript type definitions
└── utils/              # Utilities and helpers
    └── Routes.ts       # Navigation routes enum
```

## Navigation Structure

- **Bottom Tabs**: Home, Create Game, Game Log
- **Stack Navigation**: Each tab can have multiple screens
- **Routes Enum**: Centralized route management

## Key Features

- User authentication
- Game creation and management
- Quiz gameplay
- Game history tracking
- Arabic language support
- Dark/light theme support

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Run on device: `npm run android` or `npm run ios`

## API Configuration

Update `src/config/api.ts` with your backend API endpoints and authentication tokens.

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run type-check` - TypeScript type checking
- `npm run lint` - ESLint code checking

