import React from 'react';
import { Link } from 'react-router-dom';
import { CircleUser, Menu } from 'lucide-react';

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'Product', path: '/api/product' },
  { name: 'About', path: '/about' },
];

const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-gray-900 text-white px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-tight">
        ShareWare
      </Link>

      {/* Mobile Menu Icon (non-functional placeholder) */}
      <div className="lg:hidden">
        <Menu className="w-6 h-6" />
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center space-x-6">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="hover:text-orange-400 transition-colors duration-200"
          >
            {item.name}
          </Link>
        ))}

        {/* User Icon */}
        <Link to="/auth/user" className="hover:text-orange-400">
          <CircleUser className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
