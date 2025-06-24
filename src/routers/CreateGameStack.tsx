import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes, { NavigationParams } from '../utils/Routes';
import CreatedGamesDashboard from '../screens/CreatedGamesDashboard';
import GameCreationScreen from '../screens/GameCreationScreen';
import GameShowScreen from '../screens/GameShowScreen';
import APITestScreen from '../screens/APITestScreen';

const Stack = createNativeStackNavigator<NavigationParams>();

const CreateGameStack = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.CreatedGamesDashboard} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.CreatedGamesDashboard} component={CreatedGamesDashboard} />
      <Stack.Screen name={Routes.GameCreationScreen} component={GameCreationScreen} />
      <Stack.Screen name={Routes.GameShowScreen} component={GameShowScreen} />
      <Stack.Screen name={Routes.APITestScreen} component={APITestScreen} />
    </Stack.Navigator>
  );
};

export default CreateGameStack; 