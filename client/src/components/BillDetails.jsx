import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import PropTypes from "prop-types";

const BillDetails = ({
  notDiscountTotalPrice = 0,
  totalPrice = 0,
  totalQty = 0,
  handlingCharge = 10,
  deliveryCharge = 0,
}) => {
  // Ensure all values are numbers
  const parsedTotalPrice = parseFloat(totalPrice) || 0;
  const parsedNotDiscountPrice = parseFloat(notDiscountTotalPrice) || 0;
  const parsedHandling = parseFloat(handlingCharge) || 0;
  const parsedDelivery = parseFloat(deliveryCharge) || 0;

  const grandTotal = parsedTotalPrice + parsedHandling + parsedDelivery;

  return (
    <div className="bg-white p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Bill details</h3>

      {/* Item Total */}
      <div className="flex justify-between mb-1">
        <p>Items total</p>
        <p className="flex items-center gap-2">
          {parsedNotDiscountPrice > parsedTotalPrice && (
            <span className="line-through text-neutral-400">
              {DisplayPriceInRupees(parsedNotDiscountPrice)}
            </span>
          )}
          <span>{DisplayPriceInRupees(parsedTotalPrice)}</span>
        </p>
      </div>

      {/* Quantity Total */}
      <div className="flex justify-between mb-1">
        <p>Quantity total</p>
        <p>
          {totalQty} item{totalQty !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Handling Charge */}
      <div className="flex justify-between mb-1">
        <p>Handling Charge</p>
        <p>{DisplayPriceInRupees(parsedHandling)}</p>
      </div>

      {/* Delivery Charge */}
      <div className="flex justify-between mb-2">
        <p>Delivery Charge</p>
        <p>
          {parsedDelivery === 0 ? "Free" : DisplayPriceInRupees(parsedDelivery)}
        </p>
      </div>

      {/* Grand Total */}
      <div className="font-semibold flex justify-between text-green-700 border-t mt-2 pt-2">
        <p>Grand total</p>
        <p>{DisplayPriceInRupees(grandTotal)}</p>
      </div>
    </div>
  );
};

BillDetails.propTypes = {
  notDiscountTotalPrice: PropTypes.number,
  totalPrice: PropTypes.number,
  totalQty: PropTypes.number,
  handlingCharge: PropTypes.number,
  deliveryCharge: PropTypes.number,
};

export default BillDetails;
