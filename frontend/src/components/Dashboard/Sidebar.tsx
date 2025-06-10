import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo2.svg";
import { RiHomeLine, RiWalletLine, RiMoneyDollarCircleLine, RiCustomerService2Line, RiUserLine } from 'react-icons/ri';
import { useAuthStore } from "../../store/authStore";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
 const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);


  const isActive = (path: string) => {
    return location.pathname === path;
  };
   const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Toggle Button - Moved to bottom */}
      <button
        className="lg:hidden fixed bottom-4 left-4 z-20 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors"
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
        lg:translate-x-0
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        bg-bg text-white h-screen w-56 p-4
      `}
      >
        <div className="text-xl font-bold mb-8 mt-16 lg:mt-4">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="PrimeVault Logo" className="h-8 w-auto mr-6" />
            <Link to="/" className="text-[18px]  text-white mr-6 ">
              PrimeVault
            </Link>
          </div>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center font-semibold p-2 rounded-4xl transition-all duration-300 ${
                  isActive('/dashboard')
                    ? 'bg-white text-blue-500'
                    : 'hover:bg-white hover:text-blue-500'
                }`}
              >
                <RiHomeLine className="mr-3 text-xl" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/payments"
                className={`flex items-center font-semibold p-2 rounded-4xl transition-all duration-300 ${
                  isActive('/dashboard/payments')
                    ? 'bg-white text-blue-500'
                    : 'hover:bg-white hover:text-blue-500'
                }`}
              >
                <RiWalletLine className="mr-3 text-xl" />
                Payments
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/cards"
                className={`flex items-center font-semibold p-2 rounded-4xl transition-all duration-300 ${
                  isActive('/dashboard/cards')
                    ? 'bg-white text-blue-500'
                    : 'hover:bg-white hover:text-blue-500'
                }`}
              >
                <RiWalletLine className="mr-3 text-xl" />
                Card
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/loan"
                className={`flex items-center font-semibold p-2 rounded-4xl transition-all duration-300 ${
                  isActive('/dashboard/loan')
                    ? 'bg-white text-blue-500'
                    : 'hover:bg-white hover:text-blue-500'
                }`}
              >
                <RiMoneyDollarCircleLine className="mr-3 text-xl" />
                Loan
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/live chat"
                className={`flex items-center font-semibold p-2 rounded-4xl transition-all duration-300 ${
                  isActive('/dashboard/live chat')
                    ? 'bg-white text-blue-500'
                    : 'hover:bg-white hover:text-blue-500'
                }`}
              >
                <RiCustomerService2Line className="mr-3 text-xl" />
                Live chat
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/profile"
                className={`flex items-center font-semibold p-2 rounded-4xl transition-all duration-300 ${
                  isActive('/dashboard/profile')
                    ? 'bg-white text-blue-500'
                    : 'hover:bg-white hover:text-blue-500'
                }`}
              >
                <RiUserLine className="mr-3 text-xl" />
                Profile
              </Link>
            </li>
              <li>
              <Link
              onClick={handleLogout}
                to="/dashboard/profile"
                className={`flex items-center font-semibold p-2 rounded-4xl transition-all duration-300 ${
                  isActive('/login/logout')
                    ? 'bg-white text-blue-500'
                    : 'hover:bg-white hover:text-blue-500'
                }`}
              >
                <RiUserLine className="mr-3 text-xl" />
Logout              </Link>
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
