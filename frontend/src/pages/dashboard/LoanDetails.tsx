import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const LoanDetails = () => {
  const { state } = useLocation();
  const loanData = state?.loanData;

  const [documents, setDocuments] = useState({
    bankStatement: null,
    govtId: null,
    addressProof: null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocuments(prev => ({
        ...prev,
        [type]: file
      }));
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-plus font-bold text-text">Document Verification</h1>
      <div className='flex-col flex font-plus space-y-6 p-8 mt-6 max-w-2xl mx-auto rounded-2xl'>
        <form className="space-y-6">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-text3 mb-2">Bank Statement</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'bankStatement')}
                  className="w-full p-3 border-1 border-text3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-text3 mt-1">Upload last 3 months bank statement (PDF or DOC format)</p>
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-text3 mb-2">Government ID</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange(e, 'govtId')}
                  className="w-full p-3 border-1 border-text3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-text3 mt-1">Upload valid government ID (National ID, Passport, Driver's License)</p>
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-text3 mb-2">Address Verification</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange(e, 'addressProof')}
                  className="w-full p-3 border-1 border-text3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-text3 mt-1">Upload utility bill or lease agreement as proof of address</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!documents.bankStatement || !documents.govtId || !documents.addressProof}
            className={`w-full py-3 rounded-lg transition-colors ${
              documents.bankStatement && documents.govtId && documents.addressProof
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

export default LoanDetails;
