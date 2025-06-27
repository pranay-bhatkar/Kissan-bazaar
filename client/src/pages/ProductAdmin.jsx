import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { IoSearchOutline } from "react-icons/io5";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on initial mount & when `page` changes
  useEffect(() => {
    fetchProductData();
  }, [page]);

  // Debounced search
  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchProductData();
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  const handleNext = () => {
    if (page < totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <section className="w-full">
      {/* Header */}
      <div className="p-2 bg-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="font-semibold text-lg">Product</h2>
        <div className="w-full md:w-72 bg-blue-50 px-4 flex items-center gap-3 py-2 rounded border focus-within:border-primary-200">
          <IoSearchOutline size={20} className="text-gray-600" />
          <input
            type="text"
            placeholder="Search product here ..."
            className="w-full outline-none bg-transparent text-sm"
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>

      {/* Loading */}
      {loading && <Loading />}

      {/* Products */}
      <div className="p-4 bg-blue-50 min-h-[60vh]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {productData.map((product) => (
            <ProductCardAdmin
              key={product._id}
              data={product}
              fetchProductData={fetchProductData}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className={`px-4 py-1 border rounded ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "hover:bg-primary-200"
            }`}
          >
            Previous
          </button>
          <span className="px-4 py-1 bg-slate-100 rounded">
            Page {page} of {totalPageCount}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPageCount}
            className={`px-4 py-1 border rounded ${
              page === totalPageCount
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "hover:bg-primary-200"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductAdmin;
