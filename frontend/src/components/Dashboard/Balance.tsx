import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { HiEye, HiEyeOff } from "react-icons/hi";

function Balance() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div>
      <div className="flex-col flex font-plus space-y-6 bg-bal p-4 mt-6 rounded-2xl">
        <div className="flex-row flex justify-between mx-4">
          <div className="flex items-center gap-2">
            <h3 className="text-text text-sm sm:text-base">Available Balance</h3>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="text-text hover:text-blue-500"
            >
              {showBalance ? 
                <HiEyeOff className="w-4 h-4" /> : 
                <HiEye className="w-4 h-4" />
              }
            </button>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
            <h3 className="text-text text-sm sm:text-base">Transaction History</h3>
            <HiArrowRight className="w-4 h-4 text-text" />
          </div>
        </div>
        <div className="flex-row flex justify-between mx-4 mt-6">
          <div>
            <h1 className="text-text font-bold text-xl sm:text-2xl">
              {showBalance ? "$4560.69" : "••••••"}
            </h1>
          </div>
          <div>
            <button className="px-3 md:px-4 py-1 md:py-2 bg-gradient-to-r from-text to-[#00388C] text-white text-sm rounded-4xl font-bold flex items-center gap-2 md:gap-4 hover:scale-105 transition-transform">
              Add Money
              <HiArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;
