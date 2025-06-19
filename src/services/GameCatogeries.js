// API service for game categories
const API_BASE_URL = 'https://your-api-endpoint.com/api';

export const gameCategories = {
  // Fetch all game categories
  fetchCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Fetch categories by filter
  fetchCategoriesByFilter: async (filter) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories?filter=${filter}`);
      if (!response.ok) {
        throw new Error('Failed to fetch filtered categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching filtered categories:', error);
      throw error;
    }
  },

  // Search categories
  searchCategories: async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching categories:', error);
      throw error;
    }
  },

  // Get category details
  getCategoryDetails: async (categoryId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch category details');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching category details:', error);
      throw error;
    }
  },

  // Get random categories
  getRandomCategories: async (count = 6) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/random?count=${count}`);
      if (!response.ok) {
        throw new Error('Failed to fetch random categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching random categories:', error);
      throw error;
    }
  }
};

// Expected API response format:
/*
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "الألغاز والأمثال",
      "titleEn": "Riddles and Proverbs",
      "icon": "puzzle-outline",
      "color": "#60a5fa",
      "difficulty": "متوسط",
      "difficultyEn": "medium",
      "questionsCount": 6,
      "category": "general",
      "description": "أسئلة متنوعة حول الألغاز والأمثال الشعبية",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 20
}
*/