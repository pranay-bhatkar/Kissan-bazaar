import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import imageEmpty from "../assets/empty_cart.webp";
import toast from "react-hot-toast";

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState("");

  const [scheduledSlotModal, setScheduledSlotModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      setShowDeliveryOptions(true);
      return;
    }
    toast("Please Login");
  };

  const handleDeliverySelection = (option) => {
    setSelectedDelivery(option);
    setShowDeliveryOptions(false);

    // Optionally, pass the selection to checkout
    navigate("/checkout", {
      state: { deliveryType: option },
    });
  };

  return (
    <section className="bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto relative">
        <div className="flex items-center justify-between p-4 shadow-md gap-3">
          <h2 className="font-semibold">Cart</h2>
          <Link to={"/"} className="lg:hidden">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block">
            <IoClose size={25} />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
          {cartItem.length > 0 ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full">
                <p>Your total savings</p>
                <p>
                  {DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                {cartItem.map((item) => (
                  <div key={item?._id} className="flex w-full gap-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-white border rounded">
                      <img
                        src={item?.productId?.image[0]}
                        alt={item?.productId?.name}
                        className="object-scale-down"
                      />
                    </div>
                    <div className="w-full max-w-sm text-xs">
                      <p className="text-xs text-ellipsis line-clamp-2">
                        {item?.productId?.name}
                      </p>
                      <p className="text-neutral-400">
                        {item?.productId?.unit}
                      </p>
                      <p className="font-semibold">
                        {DisplayPriceInRupees(
                          pricewithDiscount(
                            item?.productId?.price,
                            item?.productId?.discount
                          )
                        )}
                      </p>
                    </div>
                    <div>
                      <AddToCartButton data={item?.productId} />
                    </div>
                  </div>
                ))}
              </div>

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
                  <p>Delivery Charge</p>
                  <p>Free</p>
                </div>
                <div className="font-semibold flex justify-between">
                  <p>Grand total</p>
                  <p>{DisplayPriceInRupees(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center p-4 rounded-lg">
              <img
                src={imageEmpty}
                alt="Empty Cart"
                className="w-full h-full object-scale-down"
              />
              <Link
                onClick={close}
                to={"/"}
                className="block bg-green-600 px-4 py-2 text-white rounded mt-4"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {cartItem.length > 0 && (
          <div className="p-2">
            <div className="bg-green-700 text-neutral-100 px-4 py-4 font-bold text-base rounded flex items-center justify-between">
              <div>{DisplayPriceInRupees(totalPrice)}</div>
              <button
                onClick={redirectToCheckoutPage}
                className="flex items-center gap-1"
              >
                Proceed <FaCaretRight />
              </button>
            </div>
          </div>
        )}

        {showDeliveryOptions && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-80 animate-fade-in">
              <h3 className="font-bold text-lg mb-4">Select Delivery Option</h3>
              <button
                className="w-full bg-green-600 text-white py-2 rounded mb-2"
                onClick={() => handleDeliverySelection("instant")}
              >
                Instant Delivery
              </button>
              <button
                className="w-full border border-green-600 text-green-600 py-2 rounded mb-2"
                onClick={() => setScheduledSlotModal(true)}
              >
                Schedule Delivery
              </button>
              <button
                className="w-full py-2 rounded bg-neutral-200"
                onClick={() => setShowDeliveryOptions(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {scheduledSlotModal && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-80 animate-fade-in">
              <h3 className="font-bold text-lg mb-4">Choose a Slot</h3>

              <button
                className={`w-full py-2 rounded mb-2 ${
                  selectedSlot === "morning"
                    ? "bg-green-600 text-white"
                    : "bg-neutral-200"
                }`}
                onClick={() => setSelectedSlot("morning")}
              >
                Morning Slot (Delivery by Evening)
              </button>

              <button
                className={`w-full py-2 rounded mb-2 ${
                  selectedSlot === "evening"
                    ? "bg-green-600 text-white"
                    : "bg-neutral-200"
                }`}
                onClick={() => setSelectedSlot("evening")}
              >
                Evening Slot (Delivery by Morning)
              </button>

              <div className="flex justify-between gap-2 mt-4">
                <button
                  className="flex-1 py-2 rounded bg-neutral-300"
                  onClick={() => setScheduledSlotModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-2 rounded bg-green-700 text-white"
                  disabled={!selectedSlot}
                  onClick={() => {
                    setScheduledSlotModal(false);
                    setShowDeliveryOptions(false);

                    // Navigate with delivery data
                    navigate("/checkout", {
                      state: {
                        deliveryType: "schedule",
                        deliverySlot: selectedSlot,
                      },
                    });
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}


        
      </div>
    </section>
  );
};

export default DisplayCartItem;
