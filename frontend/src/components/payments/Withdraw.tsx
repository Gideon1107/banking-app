import React, { useState } from 'react';
import illustration from "../../assets/illustration.png";

function Withdraw() {
  const [formData, setFormData] = useState({
    accountType: '',
    phoneNumber: '',
    amount: ''
  });

  const accountTypes = ['Savings', 'Current', 'Credit'];
  const presetAmounts = ['10', '50', '100', '150', '200'];

  const handleAmountSelect = (amount: string) => {
    setFormData(prev => ({ ...prev, amount }));
  };

  const isFormValid = () => {
    return formData.accountType && 
           formData.phoneNumber.length >= 10 && 
           formData.amount;
  };

  return (
    <div className='font-plus'>
      <h1 className="text-2xl text-center font-plus font-bold mt-8 text-text">Withdraw</h1>
      <div className='flex-col flex font-plus space-y-6 p-8 mt-6 max-w-xl mx-auto rounded-2xl'>
        <div className="flex justify-center items-center">
          <img 
            src={illustration} 
            alt="illustration" 
            className='w-full max-w-[280px] sm:max-w-[320px] h-auto' 
          />
        </div>
        <form className="space-y-6">
          <div className="space-y-6">
            <div>
              <select
                className="w-full p-3 border border-[#CBCBCB] rounded-xl  focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.accountType}
                onChange={(e) => setFormData(prev => ({ ...prev, accountType: e.target.value }))}
                required
              >
                <option value="">Choose account type</option>
                {accountTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="tel"
                className="w-full p-3 border border-[#CBCBCB] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text3 mb-2">Choose Amount ($)</label>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {presetAmounts.map(amount => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-4 rounded-xl border-1 border-white ${
                      formData.amount === amount 
                        ? 'bg-text text-white' 
                        : 'bg-[#ffffff] text-[#989898] shadow-lg'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
                <input
                  type="number"
                  placeholder="Other"
                  className="p-2 rounded-lg border border-text3"
                  onChange={(e) => handleAmountSelect(e.target.value)}
                />
              </div>
            </div>
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
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default Withdraw;
