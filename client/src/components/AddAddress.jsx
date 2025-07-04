import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../provider/GlobalProvider";

const AddAddress = ({ close }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { fetchAddress } = useGlobalContext();

  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        ...SummaryApi.createAddress,
        data: {
          address_line: data.addressline,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          mobile: data.mobile,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        reset();
        fetchAddress();
        close?.();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <section className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl relative animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <IoClose size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Add Delivery Address
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* Address Line (Required) */}
          <div>
            <input
              type="text"
              placeholder="Address Line *"
              {...register("addressline", {
                required: "Address line is required",
              })}
              className={`w-full border rounded-md bg-blue-50 p-3 focus:outline-none focus:ring-2 ${
                errors.addressline
                  ? "border-red-500 ring-red-200"
                  : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {errors.addressline && (
              <p className="text-sm text-red-600 mt-1">
                {errors.addressline.message}
              </p>
            )}
          </div>

          {/* Mobile (Required) */}
          <div>
            <input
              type="tel"
              placeholder="Mobile No. *"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
              className={`w-full border rounded-md bg-blue-50 p-3 focus:outline-none focus:ring-2 ${
                errors.mobile
                  ? "border-red-500 ring-red-200"
                  : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {errors.mobile && (
              <p className="text-sm text-red-600 mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          {/* Optional Fields */}
          <input
            type="text"
            placeholder="City (optional)"
            {...register("city")}
            className="w-full border border-gray-300 rounded-md bg-blue-50 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="State (optional)"
            {...register("state")}
            className="w-full border border-gray-300 rounded-md bg-blue-50 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="Pincode (optional)"
            {...register("pincode")}
            className="w-full border border-gray-300 rounded-md bg-blue-50 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="Country (optional)"
            {...register("country")}
            className="w-full border border-gray-300 rounded-md bg-blue-50 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
          >
            Save Address
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAddress;
