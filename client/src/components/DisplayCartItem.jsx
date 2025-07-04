import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCaretRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageEmpty from "../assets/empty_cart.webp";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "./AddToCartButton";
import BillDetails from "./BillDetails";

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [scheduledSlotModal, setScheduledSlotModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const handlingCharge = 10;
  const deliveryCharge = 0;
  const grandTotal = totalPrice + handlingCharge + deliveryCharge;

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      setShowDeliveryOptions(true);
    } else {
      toast.error("Please Login to proceed.");
    }
  };

  const handleDeliverySelection = (option) => {
    localStorage.setItem("deliveryType", option);
    setShowDeliveryOptions(false);
    close();
    navigate("/checkout", {
      state: { deliveryType: option },
    });
  };

  const handleScheduleConfirm = () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    localStorage.setItem("selectedSlot", selectedSlot);
    localStorage.setItem("deliveryType", "schedule");

    setScheduledSlotModal(false);
    setShowDeliveryOptions(false);
    close();

    navigate("/checkout", {
      state: {
        deliveryType: "schedule",
        deliverySlot: selectedSlot,
      },
    });
  };

  // Prevent scroll while cart is open
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <section className="bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 shadow-md gap-3">
          <h2 className="font-semibold">Cart</h2>
          <button onClick={close} className="block">
            <IoClose size={25} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] p-2 flex flex-col gap-4">
          {cartItem.length > 0 ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-green-100 text-green-700 rounded-full">
                <p>Your total savings</p>
                <p>
                  {DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                {cartItem.map((item) => (
                  <div key={item?._id} className="flex w-full gap-4">
                    <div className="w-20 h-20 flex items-center justify-center bg-white border rounded">
                      <img
                        src={item?.productId?.image[0]}
                        alt={item?.productId?.name}
                        className="object-scale-down"
                      />
                    </div>
                    <div className="w-full max-w-sm text-xs">
                      <p className="text-xs line-clamp-2">
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
                    <AddToCartButton data={item?.productId} />
                  </div>
                ))}
              </div>

              <BillDetails
                notDiscountTotalPrice={notDiscountTotalPrice}
                totalPrice={totalPrice}
                totalQty={totalQty}
                handlingCharge={handlingCharge}
                deliveryCharge={deliveryCharge}
              />
            </>
          ) : (
            <div className="bg-white flex flex-col justify-center items-center p-4 rounded-lg">
              <img
                src={imageEmpty}
                alt="Empty Cart"
                className="w-full h-full object-scale-down"
              />
              <button
                onClick={() => {
                  close();
                  navigate("/");
                }}
                className="block bg-green-600 px-4 py-2 text-white rounded mt-4"
              >
                Shop Now
              </button>
            </div>
          )}
        </div>

        {/* Proceed Button */}
        {cartItem.length > 0 && (
          <div className="p-2">
            <div className="bg-green-700 text-neutral-100 px-4 py-4 font-bold text-base rounded flex items-center justify-between">
              <div>{DisplayPriceInRupees(grandTotal)}</div>
              <button
                onClick={redirectToCheckoutPage}
                className="flex items-center gap-1"
              >
                Proceed <FaCaretRight />
              </button>
            </div>
          </div>
        )}

        {/* Delivery Option Modal */}
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
                onClick={() => {
                  setScheduledSlotModal(true);
                  setShowDeliveryOptions(false);
                }}
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

        {/* Scheduled Slot Modal */}
        {scheduledSlotModal && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-80 animate-fade-in">
              <h3 className="font-bold text-lg mb-4">Choose a Slot</h3>

              {["morning", "evening", "night"].map((slot) => (
                <button
                  key={slot}
                  className={`w-full py-2 rounded mb-2 ${
                    selectedSlot === slot
                      ? "bg-green-600 text-white"
                      : "bg-neutral-200"
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot === "morning" &&
                    "Order Between 9 AM – 12 PM, Get Groceries in 50 minutes"}
                  {slot === "evening" &&
                    "Order Between 4 PM – 7 PM, Get Groceries in 50 minutes"}
                  {slot === "night" &&
                    "Order Between 9 PM – 1 AM, Get Groceries by 7–8 AM"}
                </button>
              ))}

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
                  onClick={handleScheduleConfirm}
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
