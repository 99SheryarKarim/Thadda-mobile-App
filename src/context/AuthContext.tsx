import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  setToken: (token: string | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  setToken: async () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load token from storage on app start
  useEffect(() => {
    loadTokenFromStorage();
  }, []);

  const loadTokenFromStorage = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        setTokenState(storedToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading token from storage:', error);
    }
  };

  const setToken = async (newToken: string | null) => {
    try {
      if (newToken) {
        await AsyncStorage.setItem('userToken', newToken);
        setTokenState(newToken);
        setIsAuthenticated(true);
      } else {
        await AsyncStorage.removeItem('userToken');
        setTokenState(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error saving token to storage:', error);
    }
  };

  const login = async (newToken: string) => {
    await setToken(newToken);
  };

  const logout = async () => {
    await setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 