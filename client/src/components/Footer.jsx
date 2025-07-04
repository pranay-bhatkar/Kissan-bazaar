import { FaInstagram, FaPhone, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-500 text-white py-6 rounded-t-3xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full mb-8">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-3xl font-bold tracking-wide">KissanBazzar</h3>
            <p className="mt-3 text-white text-base font-light max-w-xs">
              India's first - fast fresh fixed free grocery delivery site.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="font-bold text-xl text-white">Contact</p>

            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <FaPhone className="text-green-500" />
              </div>
              <a href="tel:+919987882293" className="hover:underline">
                +91 99878 82293
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <FaWhatsapp className="text-green-500" />
              </div>
              <a
                href="https://wa.me/919326140459"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                +91 93261 40459
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <FaEnvelope className="text-green-500" />
              </div>
              <a
                href="mailto:official@kissanbazzar.in"
                className="hover:underline break-words"
              >
                official@kissanbazzar.in
              </a>
            </div>
          </div>

          {/* Locations */}
          <div className="flex flex-col items-center md:items-start">
            <p className="font-bold text-xl">Operates In</p>
            <ul className="mt-2 space-y-1 font-light">
              <li>Dombivli</li>
              <li>Thane</li>
              <li>Navi Mumbai</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 pt-5 w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/kissanbazzar.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full text-green-700 hover:bg-green-600 hover:text-white transition duration-300"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>

            <p>© {new Date().getFullYear()} KissanBazzar. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
