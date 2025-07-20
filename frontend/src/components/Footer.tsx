import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Wescoot</h3>
            <p className="text-gray-400">
              The future of urban mobility. High-quality electric scooters for every need.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-gray-300 transition-colors">Products</Link></li>
              <li><Link to="/about" className="hover:text-gray-300 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-gray-300 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="hover:text-gray-300 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/warranty" className="hover:text-gray-300 transition-colors">Warranty</Link></li>
              <li><Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors"><Facebook /></a>
              <a href="#" className="hover:text-gray-300 transition-colors"><Twitter /></a>
              <a href="#" className="hover:text-gray-300 transition-colors"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Wescoot. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
