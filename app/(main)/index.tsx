import { useAuth } from '@/hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const [fullName, setFullName] = useState('');
  const setIsAuth = useAuth(state => state.setIsAuth);

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const storedFullName = await AsyncStorage.getItem('userFullName');
        if (storedFullName) {
          setFullName(storedFullName);
        }
      } catch (error) {
        console.error('Error fetching full name from local storage:', error);
      }
    };

    fetchFullName();
  }, []);

  const handleSignOut = async () => {
    try {
      // Clear all local storage data
      await AsyncStorage.clear();
      console.log('All local storage data cleared');
      // Navigate back to onboarding
      setIsAuth(false)
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
        {fullName ? (
          <Text style={styles.subtitle}>Hello, {fullName}!</Text>
        ) : (
          <Text style={styles.subtitle}>Welcome to the app!</Text>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
