import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCartFill } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

import Search from "./Search";
import UserMenu from "./UserMenu";
import DisplayCartItem from "./DisplayCartItem";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import useMobile from "../hooks/useMobile";
import { useGlobalContext } from "../provider/GlobalProvider";

import logo from "../assets/logo.png";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const { totalPrice, totalQty } = useGlobalContext();

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openCartSection, setOpenCartSection] = useState(false);

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
    } else {
      navigate("/user");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md h-16 sm:h-20">
        {!isSearchPage && (
          <div className="container mx-auto px-3 h-full flex items-center justify-between gap-2">
            {/* Logo */}
            <Link to="/" className="flex items-center h-full">
              <img
                src={logo}
                alt="KissanBazzar Logo"
                className="w-28 sm:w-36 md:w-40 object-contain"
              />
            </Link>

            {/* Search (only for medium and up) */}
            <div className="flex-grow max-w-md w-full hidden sm:block">
              <Search />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Mobile User Icon */}
              <button
                className="lg:hidden text-green-600"
                onClick={handleMobileUser}
                aria-label="User"
              >
                <FaRegCircleUser size={26} />
              </button>

              {/* Desktop Login / Account */}
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
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded z-40">
                    <UserMenu close={() => setOpenUserMenu(false)} />
                  </div>
                )}
              </div>

              {/* Cart Button */}
              <button
                onClick={() => setOpenCartSection(true)}
                className="flex items-center gap-2 bg-green-700 hover:bg-green-600 px-3 py-2 rounded text-white"
              >
                <BsCartFill size={20} />
                <div className="text-sm font-semibold text-left">
                  {cartItem.length > 0 ? (
                    <>
                      <p>{totalQty} Items</p>
                      <p>{DisplayPriceInRupees(totalPrice)}</p>
                    </>
                  ) : (
                    <p>My Cart</p>
                  )}
                </div>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Search Bar (outside header) */}
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
    </>
  );
};

export default Header;
