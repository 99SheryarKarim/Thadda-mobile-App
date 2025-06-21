import React, { createContext, useState, ReactNode } from 'react';

interface CreatedGamesContextType {
  createdGames: any[];
  addCreatedGame: (game: any) => void;
  deleteCreatedGame: (gameId: string) => void;
}

export const CreatedGamesContext = createContext<CreatedGamesContextType>({
  createdGames: [],
  addCreatedGame: () => {},
  deleteCreatedGame: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const CreatedGamesProvider: React.FC<ProviderProps> = ({ children }) => {
  const [createdGames, setCreatedGames] = useState<any[]>([]);

  const addCreatedGame = (game: any) => {
    setCreatedGames((prev) => [game, ...prev]);
  };

  const deleteCreatedGame = (gameId: string) => {
    setCreatedGames((prev) => prev.filter(game => game.id !== gameId));
  };

  return (
    <CreatedGamesContext.Provider value={{ createdGames, addCreatedGame, deleteCreatedGame }}>
      {children}
    </CreatedGamesContext.Provider>
  );
}; 