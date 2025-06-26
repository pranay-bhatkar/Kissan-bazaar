import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Register = () => {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref"); // e.g., ?ref=PRANAY123
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    referredBy: referralCode || "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidValue = Object.values(data).every((el) => el.trim() !== "");

  const validateInput = () => {
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      toast.error("Invalid email format.");
      return false;
    }

    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) return;

    try {
      const response = await Axios({ ...SummaryApi.register, data });

      if (response?.data?.error) {
        toast.error(response.data.message);
        return;
      }

      if (response?.data?.success) {
        toast.success(response.data.message);
        setData({ name: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 shadow-lg">
        <p className="text-lg font-semibold">Welcome to Grocery Store</p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            type="text"
            value={data.name}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
          />
          <PasswordField
            label="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            show={showPassword}
            toggleShow={() => setShowPassword(!showPassword)}
          />
          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            show={showConfirmPassword}
            toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          {/* Optionally display it if you want users to see what ref they came from */}
          {data.referredBy && (
            <p className="text-sm text-green-700 font-medium">
              Referred by:{" "}
              <span className="font-semibold">{data.referredBy}</span>
            </p>
          )}

          <InputField
            label="Referral Code (Optional)"
            name="referredBy"
            type="text"
            value={data.referredBy}
            onChange={handleChange}
          />

          <button
            disabled={!isValidValue}
            className={`${
              isValidValue
                ? "bg-green-800 hover:bg-green-700"
                : "bg-gray-500 cursor-not-allowed"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Register
          </button>
        </form>

        <p className="text-sm mt-3">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

const InputField = ({ label, name, type, value, onChange }) => (
  <div className="grid gap-1">
    <label htmlFor={name} className="font-medium">
      {label}:
    </label>
    <input
      type={type}
      id={name}
      className="bg-gray-100 p-2 border rounded outline-none focus:border-blue-400"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);

const PasswordField = ({ label, name, value, onChange, show, toggleShow }) => (
  <div className="grid gap-1">
    <label htmlFor={name} className="font-medium">
      {label}:
    </label>
    <div className="bg-gray-100 p-2 border rounded flex items-center focus-within:border-blue-400">
      <input
        type={show ? "text" : "password"}
        id={name}
        className="w-full outline-none bg-transparent"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      <div onClick={toggleShow} className="cursor-pointer">
        {show ? <FaRegEye /> : <FaRegEyeSlash />}
      </div>
    </div>
  </div>
);

export default Register;
