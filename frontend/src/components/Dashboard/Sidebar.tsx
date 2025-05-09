import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo2.svg";
import { RiHomeLine, RiWalletLine,  RiMoneyDollarCircleLine, RiCustomerService2Line, RiUserLine } from 'react-icons/ri';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-800 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 z-10
        lg:translate-x-0 fobnt-plus
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        bg-bg text-white h-screen w-56 p-4
      `}
      >
        <div className="text-xl font-bold mb-8 mt-16 lg:mt-0">
          <div className="flex items-center">
            <img src={Logo} alt="PrimeVault Logo" className="h-8 w-auto" />
            <Link to="/" className="text-[24px] font-bold text-white ml-2 ">
              PrimeVault
            </Link>
          </div>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center font-semibold hover:bg-white hover:rounded-2xl hover:text-blue-500 p-2 rounded"
              >
                <RiHomeLine className="mr-3 text-xl" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/payments"
                className="flex items-center font-semibold hover:bg-white hover:rounded-2xl hover:text-blue-500 p-2 rounded"
              >
                <RiWalletLine className="mr-3 text-xl" />
                Payments
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/cards"
                className="flex items-center font-semibold hover:bg-white hover:rounded-2xl hover:text-blue-500 p-2 rounded"
              >
                <RiWalletLine className="mr-3 text-xl" />
                Card
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/loan"
                className="flex items-center font-semibold hover:bg-white hover:rounded-2xl hover:text-blue-500 p-2 rounded"
              >
                <RiMoneyDollarCircleLine className="mr-3 text-xl" />
                Loan
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/live chat"
                className="flex items-center font-semibold hover:rounded-2xl hover:bg-white hover:text-blue-500 p-2 rounded"
              >
                <RiCustomerService2Line className="mr-3 text-xl" />
                Live chat
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/profile"
                className="flex items-center font-semibold hover:rounded-2xl hover:bg-white hover:text-blue-500 p-2 rounded"
              >
                <RiUserLine className="mr-3 text-xl" />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
