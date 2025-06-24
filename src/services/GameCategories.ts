// API service for game categories
import { API_BASE_URL } from '../config/api';
import { ApiResponse, Category } from '../types';

interface CategoryFilter {
  id: string;
  title: string;
  active?: boolean;
}

interface CategoryResponse {
  success: boolean;
  data: Category[];
  total: number;
  page: number;
  limit: number;
}

export const gameCategories = {
  // Fetch all game categories
  fetchCategories: async (): Promise<CategoryResponse> => {
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
  fetchCategoriesByFilter: async (filter: string): Promise<CategoryResponse> => {
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
  searchCategories: async (query: string): Promise<CategoryResponse> => {
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
  getCategoryDetails: async (categoryId: string): Promise<Category> => {
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
  getRandomCategories: async (count: number = 6): Promise<CategoryResponse> => {
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

export type { CategoryFilter, CategoryResponse }; 