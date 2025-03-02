import { motion } from "framer-motion";
import testimonial_img1 from "../assets/img1.png";
import testimonial_img2 from "../assets/img2.png";
import testimonial_img3 from "../assets/img3.png";
import testimonial_img4 from "../assets/img4.png";
import testimonial_img6 from "../assets/img6.png";
import {} from "../assets/img1.png";

const testimonials = [
  {
    name: "Digvijay Deore",
    location: "Mumbai, India",
    designation: "Founder & developer",
    image: testimonial_img4,
  },
  {
    name: "Shreya Tiwari",
    location: "Mumbai, India",
    designation: "Co-Founder & Finance",
    image: testimonial_img2,
  },
  {
    name: "Abhinav Pandey",
    location: "Mumbai, India",
    designation: "Operations Head (Dombivli)",
    image: testimonial_img3,
  },
  {
    name: "Lokesh Raut",
    location: "Mumbai, India",
    designation: "Business Head (Dombivli)",
    image: testimonial_img1,
  },
  {
    name: "Pranay Bhatkar",
    location: "Mumbai, India",
    designation: "Thane Executive",
    image: testimonial_img6,
  },
];

export default function Testimonials() {
  return (
    <div className="py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        What Our Customers Say
      </h2>
      <div className="flex justify-center gap-6 overflow-hidden flex-wrap bg-red-200 mx-5  rounded-3xl shadow-xl border-2 border-white py-10">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-lg w-80"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-27 aspect-auto rounded-lg mx-auto mb-4 border-4 border-gray-300"
            />

            <p className="mt-4 font-semibold text-gray-800">
              {testimonial.name}
            </p>
            <p className="text-sm text-gray-700 font-normal pt-5">
              {testimonial.designation}
            </p>

            <p className="text-sm text-gray-700 font-normal pt-2">
              {testimonial.location}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
