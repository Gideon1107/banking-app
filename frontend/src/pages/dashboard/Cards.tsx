import React, { useState } from "react";
import Frame from "../../assets/Frame.png";
import { HiArrowRight, HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";
import { User } from "../../type/user";
import { authStore } from "../../store/authStore";

const maskCardNumber = (cardNum: string) =>
  cardNum.replace(/(\d{4})-(\d{4})-(\d{4})-(\d{4})/, "****-****-****-$4");

const Cards: React.FC<User> = ({ account }) => {
  const user = authStore((state) => state.user);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);

  const toggleCardDetails = () => {
    setShowCardDetails(!showCardDetails);
  };

  const toggleSensitiveInfo = () => {
    setShowSensitiveInfo(!showSensitiveInfo);
  };

  const formatCardNumber = (cardNum: string) => {
    return cardNum.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div className="font-plus">
      <h1 className="text-2xl font-bold text-text text-center mb-4">Card Details</h1>
      
      {/* Interactive Card */}
      <div className="w-full flex justify-center items-center mt-2 mb-6">
        <div 
          className="relative cursor-pointer transform transition-all duration-300 hover:scale-105"
          onClick={toggleCardDetails}
        >
          {/* Card Background */}
          <div className="relative w-80 h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
            {/* Card Pattern/Texture */}
            <div className="absolute inset-0 opacity-10">
              <img src={Frame} alt="Card Design" className="w-full h-full object-cover" />
            </div>
            
            {/* Card Content */}
            <div className="relative z-10 p-6 text-white h-full flex flex-col justify-between">
              {/* Top Section - Bank Name */}
              <div className="flex justify-between items-start">
                <div className="text-lg font-bold">PrimeVault</div>
                <div className="text-sm">
                  {user?.account?.account_type?.toUpperCase() || 'DEBIT'}
                </div>
              </div>

              {/* Middle Section - Card Number */}
              <div className="flex-1 flex items-center">
                <div className="text-xl font-mono tracking-wider">
                  {showCardDetails 
                    ? formatCardNumber(String(user?.account?.debit_number || '0000-0000-0000-0000'))
                    : '•••• •••• •••• ' + String(user?.account?.debit_number || '0000').slice(-4)
                  }
                </div>
              </div>

              {/* Bottom Section - Name and Expiry */}
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs opacity-75">CARD HOLDER</div>
                  <div className="text-sm font-semibold">
                    {user?.firstname?.toUpperCase()} {user?.lastname?.toUpperCase()}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs opacity-75">EXPIRES</div>
                  <div className="text-sm font-mono">
                    {showCardDetails 
                      ? user?.account?.card_expiry_date || '00/00'
                      : '••/••'
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Click indicator */}
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-white bg-opacity-20 rounded-full p-2">
                {showCardDetails ? (
                  <HiEyeOff className="w-4 h-4 text-white" />
                ) : (
                  <HiEye className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
          </div>
          
          {/* Click hint */}
          <div className="text-center mt-2 text-sm text-gray-500">
            Click card to {showCardDetails ? 'hide' : 'reveal'} details
          </div>
        </div>
      </div>

    

      {/* Action Links */}
      <div className="flex flex-col justify-center items-center gap-4 mt-8">
        <Link to="/dashboard/cards/add">
          <div className="flex items-center gap-6 cursor-pointer border-b border-[#ECECEC] hover:text-blue-500 transition-colors">
            <h4 className="text-black text-sm sm:text-base">Add Card</h4>
            <HiArrowRight className="w-3 h-3 text-black ml-6" />
          </div>
        </Link>
        <Link to="/dashboard/cards/change">
          <div className="flex items-center gap-6 cursor-pointer border-b border-[#ECECEC] hover:text-blue-500 transition-colors">
            <h4 className="text-black text-sm sm:text-base">Change Pin</h4>
            <HiArrowRight className="w-3 h-3 text-black ml-6" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Cards;