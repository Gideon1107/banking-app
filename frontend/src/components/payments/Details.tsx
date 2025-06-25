import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import girl from "../../assets/girl.jpg";
import { paymentStore } from "../../store/paymentStore";
import { authStore } from "../../store/authStore"; 

const Details = () => {
  const [formData, setFormData] = useState({
    amount: "",
    reference: "",
  });
  const { state } = useLocation();
  const { transfer } = paymentStore();
  const user = authStore.getState().user;
  const navigate = useNavigate();


 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.amount || !formData.reference) {
    alert("Please fill in all fields.");
    return;
  }
  try {
    const data = {
      recipent_account: state?.accountNumber,
      transaction_type: "transfer",
      account_number: user?.account?.account_number,
      amount: formData.amount,
      reference: formData.reference,
    };
    console.log(user, "userdata in Details component"); // << Add this!
    console.log("Details transfer data:", data);  // << Add this!
    await transfer(data);
    navigate("/dashboard/payments/success");
  } catch (error) {
    console.error("Transfer error in Details:", error); // << Add this!
    alert("Transfer failed.");
  }
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
        <div className="text-center text-gray-500 mt-2">
          {/* Optionally show account info */}
          Account: {state?.accountNumber}
        </div>
      </div>
      <div className="flex-col flex font-plus space-y-6 bg-bal p-8 mt-6 max-w-2xl mx-auto rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="number"
              id="amount"
              className="w-full p-3 rounded-xl border-b-1 border-[#ECECEC] text-[#8792AE] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              id="reference"
              className="w-full p-3 rounded-xl border-b-1 border-[#ECECEC] text-[#8792AE] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
              maxLength={50}
              value={formData.reference}
              onChange={(e) =>
                setFormData({ ...formData, reference: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-text text-white py-3 rounded-lg hover:bg-text2 transition-colors mt-6"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;