import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineExternalLink,
  HiOutlineLogout,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineShoppingCart,
  HiOutlinePlus,
} from "react-icons/hi";
import {
  MdCategory,
  MdOutlineSubdirectoryArrowRight,
  MdOutlineInventory,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { logout } from "../store/userSlice";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import isAdmin from "../utils/isAdmin";
import Divider from "./Divider";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef();

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });
      if (response.data.success) {
        close?.();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => close?.();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        close?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  return (
    <div
      ref={menuRef}
      className="w-full max-w-xs sm:max-w-sm md:max-w-md p-4 bg-white rounded-lg shadow-xl text-sm text-gray-800 space-y-4 relative"
    >
      {/* Header */}
      <div>
        <div className="font-bold text-base mb-1">My Account</div>
        <div className="flex items-center justify-between gap-2 text-sm flex-wrap">
          <span className="truncate max-w-[12rem]">
            {user.name || user.mobile}{" "}
            {user.role === "ADMIN" && (
              <span className="text-green-600 font-semibold">(Admin)</span>
            )}
          </span>
          <Link
            onClick={handleClose}
            to="/dashboard/profile"
            className="text-green-600 hover:text-green-800"
            title="Go to Profile"
          >
            <HiOutlineExternalLink size={16} />
          </Link>
        </div>
      </div>

      <Divider />

      {/* Menu Links */}
      <div className="grid gap-1.5">
        {isAdmin(user.role) && (
          <>
            <MenuItem
              to="/dashboard/category"
              onClick={handleClose}
              icon={<MdCategory />}
            >
              Category
            </MenuItem>
            <MenuItem
              to="/dashboard/subcategory"
              onClick={handleClose}
              icon={<MdOutlineSubdirectoryArrowRight />}
            >
              Sub Category
            </MenuItem>
            <MenuItem
              to="/dashboard/admin-users"
              onClick={handleClose}
              icon={<HiOutlineUserGroup />}
            >
              All Users
            </MenuItem>
            <MenuItem
              to="/dashboard/admin-orders"
              onClick={handleClose}
              icon={<FiPackage />}
            >
              All Orders
            </MenuItem>
            <MenuItem
              to="/dashboard/upload-product"
              onClick={handleClose}
              icon={<HiOutlinePlus />}
            >
              Upload Product
            </MenuItem>
            <MenuItem
              to="/dashboard/product"
              onClick={handleClose}
              icon={<MdOutlineInventory />}
            >
              Product
            </MenuItem>
          </>
        )}

        <MenuItem
          to="/dashboard/myorders"
          onClick={handleClose}
          icon={<MdOutlineShoppingBag />}
        >
          My Orders
        </MenuItem>
        <MenuItem
          to="/dashboard/address"
          onClick={handleClose}
          icon={<HiOutlineHome />}
        >
          Saved Address
        </MenuItem>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-md font-medium bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition"
        >
          <HiOutlineLogout />
          Log Out
        </button>
      </div>
    </div>
  );
};

const MenuItem = ({ to, onClick, icon, children }) => (
  <Link
    onClick={onClick}
    to={to}
    className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700 transition font-medium"
  >
    {icon}
    {children}
  </Link>
);

export default UserMenu;
