// API Configuration
// Set this to false when you have a real backend API
export const USE_MOCK_API = false; // Enabled real API mode with fresh token

// Your API base URL - using the production URL
export const API_BASE_URL = 'https://tahadda-dev-env.onrender.com/api/v1';

// API endpoints - matching the website's API slice
export const API_ENDPOINTS = {
  // Statistics
  GAMES_STATISTICS: '/community/games/gamesStatistics',
  
  // User Games
  USER_GAMES: '/community/mygames',
  
  // Game Management
  CREATE_GAME: '/community/games/create',
  UPDATE_GAME: '/community/games', // Will append /{gameId}
  DELETE_GAME: '/community/games', // Will append /{gameId}
  UPDATE_GAME_STATUS: '/community/games', // Will append /{gameId}/status
  
  // Questions
  SAVE_QUESTIONS: '/question/saveQuestions',
  GET_USER_QUESTIONS: '/game/getUserQuestions',
  
  // Game Operations
  VERIFY_GAME: '/game/approve',
  DECREMENT_GAMES: '/game/decrement',
  
  // Authentication
  LOGIN: '/auth/login',
};

// Mock delay for API calls (in milliseconds)
export const MOCK_API_DELAY = 1000;

// Development settings
export const DEV_SETTINGS = {
  // Set this to true to use a test token (for development only)
  USE_TEST_TOKEN: true,
  // Test token - using the fresh token you provided
  TEST_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY2MmMxYmNmLTMzNzgtNDYyYS1hODExLWRjZDA2NjMyNDE2NiIsInJvbGUiOiJ2aXNpdG9yIiwiZW1haWwiOiJ0ZXN0MTNAZ21haWwuY29tIiwiaWF0IjoxNzUwNTA5MTkzLCJleHAiOjE3NTIzMjM1OTN9.s1nP4OiXS6sMTBu7WitZp2DR1xw6MPt1ysgIOizKFaY',
  // Set this to true to test API without authentication (for development only)
  BYPASS_AUTH: false, // Using real authentication
}; 