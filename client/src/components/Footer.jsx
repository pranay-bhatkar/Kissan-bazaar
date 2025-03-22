import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-500 text-white py-10">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col items-center text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-center">
            <p className="text-3xl font-bold tracking-wide">KissanBazzar</p>
            <p className="mt-3 text-white text-lg font-light max-w-xs">
              India's first - fast fresh fixed free grocery delivery site.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 font-normal">
              {[
                { name: "Home", path: "#" },
                {
                  name: "Vegetables",
                  path: "Vegetables-67c1737d470e03dbeb6afb0f/NightShades-67c17843470e03dbeb6afb96",
                },
                { name: "Fruits", path: "/Fruits-67c1737d470e03dbeb6afb11" },
                {
                  name: "Dairy Products",
                  path: "http://localhost:5173/Dairy-Products-67c1747b470e03dbeb6afb34/Milk-67c17e80470e03dbeb6afc61",
                },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-white transition duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="font-bold text-xl">Contact</p>
            <div className="font-normal space-y-2 pt-2">
              <p>9022866505</p>
              <p>official@kissanbazzar.in</p>
            </div>

            <div className="pt-5">
              <p className="font-bold text-xl">Operates In</p>
              <div className="font-normal space-y-2">
                <p>Dombivli</p>
                <p>Thane</p>
                <p>Navi Mumbai</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-500 mt-6 pt-4 w-full max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Social Media Section */}
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="bg-white p-2 rounded-full text-green-700 hover:bg-green-600 hover:text-white transition duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              )}
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} KisaanBazzar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
