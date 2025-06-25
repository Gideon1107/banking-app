import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Loan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // accountNumber: '',
    loanAmount: '',
    loanTenure: '',
    purpose: ''
  });

  const tenureOptions = [
    '3 months',
    '6 months',
    '12 months',
    '24 months',
    '36 months'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/loan/details', { state: { loanData: formData } });
  };

  const isFormValid = () => {
    return formData.loanAmount && 
           formData.loanTenure && 
           formData.purpose.trim().length > 0;
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-plus font-bold text-text">Loan Application</h1>
      <div className='flex-col flex font-plus space-y-6  p-8 mt-6 max-w-2xl mx-auto rounded-2xl'>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">  
            <div>
              <label htmlFor="loanAmount" className="block text-lg font-bold text-text3 mb-1">Enter loan amount</label>
              <input
                type="number"
                id="loanAmount"
                className="w-full p-3 border-1 border-text3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter loan amount"
                value={formData.loanAmount}
                onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                required
              />
            </div>

            <div>
              <label htmlFor="loanTenure" className="block text-lg font-bold text-text3 mb-1">Loan tenure/term</label>
              <select
                id="loanTenure"
                className="w-full p-3 border-1 border-text3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.loanTenure}
                onChange={(e) => setFormData({...formData, loanTenure: e.target.value})}
                required
              >
                <option value="">Select loan tenure</option>
                {tenureOptions.map((tenure) => (
                  <option key={tenure} value={tenure}>{tenure}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="purpose" className="block text-lg font-bold text-text3 mb-1">Purpose </label>
              <textarea
                id="purpose"
                className="w-full p-3 border-1 border-text3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the purpose of your loan"
                value={formData.purpose}
                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                rows={3}
                required
              />
            </div>

            <p className="text-sm text-center text-text3">
              Please note that the account type determine how amount you have access to and the loan repayment method.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-3 rounded-lg transition-colors ${
              isFormValid() 
                ? 'bg-text text-white hover:bg-text2' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Loan;
