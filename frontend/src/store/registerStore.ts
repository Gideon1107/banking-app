import { create } from 'zustand';
import axios from 'axios';

// sending coockies with axios requests
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000';


// Define interfaces for User and Account
interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  isactive: boolean;
 
}

interface Account {
  account_number: string;
  account_type: string;
  user_id: string;
  debit_number: string;
  cvv: string;
  card_pin: string;
}

interface AuthState {
  user: User | null;
  account: Account | null;
  loading: boolean;
  error: string | null;
  registrationSuccess: boolean;
  activationSuccess: boolean;

  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dob: string;
    nationality: string;
    address: string;
  }) => Promise<void>;

  activateAccount: (token: string) => Promise<void>;

  createAccountInfo: (data: { account_type: string; user_id: string }) => Promise<void>;

  clearErrors: () => void;
  clearState: () => void;
}


//auth slice 
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  account: null,
  loading: false,
  error: null,
  registrationSuccess: false,
  activationSuccess: false,

  register: async (data) => {
    set({ loading: true, error: null, registrationSuccess: false });
    try {
        console.log("Registering user with data:", data);
      const response = await axios.post('http://localhost:4000/register', data);
      set({ registrationSuccess: true, loading: false });
        console.log("Registration successful:", response.data);

    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Registration failed',
        loading: false,
      });
    }
  },

  activateAccount: async (token) => {
    set({ loading: true, error: null, activationSuccess: false });
    try {
      // Activation endpoint returns HTML, but we can call it to verify
      await axios.get(`http://localhost:4000/register/activate/${token}`);
      set({ activationSuccess: true, loading: false });
    } catch (error: any) {
      set({
        error: 'Activation failed or token expired',
        loading: false,
      });
    }
  },

  createAccountInfo: async ({ account_type, user_id }) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:4000/register/createAccountInfo', {
        account_type,
        user_id,
      });
  set({ account: response.data.account, loading: false });
  console.log("Account created successfully:", response.data);
    return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Account creation failed',
        loading: false,
      });
    }
  },

  clearErrors: () => set({ error: null }),

  clearState: () => set({
    user: null,
    account: null,
    loading: false,
    error: null,
    registrationSuccess: false,
    activationSuccess: false,
  }),
}));
