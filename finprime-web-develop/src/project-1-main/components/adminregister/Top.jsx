import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import logo from '../../images/Navbar/finprime-logo.svg';

const Top = () => {

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiry");
          navigate("/login");
        }
      };



  return (
    <nav className="bg-gray-800 text-white p-3  fixed top-0 left-0 right-0 z-50">
      <div className=" mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">
        <Link to="/">
            <img src={logo} alt="Logo" className="h-16 sm:h-14 mt-2 " />
        </Link>
        </div>

        <div className="space-x-6">
          <Link
          onClick={handleLogout}
          to="/" className="hover:text-blue-400 text-lg pr-5">Logout</Link>
        </div>

        {/* Mobile menu toggle (optional) */}
        <div className="lg:hidden">
          <button className="text-white">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Top;
