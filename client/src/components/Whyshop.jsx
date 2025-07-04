import { useEffect, useRef, useState } from "react";
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
  const scrollRef = useRef(null);

  return (
    <section className="py-12 px-4 sm:px-6 md:px-10 bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
        Why Shop From <span className="text-green-600">KissanBazzar?</span>
      </h2>

      {/* Mobile Scrollable */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto md:hidden scrollbar-hide scroll-smooth px-2 pb-2 py-5"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="min-w-[260px] max-w-[280px] h-[180px] bg-white border-2 shadow-md rounded-lg p-4 flex items-start gap-4"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full border-2 border-green-500"
            />
            <div className="flex-1">
              <h3 className="text-base font-bold text-green-600">
                {feature.title}
              </h3>
              <p className="text-xs font-medium text-gray-600 mt-1 line-clamp-3">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="h-[200px] bg-white border-2 shadow-lg shadow-gray-400 rounded-lg p-4 flex items-start gap-4"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-16 h-16 object-cover rounded-full border-2 border-green-500"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-600">
                {feature.title}
              </h3>
              <p className="text-sm font-medium text-gray-600 mt-2 line-clamp-3">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyShop;
