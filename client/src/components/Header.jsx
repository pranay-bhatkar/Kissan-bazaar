import { useState } from "react";
import { BsCartFill } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useMobile from "../hooks/useMobile";
import DisplayCartItem from "./DisplayCartItem";
import Search from "./Search";
import UserMenu from "./UserMenu";

import logo from "../assets/logo.png";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openCartSection, setOpenCartSection] = useState(false);

  const cartItem = useSelector((state) => state.cartItem.cart);

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="bg-white top-20 w-full sticky z-10">
      <header className="fixed w-full top-0 z-50 bg-white shadow-md ">
        {!isSearchPage && (
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
            {/* Logo */}
            <Link to="/" className="flex items-center h-full">
              <img
              loading="lazy"
                src={logo}
                alt="KissanBazzar Logo"
                className="w-24 sm:w-32 md:w-40 object-contain"
              />
            </Link>

            {/* Search Bar (Visible on sm and up) */}
            <div className="hidden sm:block flex-grow max-w-md w-full px-2">
              <Search />
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4 sm:gap-3">
              {/* Mobile User Icon */}
              <button
                className="lg:hidden text-green-600"
                onClick={handleMobileUser}
                aria-label="User"
              >
                <FaRegCircleUser size={26} />
              </button>

              {/* Desktop User Dropdown */}
              <div className="hidden lg:block relative">
                {user?._id ? (
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="cursor-pointer flex items-center gap-1 select-none"
                  >
                    <p className="font-medium">Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={20} />
                    ) : (
                      <GoTriangleDown size={20} />
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="text-green-600 font-semibold"
                  >
                    Login
                  </button>
                )}

                {/* Dropdown */}
                {openUserMenu && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded z-40 min-w-[150px]">
                    <UserMenu close={() => setOpenUserMenu(false)} />
                  </div>
                )}
              </div>

              {/* Cart Button */}
              <button
                onClick={() => setOpenCartSection(true)}
                className="relative flex items-center gap-2 bg-green-700 hover:bg-green-600 px-3 py-2 sm:py-2.5 rounded-lg text-white transition-all shadow-sm "
                aria-label="View Cart"
              >
                <BsCartFill size={22} />
                {cartItem.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-900 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItem.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Search Below Header */}
      {!isSearchPage && isMobile && (
        <div className="w-full px-3 pt-2 pb-1 sm:hidden bg-white shadow-sm z-40">
          <div className="max-w-md mx-auto">
            <Search />
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )}
    </div>
  );
};

export default Header;
