import React from "react";
import { motion } from "framer-motion";
import farmer_1 from "../assets/farmer_1.jpg";
import farmer_2 from "../assets/farmer_2.jpg";
import farmer_3 from "../assets/farmer_3.jpg";

const farmersData = [
  {
    id: 1,
    name: "Rajendra Deore(Patil)",
    location: "Dhule, Maharashtra",
    image: farmer_1,
    contact: "official@kissanbazzar.in",
  },
  {
    id: 2,
    name: "Bhushan Bhadane",
    location: "Dhule, Maharashtra",
    image: farmer_2,
    contact: "official@kissanbazzar.in",
  },
  {
    id: 3,
    name: "Panditrao Patil",
    location: "Nashik, Maharashtra",
    image: farmer_3,
    contact: "official@kissanbazzar.in",
  },
];

const DirectBuyFromFarmers = () => {
  return (
    <section className="p-4 sm:p-6 lg:p-12 bg-white">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center text-green-700">
        We Directly Buy from Farmers
      </h2>

      {/* Horizontal Scrollable List */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-2 py-3 "
      >
        {farmersData.map((farmer) => (
          <motion.div
            key={farmer.id}
            whileHover={{ scale: 1.02 }}
            className="min-w-[180px] max-w-[220px] sm:min-w-[220px] sm:max-w-[250px] flex-shrink-0 border-2 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden bg-white"
          >
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                loading="lazy"
                src={farmer.image}
                alt={farmer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="text-sm sm:text-base font-semibold text-green-800">
                {farmer.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {farmer.location}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 break-all">
                {farmer.contact}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default DirectBuyFromFarmers;
