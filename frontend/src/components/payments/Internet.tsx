import React, { useState } from 'react';

const Internet = () => {
  const [formData, setFormData] = useState({
    company: '',
    meterNumber: ''
  });

  const InternetCompanies = [
    'Internet Corporation',
    'City Internet Board',
    'Metropolitan Internet',
    'Regional Internet Supply'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle bill check logic here
  };

  const isFormValid = () => {
    return formData.company && formData.meterNumber.trim().length > 0;
  };

  return (
    <div className='font-plus'>
      <h1 className="text-2xl text-center font-plus font-bold mt-8 text-text">Internet Bill Payment</h1>
      <div className='flex-col bg-[#FFFFFF] shadow-2xl flex font-plus space-y-6 p-8 mt-6 max-w-xl mx-auto rounded-2xl'>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <select
                id="company"
                className="w-full p-3 border border-text3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                required
              >
                <option value="">Choose company</option>
                {InternetCompanies.map((company) => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="meterNumber" className="block text-xm font-bold text-text3 mb-1">Type Internet code</label>
              <input
                type="text"
                id="meterNumber"
                className="w-full p-3 border border-text3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bill code"
                value={formData.meterNumber}
                onChange={(e) => setFormData({...formData, meterNumber: e.target.value})}
                required
              />
            </div>
          </div>

          <p className="text-sm  text-text3 mb-4">
            Please enter the correct bill code to <br /> check information.
          </p>

          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-3 rounded-lg transition-colors ${
              isFormValid() 
                ? 'bg-text text-white hover:bg-text2' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Check Bill
          </button>
        </form>
      </div>
    </div>
  );
};

export default Internet;
