import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardStore } from '../../store/cardStore';
import { authStore } from '../../store/authStore';

const ChangePin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPin: '',
    newPin: '',
    confirmPin: ''
  });
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const user = authStore((state) => state.user);
  const { changePin, loading } = useCardStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
console.log('user:', user);
const handleSubmit = async (e: React.FormEvent) => {
      console.log(' account:', user);
  e.preventDefault();
  setError('');

  if (!user?.account?.account_number) {
    return setError('Account number is missing.');
  }

  if (formData.newPin !== formData.confirmPin) {
    return setError('New PIN and Confirm PIN do not match.');
  }

  if (formData.newPin.length !== 4) {
    return setError('PIN must be exactly 4 digits.');
  }

  try {
    console.log('Changing PIN for account:', user.account.account_number);
    console.log('Current PIN:', formData.currentPin);
    console.log('New PIN:', formData.newPin);
    await changePin({
      account_number: user!.account.account_number,
      old_pin: Number(formData.currentPin),
      new_pin: Number(formData.newPin),
    });
    console.log('PIN change successful');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/dashboard/cards');
    }, 2000);
  } catch {
    setError('Failed to change PIN. Please try again.');
  }
};
if (!user || !user.account) {
  return (
    <div className="text-center mt-10 text-red-500 font-medium">
      Account information not available. Please log in again.
    </div>
  );
}


  return (
    <div className="font-plus">
      <h1 className="text-2xl font-bold text-text text-center mb-8">Change PIN</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        {['currentPin', 'newPin', 'confirmPin'].map((field) => (
          <div key={field} className="space-y-2">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
              {field === 'currentPin' ? 'Current PIN' : field === 'newPin' ? 'New PIN' : 'Confirm New PIN'}
            </label>
            <input
              id={field}
              type="password"
              value={formData[field as keyof typeof formData]}
              onChange={handleInputChange}
              placeholder={`Enter ${field.replace(/Pin/, 'PIN')}`}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={4}
              pattern="\d*"
              inputMode="numeric"
              required
            />
          </div>
        ))}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-text text-white py-3 rounded-lg hover:bg-text2 transition-colors"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>

        <p className="text-base text-text3 text-center">
          Note: This PIN will be used for future transactions.
        </p>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold text-green-500 text-center">
              PIN changed successfully!
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePin;
