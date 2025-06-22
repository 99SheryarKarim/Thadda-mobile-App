// API Service for handling all API calls
// Replace the base URL with your actual API endpoint

import { API_BASE_URL, API_ENDPOINTS, DEV_SETTINGS } from '../config/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    let token = null;
    
    // Check if we should bypass authentication for testing
    if (DEV_SETTINGS.BYPASS_AUTH) {
      console.log('Bypassing authentication for testing');
      return {
        'Content-Type': 'application/json',
      };
    }
    
    // Check if we should use test token for development
    if (DEV_SETTINGS.USE_TEST_TOKEN && DEV_SETTINGS.TEST_TOKEN) {
      token = DEV_SETTINGS.TEST_TOKEN;
      console.log('Using test token for API calls');
    } else {
      // Try to get token from AsyncStorage
      try {
        // TODO: Get from AsyncStorage or AuthContext
        token = null;
      } catch (error) {
        console.error('Error getting token:', error);
      }
    }
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add Authorization header with Bearer token format
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', response.headers);
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      try {
        const errorData = await response.json();
        console.log('Error Response Data:', errorData);
        
        // Handle different error response formats
        if (errorData.error && errorData.error.message) {
          errorMessage = errorData.error.message;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else {
          errorMessage = errorData.detail || errorMessage;
        }
      } catch (e) {
        console.log('Could not parse error response as JSON:', e);
        // If we can't parse JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      
      console.log('Throwing error with message:', errorMessage);
      throw new Error(errorMessage);
    }
    
    try {
      const data = await response.json();
      console.log('API Response Data:', data);
      return data;
    } catch (e) {
      console.log('Could not parse response as JSON:', e);
      throw new Error('Invalid response format from server');
    }
  }

  // Get games statistics
  async getGamesStatistics() {
    try {
      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.GAMES_STATISTICS}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        // Add credentials to handle cookies like the website
        credentials: 'include',
      });

      return this.handleResponse(response);
    } catch (error) {
      console.error('API Error - getGamesStatistics:', error);
      throw error;
    }
  }

  // Get user games
  async getUserGames() {
    try {
      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.USER_GAMES}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      return this.handleResponse(response);
    } catch (error) {
      console.error('API Error - getUserGames:', error);
      throw error;
    }
  }

  // Delete a game
  async deleteGame(gameId) {
    try {
      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.DELETE_GAME}/${gameId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      return this.handleResponse(response);
    } catch (error) {
      console.error('API Error - deleteGame:', error);
      throw error;
    }
  }

  // Get user statistics
  async getUserStats() {
    try {
      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.USER_STATS}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse(response);
    } catch (error) {
      console.error('API Error - getUserStats:', error);
      throw error;
    }
  }

  // Get created games
  async getCreatedGames() {
    try {
      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.CREATED_GAMES}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse(response);
    } catch (error) {
      console.error('API Error - getCreatedGames:', error);
      throw error;
    }
  }

  // Create a new game
  async createGame(gameData) {
    try {
      console.log('Creating game with data...');
      console.log('Game data:', gameData);
      
      const headers = {
        'Content-Type': 'application/json',
        ...(this.getAuthHeaders()['Authorization'] && {
          'Authorization': this.getAuthHeaders()['Authorization']
        }),
      };
      
      console.log('Request headers:', headers);
      console.log('Request URL:', `${this.baseURL}${API_ENDPOINTS.CREATE_GAME}`);
      
      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.CREATE_GAME}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(gameData),
        credentials: 'include',
      });

      console.log('Raw response:', response);
      return this.handleResponse(response);
    } catch (error) {
      console.error('API Error - createGame:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      throw error;
    }
  }

  // Update a game
  async updateGame(gameId, gameData) {
    try {
      console.log('Updating game with ID:', gameId);
      console.log('Game data:', gameData);
      
      const headers = {
        'Content-Type': 'application/json',
        ...(this.getAuthHeaders()['Authorization'] && {
          'Authorization': this.getAuthHeaders()['Authorization']
        }),
      };
      
      console.log('Request headers:', headers);
      console.log('Request URL:', `${this.baseURL}${API_ENDPOINTS.UPDATE_GAME}/${gameId}`);
      
      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.UPDATE_GAME}/${gameId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(gameData),
        credentials: 'include',
      });

      console.log('Raw response:', response);
      return this.handleResponse(response);
    } catch (error) {
      console.error('API Error - updateGame:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      throw error;
    }
  }

  // Request accreditation for a game
  async requestAccreditation(gameId) {
    try {
      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.GAMES}/${gameId}/accreditation`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse(response);
    } catch (error) {
      console.error('API Error - requestAccreditation:', error);
      throw error;
    }
  }

  // Update game status (publish/submit for review)
  async updateGameStatus(gameId, status) {
    try {
      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.UPDATE_GAME_STATUS}/${gameId}/status`, {
        method: 'PUT',
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
        credentials: 'include',
      });

      return this.handleResponse(response);
    } catch (error) {
      console.error('API Error - updateGameStatus:', error);
      throw error;
    }
  }

  // Login to get authentication token
  async login(email, password) {
    try {
      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await this.handleResponse(response);
      return data;
    } catch (error) {
      console.error('API Error - login:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const apiService = new ApiService();

// Export the class for testing or multiple instances
export default ApiService; 