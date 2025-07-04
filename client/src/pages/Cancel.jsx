import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-red-50 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center animate-fade-in-up">
        {/* ❌ Cancel Icon Animation */}
        <div className="w-24 h-24 mx-auto mb-4 relative">
          <svg className="w-full h-full text-red-500" viewBox="0 0 52 52">
            <circle
              cx="26"
              cy="26"
              r="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="cancel__circle"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              d="M16 16 36 36 M36 16 16 36"
              className="cancel__cross"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-red-700 mb-2">
          Order Cancelled
        </h2>
        <p className="text-gray-600 mb-4">
          Your order was cancelled. If this was a mistake, please try again.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
        >
          Go to Home
        </Link>
      </div>

      {/* Custom Animation Styles */}
      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out both;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cancel__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: stroke 0.6s ease-in-out forwards;
        }

        .cancel__cross {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: stroke 0.4s 0.6s ease-in-out forwards;
        }

        @keyframes stroke {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Cancel;
