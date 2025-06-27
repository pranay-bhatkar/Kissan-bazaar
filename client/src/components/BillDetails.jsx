// components/BillDetails.jsx
import React from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";

const BillDetails = ({
  notDiscountTotalPrice,
  totalPrice,
  totalQty,
  handlingCharge = 10,
  deliveryCharge = 0,
}) => {
  const grandTotal = totalPrice + handlingCharge + deliveryCharge;

  return (
    <div className="bg-white p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Bill details</h3>

      <div className="flex justify-between">
        <p>Items total</p>
        <p className="flex items-center gap-2">
          <span className="line-through text-neutral-400">
            {DisplayPriceInRupees(notDiscountTotalPrice)}
          </span>
          <span>{DisplayPriceInRupees(totalPrice)}</span>
        </p>
      </div>

      <div className="flex justify-between">
        <p>Quantity total</p>
        <p>
          {totalQty} item{totalQty > 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex justify-between">
        <p>Handling Charge</p>
        <p>{DisplayPriceInRupees(handlingCharge)}</p>
      </div>

      <div className="flex justify-between">
        <p>Delivery Charge</p>
        <p>
          {deliveryCharge === 0 ? "Free" : DisplayPriceInRupees(deliveryCharge)}
        </p>
      </div>

      <div className="font-semibold flex justify-between text-green-700 border-t mt-2 pt-2">
        <p>Grand total</p>
        <p>{DisplayPriceInRupees(grandTotal)}</p>
      </div>
    </div>
  );
};

export default BillDetails;
