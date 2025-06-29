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
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll for mobile view
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || window.innerWidth >= 768) return;

    const interval = setInterval(() => {
      if (isHovered) return;

      if (
        container.scrollLeft + container.offsetWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 3000); // every 3s

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-12 px-4 sm:px-6 md:px-10 bg-gray-50">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
        Why Shop From <span className="text-green-600">KissanBazzar?</span>
      </h2>

      {/* Mobile Scrollable */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-6 overflow-x-auto md:hidden scrollbar-hide scroll-smooth px-2 pb-2 py-5"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="min-w-[300px] bg-white border-2 shadow-md rounded-lg p-5 flex items-center"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-4 border-green-500"
            />
            <div className="ml-4">
              <h3 className="text-lg font-bold text-green-600">
                {feature.title}
              </h3>
              <p className="text-sm font-medium text-gray-600 mt-2 text-justify">
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
            className="bg-white border-2 shadow-md rounded-lg p-5 flex items-center"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-4 border-green-500"
            />
            <div className="ml-4">
              <h3 className="text-lg font-bold text-green-600">
                {feature.title}
              </h3>
              <p className="text-sm font-medium text-gray-600 mt-2 text-justify">
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
