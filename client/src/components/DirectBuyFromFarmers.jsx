import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import farmer_1 from '../assets/farmer_1.jpg';
import farmer_2 from '../assets/farmer_2.jpg';
import farmer_3 from '../assets/farmer_3.jpg';

const farmersData = [
  { id: 1, name: 'Rajendra Deore(Patil)', location: 'Dhule, Maharashtra', image: farmer_1, contact: 'official@kissanbazzar.in' },
  { id: 2, name: 'Bhushan Bhadane', location: 'Dhule, Maharashtra', image: farmer_2, contact: 'official@kissanbazzar.in' },
  { id: 3, name: 'Panditrao Patil', location: 'Nashik, Maharashtra', image: farmer_3, contact: 'official@kissanbazzar.in' },
];

const itemsPerPage = 3;

const DirectBuyFromFarmers = () => {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(farmersData.length / itemsPerPage);
  const startIdx = page * itemsPerPage;
  const currentItems = farmersData.slice(startIdx, startIdx + itemsPerPage);

  return (
    <section className='p-4 md:p-8 lg:p-12 bg-white'>
      <h2 className='text-2xl md:text-3xl font-bold mb-8 text-center text-green-700'>
        We Directly Buy from Farmers
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className='flex flex-wrap justify-center gap-6'
        >
          {currentItems.map((farmer) => (
            <div
              key={farmer.id}
              className='w-full sm:w-[300px] border rounded-lg shadow-md hover:shadow-lg transition overflow-hidden bg-white'
            >
              <img
                src={farmer.image}
                alt={farmer.name}
                className='w-full h-52 object-cover'
              />
              <div className='p-4'>
                <h3 className='text-lg font-semibold text-green-800'>{farmer.name}</h3>
                <p className='text-sm text-gray-600'>{farmer.location}</p>
                <p className='text-sm text-gray-600'>{farmer.contact}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Dots Pagination */}
      <div className='flex justify-center items-center mt-8 gap-2'>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx)}
            className={`w-3 h-3 rounded-full ${
              page === idx ? 'bg-green-600' : 'bg-gray-300'
            } transition-all duration-300`}
          />
        ))}
      </div>
    </section>
  );
};

export default DirectBuyFromFarmers;
