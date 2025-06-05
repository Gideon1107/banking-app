import Navbar from "../components/Navbar";
import React from "react";
import card from "../assets/card.svg";
import coin from "../assets/coin1.jpeg";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row mx-4 md:mx-8 font-plus justify-between">
        <div className="mt-8 md:mt-24 max-w-xl">
          <h1 className="text-3xl md:text-[48px] font-bold text-text mt-6 md:mt-10">
            Financial Clarity, <br /> Empowered Decisions
          </h1>
          <p className="text-sm md:text-[14px] text-text mt-4 md:mt-6">
            Designed with you in mind, our app delivers a seamless and intuitive
            banking experience. Enjoy quick access to your accounts,
            personalized financial tools, and clear, easy-to-understand reports.
            Take control of your financial future, today.
          </p>
          <Link to='/login'>
            <button className="mt-6 md:mt-8  cursor-pointer px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-text to-[#00388C] text-white rounded-4xl font-bold flex items-center gap-2 md:gap-4 hover:scale-105 transition-transform">
              Get Started
              <HiArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
        <div className="w-full md:w-auto flex justify-center">
          <img src={card} alt="" className="w-3/4 md:w-250 h-auto" />
        </div>
      </div>

      {/* Middle Section */}
      <div className="mt-16 flex flex-col md:flex-row gap-4 md:gap-8 mx-4 md:mx-8 font-plus">
        <div className="w-full md:w-1/3">
          <h2 className="text-3xl md:text-[44px] text-text font-extrabold">
            Intelligent Banking, <br /> Elevated Returns.
          </h2>
        </div>
        <div className="w-full md:w-1/3 mt-4 md:mt-8">
          <p className="text-sm md:text-[14px] text-text">
            Experience a new era of financial empowerment. Our enhanced app
            delivers competitive interest on your balances, sophisticated yet
            intuitive personalized budgeting tools, and a suite of features
            designed to optimize your financial well-being. Discover a banking
            experience tailored to your unique needs, where your money works
            harder for you.
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <Link to="/login">
            <button className="mt-4 md:mt-8 px-4 cursor-pointer md:px-6 py-2 md:py-3 bg-gradient-to-r from-text to-[#00388C] text-white rounded-4xl font-bold flex items-center gap-2 md:gap-4 hover:scale-105 transition-transform">
              Get Started
              <HiArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row gap-4 lg:gap-8 mt-16 md:mt-24 font-plus px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-8 p-4 lg:p-8 rounded-xl bg-white shadow-lg w-full md:w-1/2">
          <div className="md:w-3/5">
            <h2 className="text-2xl sm:text-3xl lg:text-[44px] text-text font-extrabold">
              Instant Loans, <br />Zero Hassle.
            </h2>
            <p className="text-sm lg:text-[14px] text-text mt-4">
              Introducing our revamped bank app, now with seamless loan access! Get competitive rates and quick approvals, right at your fingertips. Whether it's for business growth, education, or personal needs, we're here to empower you. Download the app today and experience financial freedom, simplified
            </p>
          </div>
          <div className="md:w-2/5 flex items-center justify-center md:justify-end">
            <img src={coin} alt="" className="w-48 sm:w-56 md:w-full max-w-[200px] h-auto object-contain" />
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-4 lg:p-8">
          <h2 className="text-2xl sm:text-3xl lg:text-[44px] text-text font-extrabold">
            Flexible Accounts, <br /> Maximum Benefits.
          </h2>
          <p className="text-sm lg:text-[14px] text-text mt-4 max-w-lg mx-auto">
            Adapt your banking to your needs.Switch account types for benefits.Personalized features and growth opportunities, all in one place.
          </p>
          <Link to="/login">
            <button className="w-full mt-6 cursor-pointer text-text text-center justify-center md:mt-8 px-4 py-2 lg:py-3 rounded-4xl border-text border-2 font-bold flex items-center gap-2 md:gap-4 hover:scale-105 transition-transform">
              Sign in
              <HiArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
