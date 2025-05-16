import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="w-full bg-white py-10 px-4 md:px-20 mb-10 rounded-3xl">
      <p className="text-2xl md:text-3xl font-bold text-green-500 mb-8 text-center">
        Solution by Kissan Bazzar
      </p>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-10 items-start">
        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <div className="shadow-lg rounded-xl p-6 border-2 border-green-400 bg-red-100 h-full flex flex-col justify-start">
            <p className="text-xl font-bold text-red-700">Problem Statement</p>
            <div className="text-gray-900 text-md font-medium text-justify mt-4 space-y-5">
              <p>
                We all work so hard — ultimately just to earn our two meals a
                day. In today’s fast-paced digital era, we’re constantly
                updating ourselves in every field. But when it comes to food —
                the very thing we strive for — we’re still following the same
                old traditional systems.
              </p>
              <p>
                Today, many online grocery startups have emerged, offering
                features like “10-minute delivery.” But when we look closely,
                both online and offline grocery markets still follow the same
                outdated supply chain: From the farmer → to a travel agent → to
                the APMC market → to wholesalers → then to area distributors →
                local shopkeepers → and finally to the customer.
              </p>
              <p>
                Even most online grocery startups do the same — they buy from
                wholesalers, store it in dark stores (mini warehouses), and then
                deliver. But this entire process is long. And because of that,
                speed decreases, freshness suffers, and due to the increasing
                number of middlemen, prices go up.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <div className="shadow-lg rounded-xl p-6 border-2 border-green-400 bg-green-100 h-full flex flex-col justify-start">
            <p className="text-xl font-bold text-red-700">Solution</p>
            <div className="text-gray-900 text-md font-medium text-justify mt-4 space-y-5">
              <p>
                At Kissan Bazaar, we operate on the principle of “Fast, Fresh,
                Free, Fixed.” Our mission is to reduce the role of middlemen and
                deliver groceries directly from farmers to customers’ doorsteps.
              </p>
              <p>
                <strong>Fast</strong> – Since we eliminate unnecessary
                intermediaries, your groceries reach you faster than traditional
                or even many online channels.
              </p>
              <p>
                <strong>Fresh</strong> – With no middle storage or multiple
                handling points, the produce comes directly from farms to your
                home. This means maximum freshness in minimum time.
              </p>
              <p>
                <strong>Fixed</strong> – We follow a unique subscription-based
                model where customers receive groceries at a fixed base price
                for an entire year. Even if the market prices rise due to high
                demand or inflation, our subscribers continue to get products at
                the same affordable rate — ensuring consistent quality,
                quantity, and budget planning.
              </p>
              <p>
                <strong>Free</strong> – Without middlemen, our costs reduce —
                and we pass on the benefits to you. Our subscription customers
                enjoy free delivery along with lower prices on fruits and
                vegetables.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
