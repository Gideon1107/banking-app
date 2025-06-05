import React from "react";
import Frame from "../../assets/Frame.png";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
const Cards = () => {
  return (
    <div className="font-plus">
      <h1 className="text-2xl font-bold text-text text-center">Card Details</h1>
      <div className="w-full md:w-auto flex justify-center items-center mt-6">
        <img src={Frame} alt="" className="w-70 h-40" />
      </div>
      <div className="flex flex-col justify-center items-center gap-4 mt-6">
        <Link to="/dashboard/cards/add">
          <div className="flex items-center gap-6 cursor-pointer border-b-1 border-[#ECECEC] hover:text-blue-500">
            <h4 className="text-black text-sm sm:text-base">Add Card</h4>
            <HiArrowRight className="w-3 h-3 text-black ml-6" />
          </div>
        </Link>
        <Link to="/dashboard/cards/change">
          <div className="flex items-center gap-6 cursor-pointer border-b-1 border-[#ECECEC] hover:text-blue-500">
            <h4 className="text-black text-sm sm:text-base">Change Pin</h4>
            <HiArrowRight className="w-3 h-3 text-black ml-6" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
