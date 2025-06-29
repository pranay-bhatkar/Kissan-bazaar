import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/valideURLConvert";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const loadingCardNumber = new Array(6).fill(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: { id },
      });

      if (response?.data?.success) {
        setData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  const handleScroll = (offset) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += offset;
    }
  };

  const getRedirectURL = () => {
    const subcategory = subCategoryData.find((sub) =>
      sub.category.some((c) => c._id === id)
    );
    if (!subcategory) return "#";
    return `/${valideURLConvert(name)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`;
  };

  const redirectURL = getRedirectURL();

  return (
    <section className="py-4">
      {/* Section Header */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="w-full py-3 px-3 flex items-center justify-between border border-green-600 bg-white shadow-md rounded-md">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            {name}
          </h3>
          <Link
            to={redirectURL}
            className="text-green-600 hover:text-green-400 text-sm font-medium"
          >
            See All
          </Link>
        </div>
      </div>

      {/* Scrollable Product Cards */}
      <div className="relative mt-4">
        <div
          ref={containerRef}
          className="flex gap-4 sm:gap-5 md:gap-6 px-4 container mx-auto overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {loading
            ? loadingCardNumber.map((_, idx) => (
                <CardLoading key={`loader-${idx}`} />
              ))
            : data.map((p, idx) => (
                <CardProduct key={p._id + "-prod"} data={p} />
              ))}
        </div>

        {/* Scroll Buttons for Desktop */}
        <div className="hidden lg:flex justify-between items-center absolute top-1/2 left-0 right-0 px-4 transform -translate-y-1/2 pointer-events-none">
          <button
            onClick={() => handleScroll(-300)}
            className="bg-white text-gray-700 hover:bg-gray-100 rounded-full shadow-md p-2 pointer-events-auto"
            aria-label="Scroll Left"
          >
            <FaAngleLeft size={20} />
          </button>
          <button
            onClick={() => handleScroll(300)}
            className="bg-white text-gray-700 hover:bg-gray-100 rounded-full shadow-md p-2 pointer-events-auto"
            aria-label="Scroll Right"
          >
            <FaAngleRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryWiseProductDisplay;
