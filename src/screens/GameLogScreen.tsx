import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameLogScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Log</Text>
      <Text style={styles.subtitle}>View your game history here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
  },
});

export default GameLogScreen; 