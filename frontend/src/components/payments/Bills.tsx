import React from "react";
import { Link, useNavigate } from "react-router-dom";
import electric from "../../assets/electric.png";
import water from "../../assets/water.png";
import internet from "../../assets/internet.png";

function Bills() {
  const navigate = useNavigate();
  
  const bills = [
    {
      title: "Electric Bill",
      description: "Pay electric bill this month",
      icon: electric,
      path: "/dashboard/payments/electric"
    },
    {
      title: "Water Bill",
      description: "Pay water bill this month",
      icon: water,
      path: "/dashboard/payments/water"
    },
    {
      title: "Internet Bill",
      description: "Pay internet bill this month",
      icon: internet,
      path: "/dashboard/payments/internet"
    }
  ];

  return (
    <div className="font-plus">
      <h1 className="text-2xl font-bold text-text text-center mb-8">
        Pay the bill
      </h1>
      <div className="flex flex-col justify-center items-center gap-4 mt-6">
        {bills.map((bill, index) => (
          <div 
            key={index}
            onClick={() => navigate(bill.path)}
            className="flex-row flex justify-between p-6 bg-white rounded-2xl shadow-lg w-full md:w-1/2 lg:w-1/3 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex-col flex">
              <h2 className="text-lg font-semibold text-black">{bill.title}</h2>
              <h3 className="text-sm text-text3">{bill.description}</h3>
            </div>
            <div className="flex items-center">
              <img src={bill.icon} alt={bill.title} className="w-20 h-20" />
            </div>
          </div>
        ))}
      </div>
      <Link to='/dashboard/payments'>
      <h4 className="text-center  mt-4 font-bold mr-6">check payment history</h4>
      </Link>    
    </div>
  );
}

export default Bills;
