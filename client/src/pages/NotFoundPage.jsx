import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
          <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
