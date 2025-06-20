import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { CreatedGamesProvider } from './src/context/CreatedGamesContext';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <CreatedGamesProvider>
      <RootNavigator />
      <FlashMessage position="top" />
    </CreatedGamesProvider>
  );
}
