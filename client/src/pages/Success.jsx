import React from "react";
import { Link, useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const successText = location?.state?.text || "Payment";

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center animate-fade-in-up">
        {/* ✅ Checkmark animation */}
        <div className="w-24 h-24 mx-auto mb-4 relative">
          <svg
            className="checkmark w-full h-full text-green-500"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="checkmark__check"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              d="M14 27l7 7 16-16"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-green-700 mb-2">
          {successText} Successful
        </h2>
        <p className="text-gray-600 mb-4">
          Your order has been placed successfully. Thank you for shopping with
          us!
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
        >
          Go to Home
        </Link>
      </div>

      {/* ✅ Custom animation styles */}
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

        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: stroke 0.6s ease-in-out forwards;
        }

        .checkmark__check {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s 0.6s ease-in-out forwards;
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

export default Success;
