import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface AuthState {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  checkAuth: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isAuth: false,
  setIsAuth: (value) => set({ isAuth: value }),
  checkAuth: async () => {
    try {
      const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
      set({ isAuth: isAuthenticated === 'true' });
    } catch (error) {
      console.error('Error checking authentication:', error);
      set({ isAuth: false });
    }
  },
  signOut: async () => {
    try {
      await AsyncStorage.clear();
      set({ isAuth: false });
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  },
}));
