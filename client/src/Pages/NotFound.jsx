import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-12">
      
      <div className="bg-gray-800/60 border border-gray-700 backdrop-blur-lg rounded-xl p-10 text-center shadow-xl max-w-xl w-full">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-16 h-16 text-orange-500 animate-pulse" />
        </div>

        <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 drop-shadow-lg mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-rose-100 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-400 text-base mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-md text-white font-semibold hover:scale-105 transition transform duration-300 shadow-md"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
