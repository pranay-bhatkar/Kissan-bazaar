import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Highest Assortment",
    description:
      "250+ Fresh Fruits and Vegetables along with 100+ traditionally handmade snacks",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    title: "Naturally Grown",
    description:
      "All our vegetables & fruits are naturally grown in a natural environment.",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    title: "Clean & Grade",
    description:
      "Post plucking, each produce is cleaned and graded by experts.",
    image: "https://i.pravatar.cc/150?img=12",
  },
  
  {
    id: 4,
    title: "Clean & Grade",
    description:
      "Post plucking, each produce is cleaned and graded by experts.",
    image: "https://i.pravatar.cc/150?img=12",
  },
];

const WhyShop = () => {
  return (
    <div className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        Why Shop From <span className="text-green-600">KisanBazar?</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-12 px-6">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="flex items-center  rounded-lg p-6 w-[400px] text-left  "
            whileHover={{ scale: 1.05 }}
          >
            {/* Water Drop Shape Container */}
            <div className="relative w-30 h-30 rounded-full overflow-hidden border-2 border-green-500 shadow-md">
              <div className="absolute inset-0 bg-green-500 rounded-t-full transform rotate-180" />
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover relative z-10"
              />
            </div>

            {/* Text Content */}
            <div className="ml-6">
              <h3 className="text-lg font-bold text-green-600">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
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
