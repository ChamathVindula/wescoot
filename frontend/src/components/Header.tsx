import React from 'react';
import { Link } from 'react-router';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Wescoot
        </Link>
        <nav>
          <Link to="/scooters" className="text-gray-600 hover:text-blue-600 px-3 py-2">
            Scooters
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2">
            About
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600 px-3 py-2">
            Contact
          </Link>
        </nav>
        <div>
          <Link to="/cart" className="text-gray-600 hover:text-blue-600 px-3 py-2">
            Cart
          </Link>
          <Link to="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
