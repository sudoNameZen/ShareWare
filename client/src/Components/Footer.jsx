import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-white">ShareWare</h2>
          <p className="text-sm">
            Seamless file sharing made simple. Send files securely and easily with ShareWare.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#"><Facebook className="hover:text-white" /></a>
            <a href="#"><Twitter className="hover:text-white" /></a>
            <a href="#"><Instagram className="hover:text-white" /></a>
            <a href="#"><Linkedin className="hover:text-white" /></a>
            <a href="#"><Github className="hover:text-white" /></a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Navigate</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-orange-400">About</Link></li>
            <li><Link to="/send" className="hover:text-orange-400">Send Files</Link></li>
            <li><Link to="/receive" className="hover:text-orange-400">Receive Files</Link></li>
            <li><Link to="/signup" className="hover:text-orange-400">Sign Up</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-orange-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-orange-400">Terms & Conditions</Link></li>
            <li><Link to="/faq" className="hover:text-orange-400">FAQ</Link></li>
            <li><Link to="/support" className="hover:text-orange-400">Support</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>India</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91 99999-99999</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>support@shareware.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} ShareWare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
