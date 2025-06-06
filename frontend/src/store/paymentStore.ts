import axios from 'axios';
import { create } from 'zustand';
import { isAuthenticated } from './authenticatedStore';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000';


interface Transaction {
  id: string;
  account_number: number;
  transaction_type: string;
  amount: string;
  transaction_date: string;
  recipient_account?: string;
  reference?: string;
}

interface PaymentState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;

  deposit: (data: any) => Promise<void>;
  withdraw: (data: any) => Promise<void>;
  transfer: (data: any) => Promise<void>;
  fetchTransactionHistory: (acctNum: number) => Promise<void>;

  clearMessages: () => void;
}

export const paymentStore = create<PaymentState>((set) => ({
  transactions: [],
  loading: false,
  error: null,
  successMessage: null,

  deposit: isAuthenticated(async (data: any) => {
    set({ loading: true });
    try {
      const res = await axios.post('/payment/deposit', data);
      set({ successMessage: res.data.message });
    } catch (err: any) {
      set({ error: err.response?.data?.error || 'Deposit failed' });
    } finally {
      set({ loading: false });
    }
  }),

  withdraw: isAuthenticated(async (data: any) => {
    set({ loading: true });
    try {
      const res = await axios.post('/payment/withdraw', data);
      set({ successMessage: res.data.message });
    } catch (err: any) {
      set({ error: err.response?.data?.error || 'Withdrawal failed' });
    } finally {
      set({ loading: false });
    }
  }),

  transfer: isAuthenticated(async (data: any) => {
    set({ loading: true });
    try {
      const res = await axios.post('/payment/transfer', data);
      set({ successMessage: res.data.message });
    } catch (err: any) {
      set({ error: err.response?.data?.error || 'Transfer failed' });
    } finally {
      set({ loading: false });
    }
  }),

  fetchTransactionHistory: async (acctNum: number) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/payment/history/${acctNum}`);
      set({ transactions: res.data.transactions });
    } catch (err: any) {
      set({ error: err.response?.data?.error || 'Failed to fetch transaction history' });
    } finally {
      set({ loading: false });
    }
  },

  clearMessages: () => {
    set({ error: null, successMessage: null });
  },
}));