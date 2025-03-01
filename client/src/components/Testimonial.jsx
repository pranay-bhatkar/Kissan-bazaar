import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Amit Sharma",
    location: "Mumbai, India",
    designation: "Software Engineer",
    feedback: "Fresh vegetables and dairy products at the best price! Love the service.",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Priya Verma",
    location: "Mumbai, India",
    designation: "Marketing Executive",
    feedback: "Amazing quality and super fast delivery. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    name: "Rajesh Gupta",
    location: "Mumbai, India",
    designation: "Business Owner",
    feedback: "Best online grocery store I have come across. Very convenient!",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Sneha Iyer",
    location: "Mumbai, India",
    designation: "Doctor",
    feedback: "Great variety of fresh products. Customer support is excellent!",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    name: "Vikram Patil",
    location: "Mumbai, India",
    designation: "Entrepreneur",
    feedback: "Timely delivery and best quality grocery items. Loved the experience!",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    name: "Anjali Mehta",
    location: "Mumbai, India",
    designation: "Teacher",
    feedback: "The dairy products are incredibly fresh. Will keep ordering!",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    name: "Suresh Nair",
    location: "Mumbai, India",
    designation: "Bank Manager",
    feedback: "Affordable prices and top-notch quality. Very satisfied!",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
  },
  {
    name: "Kavita Reddy",
    location: "Mumbai, India",
    designation: "Chef",
    feedback: "Loved the organic products section. Truly amazing!",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
  }
];

export default function Testimonials() {
  return (
    <div className="py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
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
              className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-gray-300"
            />
            <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
            <h4 className="mt-4 font-semibold text-gray-800">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.designation}, {testimonial.location}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
