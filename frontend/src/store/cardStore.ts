import { create } from 'zustand';
import axios from 'axios';
import  { isAuthenticated } from './authenticatedStore';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000';

interface CardDetails {
  debit_number: string;
  cvv: string;
  card_issued_date: string;
  card_expiry_date: string;
}

interface CardStoreState {
  balance: number | null;
  cardDetails: CardDetails | null;
  loading: boolean;
  error: string | null;
  success: string | null;

  cardDeposit: (form: {
    debit_number: string;
    cvv: string;
    card_issued_date: string;
    card_expiry_date: string;
    card_pin: string;
    amount: string;
  }) => Promise<void>;

  cardWithdraw: (form: {
    debit_number: string;
    cvv: string;
    card_issued_date: string;
    card_expiry_date: string;
    card_pin: string;
    amount: string;
  }) => Promise<void>;

  viewCardDetails: (account_number: string) => Promise<void>;

  changePin: (form: {
    account_number: string;
    old_pin: string;
    new_pin: string;
  }) => Promise<void>;

  clearStatus: () => void;
}



export const useCardStore = create<CardStoreState>((set) => {
  const cardDeposit = isAuthenticated(async (form) => {
    try {
      set({ loading: true, error: null, success: null });
      const res = await axios.post('/card/deposit', form);
      set({ success: res.data.message, balance: res.data.new_balance });
    } catch (err: any) {
      set({ error: err.response?.data?.error || 'Deposit failed.' });
    } finally {
      set({ loading: false });
    }
  });

  const cardWithdraw = isAuthenticated(async (form) => {
    try {
      set({ loading: true, error: null, success: null });
      const res = await axios.post('/card/withdraw', form);
      set({ success: res.data.message, balance: res.data.new_balance });
    } catch (err: any) {
      set({ error: err.response?.data?.error || 'Withdrawal failed.' });
    } finally {
      set({ loading: false });
    }
  });

  const viewCardDetails = isAuthenticated(async (account_number) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(`/card/:${account_number}`);
      set({ cardDetails: res.data });
    } catch (err: any) {
      set({ error: err.response?.data?.error || 'Failed to fetch card details.' });
    } finally {
      set({ loading: false });
    }
  });

  const changePin = isAuthenticated(async (form) => {
    try {
      set({ loading: true, error: null, success: null });
      const res = await axios.post('/card/change-pin', form);
      set({ success: res.data.message });
    } catch (err: any) {
      set({ error: err.response?.data?.error || 'Failed to change PIN.' });
    } finally {
      set({ loading: false });
    }
  });

  return {
    balance: null,
    cardDetails: null,
    loading: false,
    error: null,
    success: null,

    cardDeposit,
    cardWithdraw,
    viewCardDetails,
    changePin,

    clearStatus: () => set({ error: null, success: null }),
  };
});
