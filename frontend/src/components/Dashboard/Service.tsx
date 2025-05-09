import React from 'react'
import { useNavigate } from 'react-router-dom';
import wallet from "../../assets/wallet.png";
import mobile from "../../assets/mobile.png";
import receipt from "../../assets/receipt.png";
import withdraw from "../../assets/withdraw.png";
import transfer from "../../assets/transfer.png";
import credit from "../../assets/credit.png";

function Service() {
  const navigate = useNavigate();

  const services = [
    { icon: wallet, title: "Account and Card", path: "/dashboard/profile" },
    { icon: transfer, title: "Transfer", path: "/dashboard/payments" },
    { icon: withdraw, title: "Withdraw", path: "/dashboard/payments/withdraw" },
    { icon: mobile, title: "Mobile Recharge", path: "/dashboard/payments/internet" },
    { icon: receipt, title: "Pay the bills", path: "/dashboard/payments/bills" },
    { icon: credit, title: "Credit Card", path: "/dashboard/cards" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
      {services.map((service, index) => (
        <div
          key={index}
          onClick={() => navigate(service.path)}
          className="flex flex-col items-center p-4 bg-white rounded-xl hover:shadow-lg transition-all cursor-pointer"
        >
          <div className="bg-gray-50 p-3 rounded-lg mb-2">
            <img src={service.icon} alt={service.title} className="h-8 w-8" />
          </div>
          <h2 className="text-text3 text-sm font-bold text-center">{service.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default Service;