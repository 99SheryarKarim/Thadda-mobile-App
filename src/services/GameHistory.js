// services/api/gameHistory.js
import { API_BASE_URL } from '../config/apiConfig';

export const gameHistoryAPI = {
  // Fetch user's game history
  fetchGameHistory: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/games/history/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Error fetching game history:', error);
      throw error;
    }
  },

  // Get game details by ID
  getGameDetails: async (gameId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/games/${gameId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Error fetching game details:', error);
      throw error;
    }
  },

  // Continue a paused game
  continueGame: async (gameId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/games/${gameId}/continue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Error continuing game:', error);
      throw error;
    }
  },

  // Restart a completed game
  restartGame: async (gameId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/games/${gameId}/restart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Error restarting game:', error);
      throw error;
    }
  },

  // Delete a game from history
  deleteGame: async (gameId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/games/${gameId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting game:', error);
      throw error;
    }
  },

  // Get game statistics
  getGameStats: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/games/stats/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('Error fetching game stats:', error);
      throw error;
    }
  }
};

// Expected API response format for game history:
/*
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "لعبة الأصدقاء",
      "date": "2024-01-15T10:30:00Z",
      "players": [
        {
          "id": 1,
          "name": "أحمد",
          "avatar": "https://example.com/avatar1.jpg"
        }
      ],
      "categories": [
        {
          "id": 1,
          "name": "الألغاز والأمثال",
          "color": "#60a5fa"
        }
      ],
      "status": "completed", // completed, paused, in_progress
      "score": {
        "team1": 45,
        "team2": 38
      },
      "duration": 1500, // in seconds
      "winner": "team1",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 20
}
*/