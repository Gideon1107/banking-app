// stores/authStore.ts
import { create } from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000';

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

  fetchSession: () => Promise<void>;
  login: (acctNumber: number, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const authStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  fetchSession: async () => {
    set({ loading: true });
    try {
      const res = await axios.get('/login/session');
      const user = res.data.user;
      set({ user, isAuthenticated: true, loading: false });
    } catch {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },

  login: async (acctNumber, password) => {
    set({ loading: true });
    try {
      const res = await axios.post('/login', { acctNumber, password });
      const user = res.data.user;
      set({ user, isAuthenticated: user?.isActive ?? false, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Login failed', loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.post('/login/logout');
      set({ user: null, isAuthenticated: false, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Logout failed', loading: false });
    }
  },
}));
