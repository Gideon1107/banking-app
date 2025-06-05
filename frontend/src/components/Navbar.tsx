import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.svg'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Credit Cards', path: '/credit-cards' },
    { name: 'Investments', path: '/investments' },
    { name: 'Mortgages', path: '/mortgages' },
    { name: 'More', path: '/more' },
  ];

  return (
    <nav className="bg-white ">
      <div className="max-w-7xl mx-auto px-4 font-plus">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src={Logo} alt="PrimeVault Logo" className="h-8 w-auto" />
            <Link to="/" className="text-[24px] font-bold ml-2 text-text">
              PrimeVault
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-text text-[20px] font-semibold hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <button className="bg-white text-text px-4 py-1.5 rounded-xl font-semibold border-text border-2">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block py-2 text-text font-semibold hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar