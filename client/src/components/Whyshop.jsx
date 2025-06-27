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

  // Auto-scroll logic
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (isHovered) return;
      container.scrollBy({ left: 300, behavior: "smooth" });

      // Reset to start if near end
      if (
        container.scrollLeft + container.offsetWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 1000); // every 3 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="py-12 rounded-xl text-center mb-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        Why Shop From <span className="text-green-600">KissanBazzar?</span>
      </h2>

      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex md:flex-wrap overflow-x-auto md:overflow-visible gap-6 px-6 md:justify-center scrollbar-hide scroll-snap-x"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="flex min-w-[350px] md:min-w-0 snap-start items-center bg-white border-2 shadow-lg rounded-lg p-5 text-left md:w-full md:max-w-sm"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="w-20 h-20 object-cover rounded-full border-4 border-green-500"
            />
            <div className="ml-4">
              <h3 className="text-lg font-bold text-green-600">
                {feature.title}
              </h3>
              <p className="font-medium text-gray-600 text-sm mt-2 text-justify">
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
