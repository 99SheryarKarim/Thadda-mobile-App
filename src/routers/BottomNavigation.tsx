import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import Routes from "../utils/Routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeStack from "./HomeStack";
import CreateGameStack from "./CreateGameStack";
import GameHistoryScreen from "../screens/GameHistoryScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <SafeAreaProvider>
            <Tab.Navigator
                initialRouteName={Routes.Home}
                screenOptions={{
                    tabBarActiveTintColor: '#1565C0',
                    tabBarInactiveTintColor: '#999999',
                    tabBarStyle: { 
                        backgroundColor: '#FFFFFF',
                        borderTopColor: '#E0E0E0',
                        paddingBottom: 5,
                        paddingTop: 5,
                        height: 60,
                    },
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name={Routes.Home}
                    component={HomeStack}
                    options={{
                        tabBarLabel: 'الرئيسية',
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons 
                                name={focused ? 'home' : 'home-outline'} 
                                size={size} 
                                color={color} 
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name={Routes.CreateGame}
                    component={CreateGameStack}
                    options={{
                        tabBarLabel: 'إنشاء لعبة',
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons 
                                name={focused ? 'add-circle' : 'add-circle-outline'} 
                                size={size} 
                                color={color} 
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name={Routes.GameLog}
                    component={GameHistoryScreen}
                    options={{
                        tabBarLabel: 'سجل الألعاب',
                        tabBarIcon: ({ focused, color, size }) => (
                            <Ionicons 
                                name={focused ? 'list' : 'list-outline'} 
                                size={size} 
                                color={color} 
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </SafeAreaProvider>
    );
} 