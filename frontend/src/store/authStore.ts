import { create } from 'zustand';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`http://localhost:4000/login`, { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Login failed',
        loading: false,
      });
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await axios.post('http://localhost:4000/login/logout');
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Logout failed',
        loading: false,
      });
    }
  },
}));
