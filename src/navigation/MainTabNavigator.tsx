import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Modal, Text, StyleSheet, Alert } from 'react-native';
// import { useTheme } from '../context/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateGameScreen from '../screens/CreateGameScreen';
import GameHistoryScreen from '../screens/GameHistoryScreen';
import CreatedGamesDashboard from '../screens/CreatedGamesDashboard';
import GameCreationScreen from '../screens/GameCreationScreen';
import GameShowScreen from '../screens/GameShowScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const CreateGameStack = createNativeStackNavigator();

// Placeholder: Replace with real logic to get completed games count
const getCompletedGamesCount = () => 0; // TODO: Replace with real state/storage

const HamburgerMenu: React.FC<any> = ({ visible, onClose, onNavigate }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableOpacity style={styles.menuOverlay} onPress={onClose} activeOpacity={1}>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => { onNavigate('BuyGame'); onClose(); }}>
          <Text style={styles.menuText}>Buy Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => { onNavigate('Profile'); onClose(); }}>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => { onNavigate('Logout'); onClose(); }}>
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Modal>
);

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Play" component={PlayScreen} />
    </HomeStack.Navigator>
  );
}

function CreateGameStackScreen() {
  return (
    <CreateGameStack.Navigator screenOptions={{ headerShown: false }}>
      <CreateGameStack.Screen name="CreatedGamesDashboard" component={CreatedGamesDashboard} />
      <CreateGameStack.Screen name="GameCreationScreen" component={GameCreationScreen} />
      <CreateGameStack.Screen name="GameShowScreen" component={GameShowScreen} />
    </CreateGameStack.Navigator>
  );
}

const MainTabNavigator = () => {
  // const { isDark } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const handleMenuNavigate = (option: 'BuyGame' | 'Profile' | 'Logout') => {
    // Implement navigation or actions for menu options here
    if (option === 'Profile') {
      // Navigate to Profile tab
    }
    if (option === 'Logout') {
      // Implement logout logic
    }
    if (option === 'BuyGame') {
      // Implement buy game logic
    }
  };

  return (
    <>
      <HamburgerMenu visible={menuVisible} onClose={() => setMenuVisible(false)} onNavigate={handleMenuNavigate} />
      <Tab.Navigator
        // Configure the appearance and behavior of the tab bar
        screenOptions={({ route }) => ({
          // Customize the tab bar icons based on the route and focus state
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
              case 'Create Game':
                iconName = focused ? 'add-circle' : 'add-circle-outline';
                break;
              case 'Game Log':
                iconName = focused ? 'list' : 'list-outline';
                break;
              default:
                iconName = 'help-circle';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // Tab bar styling
          tabBarActiveTintColor: '#1565C0',    // Color for active tab
          tabBarInactiveTintColor: '#999999',     // Color for inactive tabs
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E0E0E0',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
        />
        <Tab.Screen
          name="Create Game"
          component={CreateGameStackScreen}
        />
        <Tab.Screen
          name="Game Log"
          component={GameHistoryScreen}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuContainer: {
    marginTop: 60,
    marginLeft: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 18,
    color: '#222',
  },
});

export default MainTabNavigator; 