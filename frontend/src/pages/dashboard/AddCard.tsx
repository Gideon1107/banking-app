import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCard = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    password: '',
    cardType: 'visa'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/dashboard/cards');
    }, 2000);
  };

  return (
    <div className="font-plus">
      <h1 className="text-2xl font-bold text-text text-center mb-8">Add Card</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Card Holder Name</label>
            <input
              id="cardName"
              type="text"
              placeholder="John Doe"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.cardName}
              onChange={(e) => setFormData({...formData, cardName: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.cardNumber}
              onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
              maxLength={16}
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                id="expiryDate"
                type="date"
                placeholder="MM/YY"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.expiryDate}
                onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                maxLength={5}
                required
              />
            </div>
            <div className="w-1/2 space-y-2">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                id="cvv"
                type="password"
                placeholder="123"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.cvv}
                onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                maxLength={3}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Card Type</label>
            <div className="flex gap-4 justify-center">
              {['visa', 'mastercard', 'verve'].map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="cardType"
                    value={type}
                    checked={formData.cardType === type}
                    onChange={(e) => setFormData({...formData, cardType: e.target.value})}
                    className="form-radio text-blue-500"
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-text text-white py-3 rounded-lg hover:bg-text2 transition-colors"
        >
          Add Card
        </button>
      </form>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-500">Card Added Successfully!</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCard;
