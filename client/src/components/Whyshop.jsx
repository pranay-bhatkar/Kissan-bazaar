import React from "react";
import { motion } from "framer-motion";
import fast from "../assets/fast.png";
import fresh from "../assets/fresh.png";
import fixed from "../assets/fixed.png";
import free from "../assets/free.jpg";

const features = [
  {
    id: 1,
    title: "Fast",
    description:
      "You will get the fastest deliveries because there is no middle time.",
    image: fast,
  },
  {
    id: 2,
    title: "Fresh",
    description:
      "Since there is no middle time, it will not be stored anywhere, you will get fresh food in the shortest possible time.",
    image: fresh,
  },
  {
    id: 3,
    title: "Fixed",
    description:
      "We will enter into contracts with farmers to provide vegetables and fruits at a fixed price throughout the year. No tension while market price fluctuates.",
    image: fixed,
  },
  {
    id: 4,
    title: "Free",
    description: "Free delivery for our regular customers.",
    image: free,
  },
];

const WhyShop = () => {
  return (
    <div className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        Why Shop From <span className="text-green-600">KisanBazar?</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-8 px-6">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="flex items-center rounded-lg p-6 w-full max-w-sm text-left bg-white shadow-lg"
            whileHover={{ scale: 1.0 }}
          >
            {/* Image Container */}
            <img
              src={feature.image}
              alt={feature.image}
              className=" rounded-full w-20 border-4 border-green-500 "
            />

            {/* Text Content */}
            <div className="ml-6">
              <h3 className="text-lg font-bold text-green-600">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm font-normal text-justify mt-2 break-words">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyShop;
