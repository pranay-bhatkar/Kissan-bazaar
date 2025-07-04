import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const Register = () => {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref") || "";

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    referredBy: referralCode,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [referralValid, setReferralValid] = useState(true);
  const [referralCheckLoading, setReferralCheckLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidValue =
    data.name && data.email && data.password && data.confirmPassword;

  const validateInput = () => {
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      toast.error("Invalid email format.");
      return false;
    }
    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    const validateReferral = async () => {
      if (!data.referredBy.trim()) {
        setReferralValid(true);
        return;
      }
      try {
        setReferralCheckLoading(true);
        const response = await Axios({
          ...SummaryApi.validateReferral,
          data: { referralCode: data.referredBy },
        });

        setReferralValid(response?.data?.valid || false);
        if (!response?.data?.valid) {
          toast.error("Referral code is invalid.");
        }
      } catch (error) {
        AxiosToastError(error);
        setReferralValid(false);
      } finally {
        setReferralCheckLoading(false);
      }
    };

    validateReferral();
  }, [data.referredBy]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) return;
    if (data.referredBy && !referralValid) {
      toast.error("Invalid referral code.");
      return;
    }

    try {
      const response = await Axios({ ...SummaryApi.register, data });

      if (response?.data?.error) {
        toast.error(response.data.message);
        return;
      }

      if (response?.data?.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          referredBy: "",
        });
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-lg p-8 sm:p-10 border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-6">
          Register to KissanBazzar
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
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
          <InputField
            label="Referral Code (Optional)"
            name="referredBy"
            type="text"
            value={data.referredBy}
            onChange={handleChange}
          />

          {referralCheckLoading && (
            <p className="text-xs text-blue-500">Checking referral code...</p>
          )}
          {!referralValid && data.referredBy && (
            <p className="text-sm text-red-600 font-medium">
              Invalid referral code ❌
            </p>
          )}
          {referralValid && data.referredBy && (
            <p className="text-sm text-green-600 font-medium">
              Referral code valid ✅
            </p>
          )}

          <button
            type="submit"
            disabled={!isValidValue}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              isValidValue
                ? "bg-green-700 hover:bg-green-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

// Reusable input field
const InputField = ({ label, name, type, value, onChange }) => (
  <div className="grid gap-1">
    <label htmlFor={name} className="font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded border bg-gray-50 outline-none focus:ring-1 focus:ring-green-300 focus:border-green-500 transition"
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);

// Reusable password field
const PasswordField = ({ label, name, value, onChange, show, toggleShow }) => (
  <div className="grid gap-1">
    <label htmlFor={name} className="font-medium text-gray-700">
      {label}
    </label>
    <div className="flex items-center bg-gray-50 border rounded px-4 py-2 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-300">
      <input
        type={show ? "text" : "password"}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="w-full bg-transparent outline-none"
      />
      <div
        onClick={toggleShow}
        className="cursor-pointer text-gray-500 ml-2"
        title="Toggle visibility"
      >
        {show ? <FaRegEye /> : <FaRegEyeSlash />}
      </div>
    </div>
  </div>
);

export default Register;
