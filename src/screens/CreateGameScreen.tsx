import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreateGameScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Game</Text>
      <Text style={styles.subtitle}>Start a new game here.</Text>
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

export default CreateGameScreen; 