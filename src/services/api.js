// API Service for handling all API calls
// Replace the base URL with your actual API endpoint

const API_BASE_URL = 'https://your-api-domain.com'; // Replace with your actual API URL

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    // TODO: Get token from your auth storage (AsyncStorage, etc.)
    const token = null; // Replace with actual token retrieval
    
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Delete a game
  async deleteGame(gameId) {
    try {
      const response = await fetch(`${this.baseURL}/api/games/${gameId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
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
      const response = await fetch(`${this.baseURL}/api/user/stats`, {
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
      const response = await fetch(`${this.baseURL}/api/games/created`, {
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
      const response = await fetch(`${this.baseURL}/api/games`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(gameData),
      });

      return this.handleResponse(response);
    } catch (error) {
      console.error('API Error - createGame:', error);
      throw error;
    }
  }

  // Update a game
  async updateGame(gameId, gameData) {
    try {
      const response = await fetch(`${this.baseURL}/api/games/${gameId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(gameData),
      });

      return this.handleResponse(response);
    } catch (error) {
      console.error('API Error - updateGame:', error);
      throw error;
    }
  }

  // Request accreditation for a game
  async requestAccreditation(gameId) {
    try {
      const response = await fetch(`${this.baseURL}/api/games/${gameId}/accreditation`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse(response);
    } catch (error) {
      console.error('API Error - requestAccreditation:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const apiService = new ApiService();

// Export the class for testing or multiple instances
export default ApiService; 