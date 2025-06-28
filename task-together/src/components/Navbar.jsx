import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function NavBar(){
    // State to manage the mobile menu's open/closed state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const onloginClick=()=>{
     navigate('/login');
  };
  return (
    <header className="bg-white shadow-sm py-4 px-6 md:px-12 rounded-b-xl">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo/App Name */}
        <div className="text-3xl font-extrabold text-orange-500">
          TaskTogether
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-700 hover:text-orange-500 transition duration-300 ease-in-out font-medium">Home</a>
          <a href="#features" className="text-gray-700 hover:text-orange-500 transition duration-300 ease-in-out font-medium">Fonctionnalités</a>
        </div>

        {/* Sign Up Button (Desktop) */}
        <div className="hidden md:block">
          <button id='login' onClick={onloginClick} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Se connecter
          </button>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {/* Conditional rendering for hamburger or close icon */}
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Links (Conditional Rendering) */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-white border-t border-gray-100 py-2 space-y-2">
          <a href="/" className="block px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-500 font-medium">Home</a>
          <a href="#features" className="block px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-500 font-medium">Fonctionnalités</a>

          <div className="px-6 pt-2 pb-1">
            <button onClick={onloginClick} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out">
              Se connecter
            </button>
          </div>
        </div>
      )}
    </header>
  );
}