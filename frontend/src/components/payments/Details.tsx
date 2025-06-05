import React, { useState } from "react";
import { Link } from "react-router-dom";
import girl from "../../assets/girl.jpg";

const Details = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle transfer logic here
  };

  return (
    <div className="font-plus">
      <div>
        <h1 className="text-2xl text-center font-bold text-text">
          Transfer to Bank
        </h1>
        <div className="w-full md:w-auto flex justify-center items-center mt-6">
          <img src={girl} alt="" className="w-30 h-30 rounded-full" />
        </div>
        <h1 className="text-xl text-center font-semibold text-text2 mt-4">
          Mitchelle Olivera
        </h1>
      </div>
      <div className="flex-col flex font-plus space-y-6 bg-bal p-8 mt-6 max-w-2xl mx-auto rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="number"
              id="amount"
              className="w-full p-3 rounded-xl  border-b-1 border-[#ECECEC] text-[#8792AE] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Amount"
              maxLength={10}
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <input
              type="text"
              id="description"
              className="w-full p-3 rounded-xl  border-b-1 border-[#ECECEC] text-[#8792AE] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
              maxLength={10}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <Link to="/dashboard/payments/details">
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

export default Details;
