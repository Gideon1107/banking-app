import { create } from 'zustand';
import axios from 'axios';
import { isAuthenticated } from './authenticatedStore';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000';

interface Beneficiary {
  account_number: number;
  beneficiary_account: string;
  beneficiary_name: string;
}

interface BeneficiaryStore {
  beneficiaries: Beneficiary[];
  loading: boolean;
  error: string | null;
  success: string | null;

  saveBeneficiary: (form: {
    account_number: number;
    beneficiary_account: string;
    beneficiary_name: string;
  }) => Promise<void>;

  viewBeneficiaries: (account_number: number) => Promise<void>;

  clearStatus: () => void;
}



export const useBeneficiaryStore = create<BeneficiaryStore>((set) => {
  const saveBeneficiary = isAuthenticated(async ({ account_number, beneficiary_account, beneficiary_name }) => {
    try {
      set({ loading: true, error: null, success: null });

      const res = await axios.post('/beneficiary', {
        account_number,
        beneficiary_account,
        beneficiary_name,
      });

      set({ success: res.data.message });
    } catch (err: any) {
      set({ error: err.response?.data?.error || 'Failed to save beneficiary.' });
    } finally {
      set({ loading: false });
    }
  });

  const viewBeneficiaries = isAuthenticated(async (account_number) => {
    try {
      set({ loading: true, error: null, beneficiaries: [] });

      const res = await axios.get(`/beneficiary/:${account_number}`);
      const result = res.data.beneficiary;

      const list = Array.isArray(result) ? result : [result];
      set({ beneficiaries: list });
    } catch (err: any) {
      set({ error: err.response?.data?.error || 'Failed to fetch beneficiaries.' });
    } finally {
      set({ loading: false });
    }
  });

  return {
    beneficiaries: [],
    loading: false,
    error: null,
    success: null,
    saveBeneficiary,
    viewBeneficiaries,
    clearStatus: () => set({ error: null, success: null }),
  };
});
