import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCrown, FaMedal, FaGem } from 'react-icons/fa';

const Account_Type = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');

  const accountTypes = [
    {
      type: 'Brown',
      icon: <FaMedal className="text-4xl text-amber-700" />,
      color: 'amber',
      benefits: [
        'No minimum balance required',
        'Free debit card',
        'Mobile banking access',
        'Basic customer support',
      ],
      minimumDeposit: '₦50,000'
    },
    {
      type: 'Silver',
      icon: <FaGem className="text-4xl text-gray-400" />,
      color: 'gray',
      benefits: [
        'Priority customer service',
        'Higher transaction limits',
        'Free bank drafts',
        'Monthly account statements',
        'Discounted loan rates'
      ],
      minimumDeposit: '₦200,000'
    },
    {
      type: 'Gold',
      icon: <FaCrown className="text-4xl text-yellow-500" />,
      color: 'yellow',
      benefits: [
        'Dedicated relationship manager',
        'Unlimited transactions',
        'Premium credit card options',
        'Investment advisory services',
        'Travel insurance benefits',
        'Exclusive banking hours'
      ],
      minimumDeposit: '₦500,000'
    }
  ];

  const handleSelection = (type: string) => {
    setSelectedType(type);
    // Navigate to signup with account type
    navigate('/dashboard', { state: { accountType: type } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-plus">
      <h1 className="text-3xl font-bold text-center text-text mb-8">Choose Your Account Type</h1>
      <p className="text-center text-text3 mb-12">Select the account that best suits your needs</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {accountTypes.map((account) => (
          <div
            key={account.type}
            className={`
              bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow
              border-2 border-transparent hover:border-${account.color}-500
              cursor-pointer
            `}
            onClick={() => handleSelection(account.type)}
          >
            <div className="flex items-center justify-center mb-4">
              {account.icon}
              <h2 className="text-2xl font-bold ml-2">{account.type}</h2>
            </div>
            
            <div className="mb-4">
              <p className="text-center text-lg font-semibold text-text2">
                Minimum Deposit: {account.minimumDeposit}
              </p>
            </div>

            <ul className="space-y-2">
              {account.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-text3">
                  <span className="mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>

            <button
              className={`
                mt-6 w-full py-2 rounded-lg font-semibold cursor-pointer
                bg-gradient-to-r from-text to-[#00388C] text-white
                hover:opacity-90 transition-opacity
              `}
            >
              Select {account.type}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Account_Type;
