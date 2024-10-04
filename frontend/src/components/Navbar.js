import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Navbar = () => {
  const { state, logout } = useAuth(); // Get the authentication state and logout function

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg">Mess Menu</div>
        <div className="hidden md:flex space-x-4">
          <NavLink
            exact
            to="/"
            activeClassName="text-yellow-500"
            className="text-white hover:text-yellow-300"
          >
            Home
          </NavLink>

          {/* Conditionally render Login, Register, and Logout links based on authentication state */}
          {!state.isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                activeClassName="text-yellow-500"
                className="text-white hover:text-yellow-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                activeClassName="text-yellow-500"
                className="text-white hover:text-yellow-300"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/admin/dashboard"
                activeClassName="text-yellow-500"
                className="text-white hover:text-yellow-300"
              >
                Dashboard
              </NavLink>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="text-white">Menu</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
