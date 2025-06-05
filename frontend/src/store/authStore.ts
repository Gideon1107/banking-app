
import { create } from 'zustand';
import axios from 'axios';

// sending coockies with axios requests
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000';

// interfaces for User and AuthState
interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  // Attempt to load an existing session from the backend
  fetchSession: () => Promise<void>;

  login: (acctNumber: number, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // 1) fetch session from the backend
  fetchSession: async () => {
    set({ loading: true, error: null });
    try {
      // return the current session user
      const response = await axios.get('/login/session');
      const user = response.data.user as User;
      set({
        user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },

// 2) Log in via backend
  login: async (acctNumber, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/login', { acctNumber, password });
      const user = response.data.user as User;
      set({
        user,
        isAuthenticated: user?.isActive ?? false,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Login failed',
        loading: false,
      });
    }
  },

  // 3) Log out via backend
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await axios.post('/login/logout');
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
