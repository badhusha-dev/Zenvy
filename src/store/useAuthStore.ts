import { create } from 'zustand';
import { User } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token }),

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await api.post('/auth/login', { email, password });
      const { token, userId, email: userEmail } = response.data;
      
      const user: User = { 
        id: String(userId), 
        email: userEmail, 
        name: userEmail.split('@')[0] // Temporary name mapping
      };
      
      await AsyncStorage.setItem('auth-token', token);
      await AsyncStorage.setItem('auth-user', JSON.stringify(user));
      
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (e) {
      console.error('Login failed:', e);
      set({ isLoading: false });
      throw e;
    }
  },

  signup: async (name: string, email: string, password: string) => {
    try {
      set({ isLoading: true });
      await api.post('/auth/signup', { name, email, password });
      // Automatically login after signup
      await get().login(email, password);
    } catch (e) {
      console.error('Signup failed:', e);
      set({ isLoading: false });
      throw e;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem('auth-token');
    await AsyncStorage.removeItem('auth-user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('auth-token');
      const userStr = await AsyncStorage.getItem('auth-user');
      if (token && userStr) {
        set({ token, user: JSON.parse(userStr), isAuthenticated: true });
      }
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
