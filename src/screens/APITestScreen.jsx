import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { apiService } from '../services/api';

const APITestScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addTestResult = (api, status, data, error) => {
    setTestResults(prev => [...prev, {
      api,
      status,
      data,
      error,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const testLogin = async () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    setLoading(true);
    try {
      console.log('Testing login...');
      const result = await apiService.login(email, password);
      console.log('Login result:', result);
      addTestResult('Login', 'SUCCESS', result, null);
      
      // Store token if available
      if (result.token) {
        // TODO: Store token in AsyncStorage
        console.log('Token received:', result.token);
      }
    } catch (error) {
      console.error('Login error:', error);
      addTestResult('Login', 'ERROR', null, error.message);
    } finally {
      setLoading(false);
    }
  };

  const testStatistics = async () => {
    setLoading(true);
    try {
      console.log('Testing statistics API...');
      const result = await apiService.getGamesStatistics();
      console.log('Statistics result:', result);
      addTestResult('Statistics', 'SUCCESS', result, null);
    } catch (error) {
      console.error('Statistics error:', error);
      addTestResult('Statistics', 'ERROR', null, error.message);
    } finally {
      setLoading(false);
    }
  };

  const testUserGames = async () => {
    setLoading(true);
    try {
      console.log('Testing user games API...');
      const result = await apiService.getUserGames();
      console.log('User games result:', result);
      addTestResult('User Games', 'SUCCESS', result, null);
    } catch (error) {
      console.error('User games error:', error);
      addTestResult('User Games', 'ERROR', null, error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>API Test Screen</Text>
      
      {/* Login Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Login Test</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={testLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Testing...' : 'Test Login'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* API Test Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>API Tests</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={testStatistics}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Testing...' : 'Test Statistics'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={testUserGames}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Testing...' : 'Test User Games'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={clearResults}
        >
          <Text style={styles.buttonText}>Clear Results</Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Results</Text>
        <ScrollView style={styles.resultsContainer}>
          {testResults.map((result, index) => (
            <View key={index} style={styles.resultItem}>
              <Text style={styles.resultTitle}>
                {result.api} - {result.status} ({result.timestamp})
              </Text>
              {result.error && (
                <Text style={styles.errorText}>Error: {result.error}</Text>
              )}
              {result.data && (
                <Text style={styles.dataText}>
                  Data: {JSON.stringify(result.data, null, 2)}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#374151',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  resultsContainer: {
    maxHeight: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
  resultItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 10,
  },
  resultTitle: {
    fontWeight: '600',
    marginBottom: 5,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
  },
  dataText: {
    color: '#10b981',
    fontSize: 12,
  },
});

export default APITestScreen; 