import React, { createContext, useState, ReactNode } from 'react';

interface CreatedGamesContextType {
  createdGames: any[];
  addCreatedGame: (game: any) => void;
  deleteCreatedGame: (gameId: string) => void;
  updateGamesFromAPI: (games: any[]) => void;
}

export const CreatedGamesContext = createContext<CreatedGamesContextType>({
  createdGames: [],
  addCreatedGame: () => {},
  deleteCreatedGame: () => {},
  updateGamesFromAPI: () => {},
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
    console.log('Context: Deleting game with ID:', gameId, 'Type:', typeof gameId);
    setCreatedGames((prev) => {
      console.log('Context: Previous games count:', prev.length);
      const filtered = prev.filter(game => String(game.id) !== String(gameId));
      console.log('Context: Filtered games count:', filtered.length);
      return filtered;
    });
  };

  const updateGamesFromAPI = (games: any[]) => {
    setCreatedGames(games);
  };

  return (
    <CreatedGamesContext.Provider value={{ createdGames, addCreatedGame, deleteCreatedGame, updateGamesFromAPI }}>
      {children}
    </CreatedGamesContext.Provider>
  );
}; 