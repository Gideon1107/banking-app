import { create } from 'zustand';
import axios from 'axios';
import { isAuthenticated } from './authenticatedStore';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000';

interface Profile {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  dob: string;
  nationality: string;
  address: string;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;

  fetchProfile: () => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updateAddress: (address: string) => Promise<void>;

  initiatePasswordChange: (currentPassword: string, newPassword: string) => Promise<void>;
  completePasswordUpdate: (verificationCode: string) => Promise<void>;

  clearMessages: () => void;
}



export const useProfileStore = create<ProfileState>((set) => {
  const fetchProfile = isAuthenticated(async () => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await axios.get('/profile');
      set({ profile: response.data.user, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.error || 'Failed to fetch profile',
        loading: false,
      });
    }
  });

  const updateEmail = isAuthenticated(async (email: string) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await axios.put('/profile/update-email', { email });
      set({
        profile: response.data.user,
        successMessage: response.data.message,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.error || 'Failed to update email',
        loading: false,
      });
    }
  });

  const updateAddress = isAuthenticated(async (address: string) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await axios.put('/profile/update-address', { address });
      set({
        profile: response.data.user,
        successMessage: response.data.message,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.error || 'Failed to update address',
        loading: false,
      });
    }
  });

  const initiatePasswordChange = isAuthenticated(async (currentPassword: string, newPassword: string) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await axios.post('/profile/change-password/initiate', {
        currentPassword,
        newPassword,
      });
      set({ successMessage: response.data.message, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.error || 'Failed to initiate password change',
        loading: false,
      });
    }
  });

  const completePasswordUpdate = isAuthenticated(async (verificationCode: string) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await axios.post('/profile/change-password/complete', {
        verificationCode,
      });
      set({
        profile: response.data.user,
        successMessage: response.data.message,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.error || 'Failed to complete password update',
        loading: false,
      });
    }
  });

  return {
    profile: null,
    loading: false,
    error: null,
    successMessage: null,

    fetchProfile,
    updateEmail,
    updateAddress,
    initiatePasswordChange,
    completePasswordUpdate,

    clearMessages: () =>
      set({
        error: null,
        successMessage: null,
      }),
  };
});
