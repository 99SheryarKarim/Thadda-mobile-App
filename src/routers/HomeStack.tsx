import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes, { NavigationParams } from '../utils/Routes';
import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';

const Stack = createNativeStackNavigator<NavigationParams>();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.HomeMain} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.HomeMain} component={HomeScreen} />
      <Stack.Screen name={Routes.Play} component={PlayScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack; 