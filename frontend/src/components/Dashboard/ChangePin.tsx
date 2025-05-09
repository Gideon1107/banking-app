import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePin = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    currentPin: '',
    newPin: '',
    confirmPin: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.newPin !== formData.confirmPin) {
      setError('New PIN and Confirm PIN do not match');
      return;
    }

    if (formData.newPin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/dashboard/cards');
    }, 2000);
  };

  return (
    <div className="font-plus">
      <h1 className="text-2xl font-bold text-text text-center mb-8">Change Pin</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="currentPin" className="block text-sm font-medium text-gray-700">Recent Pin</label>
            <input
              id="currentPin"
              type="password"
              placeholder="Enter current PIN"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.currentPin}
              onChange={(e) => setFormData({...formData, currentPin: e.target.value})}
              maxLength={4}
              pattern="[0-9]*"
              inputMode="numeric"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newPin" className="block text-sm font-medium text-gray-700">Create New Pin</label>
            <input
              id="newPin"
              type="password"
              placeholder="Enter new PIN"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.newPin}
              onChange={(e) => setFormData({...formData, newPin: e.target.value})}
              maxLength={4}
              pattern="[0-9]*"
              inputMode="numeric"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPin" className="block text-sm font-medium text-gray-700">Confirm New Pin</label>
            <input
              id="confirmPin"
              type="password"
              placeholder="Confirm new PIN"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.confirmPin}
              onChange={(e) => setFormData({...formData, confirmPin: e.target.value})}
              maxLength={4}
              pattern="[0-9]*"
              inputMode="numeric"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-text text-white py-3 rounded-lg hover:bg-text2 transition-colors"
        >
          Save Changes
        </button>
        <div className="space-y-2">
          <p className='text-base text-text3 text-center'>Notice that the created pin is going to be used in making Transactions</p>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-500">Pin Changed Successfully!</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePin;
