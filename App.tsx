import React from 'react';
import RootNavigation from './src/routers';
import { CreatedGamesProvider } from './src/context/CreatedGamesContext';
import FlashMessage from 'react-native-flash-message';

const App: React.FC = () => {
  return (
    <CreatedGamesProvider>
      <RootNavigation />
      <FlashMessage position="top" />
    </CreatedGamesProvider>
  );
};

export default App;
