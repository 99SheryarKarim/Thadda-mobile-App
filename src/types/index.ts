// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'visitor' | 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// Game Types
export interface Game {
  id: string;
  name: string;
  title: string;
  description?: string;
  gameName?: string;
  gameDescription?: string;
  status: 'draft' | 'approved' | 'rejected' | 'نشطة' | 'مسودة' | 'متوقفة';
  createdAt: string;
  createdDate?: string;
  image?: string;
  gameImage?: string;
  img?: string;
  category?: string;
  categories?: Category[];
  statistics?: {
    players: number;
    views: number;
  };
  players?: number;
  views?: number;
  difficulty?: string;
  questionsCount?: number;
  questions?: Question[];
}

// Category Types
export interface Category {
  id: string;
  name: string;
  categoryName?: string;
  title?: string;
  image?: string;
  categoryImage?: string;
  questions?: Question[];
  questionData?: any;
  questionsCount?: number;
}

// Question Types
export interface Question {
  id: string;
  text: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  categoryId: string;
}

// Navigation Types
export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Play: undefined;
  Profile: undefined;
  CreateGame: undefined;
  GameHistory: undefined;
  CreatedGamesDashboard: undefined;
  GameCreationScreen: undefined;
  GameShowScreen: { gameId: string };
  APITestScreen: undefined;
  GameLogScreen: undefined;
  GameCategories: undefined;
};

export type TabParamList = {
  Home: undefined;
  'Create Game': undefined;
  'Game Log': undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Play: undefined;
};

export type CreateGameStackParamList = {
  CreatedGamesDashboard: undefined;
  GameCreationScreen: undefined;
  GameShowScreen: { gameId: string };
  APITestScreen: undefined;
};

// Context Types
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  loading: boolean;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

export interface CreatedGamesContextType {
  createdGames: Game[];
  loading: boolean;
  error: string | null;
  fetchCreatedGames: () => Promise<void>;
  addCreatedGame: (game: Game) => void;
  updateCreatedGame: (gameId: string, updates: Partial<Game>) => void;
  deleteCreatedGame: (gameId: string) => void;
}

// API Service Types
export interface ApiServiceConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

// Component Props Types
export interface GameCardProps {
  game: Game;
  hideStatus?: boolean;
  onPress?: () => void;
}

export interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
}

export interface FilterButtonProps {
  filter: {
    id: string;
    title: string;
  };
  isActive: boolean;
  onPress: () => void;
}

// Form Types
export interface CreateGameForm {
  name: string;
  description: string;
  categories: string[];
  difficulty: string;
  image?: string;
}

// Utility Types
export type StatusColor = '#10b981' | '#f59e0b' | '#ef4444' | '#6b7280';

export interface Dimensions {
  width: number;
  height: number;
}

// Error Types
export interface AppError {
  message: string;
  code?: string;
  details?: any;
} 