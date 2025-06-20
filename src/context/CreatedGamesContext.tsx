import React, { createContext, useState, ReactNode } from 'react';

interface CreatedGamesContextType {
  createdGames: any[];
  addCreatedGame: (game: any) => void;
}

export const CreatedGamesContext = createContext<CreatedGamesContextType>({
  createdGames: [],
  addCreatedGame: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const CreatedGamesProvider: React.FC<ProviderProps> = ({ children }) => {
  const [createdGames, setCreatedGames] = useState<any[]>([]);

  const addCreatedGame = (game: any) => {
    setCreatedGames((prev) => [game, ...prev]);
  };

  return (
    <CreatedGamesContext.Provider value={{ createdGames, addCreatedGame }}>
      {children}
    </CreatedGamesContext.Provider>
  );
}; 