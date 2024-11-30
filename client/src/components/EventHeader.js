import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EventHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // To store user role (e.g., 'organizer')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if the user is logged in and their role on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role"); // Assuming the role is stored in localStorage as 'role'

    if (token) {
      setIsLoggedIn(true);
      setRole(userRole);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Remove the role as well
    setIsLoggedIn(false);
    setRole("");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold text-white hover:text-yellow-300 transition">
            SEMA
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/home" className="text-lg font-medium hover:text-yellow-400 transition">
              Home
            </Link>
            <Link to="/events" className="text-lg font-medium hover:text-yellow-400 transition">
              Events
            </Link>
            <Link to="/about" className="text-lg font-medium hover:text-yellow-400 transition">
              About Us
            </Link>
            <Link to="/contact" className="text-lg font-medium hover:text-yellow-400 transition">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col space-y-4">
              <Link to="/home" className="text-lg font-medium hover:text-yellow-400 transition">
                Home
              </Link>
              <Link to="/events" className="text-lg font-medium hover:text-yellow-400 transition">
                Events
              </Link>
              <Link to="/about" className="text-lg font-medium hover:text-yellow-400 transition">
                About Us
              </Link>
              <Link to="/contact" className="text-lg font-medium hover:text-yellow-400 transition">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Conditionally render Login/Logout buttons */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
        <div className="flex justify-end items-center">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-yellow-400 text-purple-800 py-2 px-6 rounded-full font-bold hover:bg-yellow-300 transition hover:text-purple-700"
            >
              Login
            </Link>
          ) : (
            <>
              {role === "organizer" && (
                <Link
                  to="/post-event"
                  className="bg-green-500 text-white py-2 px-6 rounded-full font-bold hover:bg-green-400 transition"
                >
                  Post Event
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-6 rounded-full font-bold hover:bg-red-400 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default EventHeader;
