import { useState } from "react";
import { Link } from "react-router-dom";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import { valideURLConvert } from "../utils/valideURLConvert";
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;
  const [loading, setLoading] = useState(false);

  return (
    <Link
      to={url}
      className="border-2 p-2 sm:p-3 lg:p-4 grid gap-2 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] rounded bg-white shadow-md hover:shadow-xl transition-all duration-200 ease-in-out"
    >
      {/* Image Container */}
      <div className="w-full h-[130px] sm:h-[150px] lg:h-[170px] bg-white flex items-center justify-center overflow-hidden rounded">
        <img
          src={data.image[0]}
          alt={data.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Discount badge */}
      {Boolean(data.discount) && (
        <div className="pt-1">
          <p className="text-green-600 bg-green-100 px-2 py-0.5 text-xs rounded-full font-medium w-fit whitespace-nowrap">
            {data.discount}% discount
          </p>
        </div>
      )}

      {/* Name */}
      <div className="px-1 font-medium text-sm sm:text-base line-clamp-2 leading-tight">
        {data.name}
      </div>

      {/* Unit */}
      <div className="px-1 text-xs sm:text-sm font-medium text-gray-500">
        {data.unit}
      </div>

      {/* Price and Cart */}
      <div className="px-1 flex items-center justify-between gap-1 sm:gap-3 text-sm sm:text-base">
        <div className="font-semibold text-gray-800">
          {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
        </div>
        <div>
          {data.stock === 0 ? (
            <p className="text-red-500 text-xs font-semibold text-center whitespace-nowrap">
              Out of stock
            </p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
