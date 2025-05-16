import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import notFoundAnimation from '../assets/404.json'; 

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-gray-900">
      <div className="w-full max-w-md">
        <Lottie animationData={notFoundAnimation} loop={true} />
      </div>
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mt-4">Oops! Page not found</h1>
      <p className="text-center text-gray-500 dark:text-gray-300 mt-2">The page you are looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-all duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
