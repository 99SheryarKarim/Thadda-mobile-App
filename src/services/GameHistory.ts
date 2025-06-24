// services/api/gameHistory.ts
import { API_BASE_URL } from '../config/api';
import { ApiResponse, Game } from '../types';

interface GameHistoryItem {
  id: number;
  name: string;
  date: string;
  players: Array<{
    id: number;
    name: string;
    avatar?: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    color: string;
  }>;
  status: 'completed' | 'paused' | 'in_progress';
  score: {
    team1: number;
    team2: number;
  };
  duration: number; // in seconds
  winner: 'team1' | 'team2';
  createdAt: string;
  updatedAt: string;
}

interface GameHistoryResponse {
  success: boolean;
  data: GameHistoryItem[];
  total: number;
  page: number;
  limit: number;
}

interface GameStats {
  totalGames: number;
  completedGames: number;
  pausedGames: number;
  averageScore: number;
  totalPlayTime: number;
  favoriteCategories: Array<{
    id: number;
    name: string;
    count: number;
  }>;
}

export const gameHistoryAPI = {
  // Fetch user's game history
  fetchGameHistory: async (userId: string): Promise<GameHistoryResponse> => {
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
  getGameDetails: async (gameId: string): Promise<Game> => {
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
  continueGame: async (gameId: string): Promise<ApiResponse> => {
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
  restartGame: async (gameId: string): Promise<ApiResponse> => {
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
  deleteGame: async (gameId: string): Promise<ApiResponse> => {
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
  getGameStats: async (userId: string): Promise<GameStats> => {
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

export type { GameHistoryItem, GameHistoryResponse, GameStats }; 