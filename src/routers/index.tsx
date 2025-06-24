import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import Routes, { NavigationParams } from "../utils/Routes";
import TabNavigator from "./BottomNavigation";
import FlashMessage from 'react-native-flash-message';

enableScreens();

const Stack = createNativeStackNavigator<NavigationParams>();

function RootNavigation() {
  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1565C0',
      background: '#f8fafc',
      card: '#ffffff',
      text: '#1f2937',
      border: '#e5e7eb',
      notification: '#ef4444',
    },
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content"/>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          initialRouteName={Routes.MainScreen}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name={Routes.MainScreen}
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default RootNavigation; 