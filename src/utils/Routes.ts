/**
 * Enum representing the available routes in the application.
 */
export enum Routes {
  // Auth Routes
  Login = 'Login',
  Register = 'Register',
  
  // Main Routes
  MainScreen = 'MainScreen',
  
  // Tab Routes
  Home = 'Home',
  CreateGame = 'CreateGame',
  GameLog = 'GameLog',
  
  // Home Stack Routes
  HomeMain = 'HomeMain',
  Play = 'Play',
  
  // Create Game Stack Routes
  CreatedGamesDashboard = 'CreatedGamesDashboard',
  GameCreationScreen = 'GameCreationScreen',
  GameShowScreen = 'GameShowScreen',
  APITestScreen = 'APITestScreen',
  
  // Game Categories
  GameCategories = 'GameCategories',
}

/**
 * Represents the parameter types for the root stack navigation.
 */
export type RootStackParams = {
  [Routes.Login]: undefined;
  [Routes.Register]: undefined;
  [Routes.MainScreen]: undefined;
  [Routes.Home]: undefined;
  [Routes.CreateGame]: undefined;
  [Routes.GameLog]: undefined;
  [Routes.HomeMain]: undefined;
  [Routes.Play]: undefined;
  [Routes.CreatedGamesDashboard]: undefined;
  [Routes.GameCreationScreen]: undefined;
  [Routes.GameShowScreen]: { gameId: string };
  [Routes.APITestScreen]: undefined;
  [Routes.GameCategories]: undefined;
};

/**
 * Represents the navigation parameters for the root stack.
 */
export type NavigationParams = RootStackParams;

export default Routes; 