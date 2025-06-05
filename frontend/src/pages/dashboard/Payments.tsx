import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Payments = () => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    bank: '',
  });

  const banks = [
    'Access Bank',
    'GT Bank',
    'First Bank',
    'UBA',
    'Zenith Bank',
    'Wema Bank',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle transfer logic here
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-plus font-bold text-text">Transfer to Bank</h1>
      <div className='flex-col flex font-plus space-y-6 bg-bal p-8 mt-6 max-w-2xl mx-auto rounded-2xl'>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              id="accountNumber"
              className="w-full p-3 rounded-xl  border-b-1 border-[#ECECEC] text-[#8792AE] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 10 digits account number"
              maxLength={10}
              value={formData.accountNumber}
              onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <select
              id="bank"
              className="w-full p-3 rounded-xl border-b-1 border-[#ECECEC] text-[#8792AE] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.bank}
              onChange={(e) => setFormData({...formData, bank: e.target.value})}
              required
            >
              <option value="">Select a bank</option>
              {banks.map((bank, index) => (
                <option key={index} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>
          <Link to='/dashboard/payments/details'>
            <button
              type="submit"
              className="w-full bg-text text-white py-3 rounded-lg hover:bg-text2 transition-colors mt-6"
            >
              Next
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Payments;
