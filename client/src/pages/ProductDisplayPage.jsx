import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import image2 from "../assets/fast.png";
import image1 from "../assets/fixed.png";
import image3 from "../assets/free.jpg";
import SummaryApi from "../common/SummaryApi";
import AddToCartButton from "../components/AddToCartButton";
import Divider from "../components/Divider";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { pricewithDiscount } from "../utils/PriceWithDiscount";

const ProductDisplayPage = () => {
  const params = useParams();
  const productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({ name: "", image: [] });
  const [image, setImage] = useState(0);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId },
      });

      const { data: responseData } = response;
      if (responseData.success) setData(responseData.data);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  return (
    <section className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white">
      {/* Image Section */}
      <div>
        {/* Main Image */}
        <div className="bg-white border-2  rounded w-full h-64 sm:h-80 md:h-[65vh] flex items-center justify-center">
          <img
            src={data.image[image]}
            alt="Main"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {data.image.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 lg:w-5 lg:h-5 rounded-full ${
                image === index ? "bg-green-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="relative mt-4">
          {/* Scrollable thumbnail container */}
          <div
            ref={imageContainer}
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pr-10"
          >
            {data.image.map((img, index) => (
              <div
                key={img + index}
                className={`min-w-20 min-h-20 w-20 h-20 flex-shrink-0 cursor-pointer border rounded shadow-sm transition-transform duration-150 ${
                  image === index ? " " : ""
                }`}
                onClick={() => setImage(index)}
              >
                <img
                  src={img}
                  alt={`thumb-${index}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Arrows (moved and styled to avoid overlapping images) */}
          <div className="hidden lg:flex justify-between items-center absolute top-1/2 -left-4 -right-2 -translate-y-1/2 px-1 pointer-events-none">
            <button
              onClick={handleScrollLeft}
              className="bg-white p-2 rounded-full shadow-lg pointer-events-auto translate-x-[-50%]"
              style={{ marginLeft: "-12px" }}
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="bg-white p-2 rounded-full shadow-lg pointer-events-auto translate-x-[50%]"
              style={{ marginRight: "-12px" }}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Details (Desktop Only) */}
        <div className="hidden lg:grid gap-4 mt-6">
          <div>
            <p className="font-semibold">Description</p>
            <p>{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p>{data.unit}</p>
          </div>
          {data?.more_details &&
            Object.entries(data.more_details).map(([key, value], i) => (
              <div key={i}>
                <p className="font-semibold">{key}</p>
                <p>{value}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-4 border rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800">
              {data.name}
            </h2>
            <span className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full mt-2 sm:mt-0">
              ⏱️ 10 Min
            </span>
          </div>
          <p className="text-sm text-gray-500">{data.unit}</p>
        </div>

        <Divider />

        {/* Price Block */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Price</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-green-800 bg-green-100 px-4 py-2 rounded-lg font-semibold">
              {DisplayPriceInRupees(
                pricewithDiscount(data.price, data.discount)
              )}
            </span>
            {data.discount > 0 && (
              <>
                <span className="line-through text-gray-500 text-sm">
                  {DisplayPriceInRupees(data.price)}
                </span>
                <span className="text-green-600 font-bold">
                  {data.discount}% OFF
                </span>
              </>
            )}
          </div>
        </div>

        {/* Cart Section */}
        {data.stock === 0 ? (
          <p className="text-lg font-medium text-red-500 my-2">Out of Stock</p>
        ) : (
          <AddToCartButton data={data} />
        )}

        {/* Why Shop */}
        <div>
          <h3 className="font-semibold mb-2">Why shop from Kissan Bazzar?</h3>
          <div className="space-y-4">
            {[
              {
                img: image1,
                title: "Superfast Delivery",
                desc: "Get your order delivered to your doorstep at the earliest from dark stores near you.",
              },
              {
                img: image2,
                title: "Best Prices & Offers",
                desc: "Best price destination with offers directly from the manufacturers.",
              },
              {
                img: image3,
                title: "Wide Assortment",
                desc: "Choose from 5000+ products across food, personal care, household & more.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg border shadow"
                />
                <div className="text-sm">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Details */}
        <div className="grid gap-4 lg:hidden">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-sm">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-sm">{data.unit}</p>
          </div>
          {data?.more_details &&
            Object.entries(data.more_details).map(([key, val], i) => (
              <div key={i}>
                <p className="font-semibold">{key}</p>
                <p className="text-sm">{val}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
