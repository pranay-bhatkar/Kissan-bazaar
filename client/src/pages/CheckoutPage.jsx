import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import AddAddress from "../components/AddAddress";
import BillDetails from "../components/BillDetails";
import QRCodeModal from "../components/QRPayment";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import qrImageUrl from "../assets/Gpay-QR.jpg";

const CheckoutPage = () => {
  const handlingCharge = 10;
  const deliveryCharge = 10;

  const [qrUrl] = useState(qrImageUrl);
  const [showQR, setShowQR] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);

  const {
    notDiscountTotalPrice,
    totalPrice,
    totalQty,
    fetchCartItem,
    fetchOrder,
  } = useGlobalContext();

  const addressList = useSelector((state) => state.addresses.addressList);
  const cartItemsList = useSelector((state) => state.cartItem.cart);
  const [selectAddress, setSelectAddress] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const deliveryType = location.state?.deliveryType || "instant";
  const deliverySlot = location.state?.deliverySlot || null;

  const slotMessages = {
    morning: "within the next 50 minutes",
    evening: "within the next 50 minutes",
    night: "next morning between 7 AM - 8 AM",
  };

  useEffect(() => {
    if (addressList.length > 0 && !selectAddress) {
      setSelectAddress(addressList[0]._id);
    }
  }, [addressList, selectAddress]);

  const handleCashOnDelivery = async () => {
    if (!selectAddress) {
      toast.error("Please select an address before proceeding.");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: selectAddress,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice + deliveryCharge + handlingCharge,
          deliveryType,
          deliverySlot,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
        fetchOrder();
        navigate("/success", {
          state: {
            text: deliveryType === "schedule" ? "Subscription Order" : "Order",
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleQRPayment = () => {
    if (!selectAddress) {
      toast.error("Please select an address before proceeding.");
      return;
    }
    setShowQR(true);
  };

  const handleSubmitTransactionId = async (txnId) => {
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: selectAddress,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice + deliveryCharge + handlingCharge,
          deliveryType,
          deliverySlot,
          payment_status: "Paid via QR",
          transactionId: txnId,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success("Payment verified and order placed.");
        fetchCartItem();
        fetchOrder();
        navigate("/success", { state: { text: "Order" } });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-blue-50 min-h-screen py-4">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6 px-4">
        {/* Address Section */}
        <div className="w-full lg:w-2/3">
          <h3 className="text-lg font-semibold mb-2">
            {deliveryType === "schedule"
              ? "Scheduled Checkout"
              : "Instant Checkout"}
          </h3>
          <div className="bg-white rounded-lg shadow p-4 ">
            {addressList.map((address, index) => (
              <label
                htmlFor={`address${index}`}
                key={address._id}
                className={!address.status && "hidden"}
              >
                <div className="border-2 m-2 rounded p-3 flex gap-3 hover:bg-blue-50">
                  <input
                    id={`address${index}`}
                    type="radio"
                    value={address._id}
                    name="address"
                    checked={selectAddress === address._id}
                    onChange={(e) => setSelectAddress(e.target.value)}
                  />
                  <div className="text-sm">
                    <p>{address.address_line}</p>
                    {/* <p>
                      {address.city}, {address.state}, {address.country} -{" "}
                      {address.pincode}
                    </p> */}
                    <p>📞 {address.mobile}</p>
                  </div>
                </div>
              </label>
            ))}
            <button
              onClick={() => setOpenAddress(true)}
              className="mt-4 w-full border-2 border-dashed border-blue-400 py-2 text-blue-600 font-medium text-sm rounded hover:bg-blue-100"
            >
              + Add New Address
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>
            <BillDetails
              notDiscountTotalPrice={notDiscountTotalPrice}
              totalPrice={totalPrice}
              totalQty={totalQty}
              handlingCharge={handlingCharge}
              deliveryCharge={deliveryCharge}
            />
            <div className="w-full flex flex-col gap-3 mt-5">
              <button
                onClick={handleQRPayment}
                className="bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-semibold"
              >
                Scan QR code / Online
              </button>
              <button
                onClick={handleCashOnDelivery}
                className="border border-green-600 text-green-700 py-2 rounded text-sm font-semibold hover:bg-green-50"
              >
                Cash on Delivery
              </button>
            </div>
          </div>

          {deliveryType === "schedule" && deliverySlot && (
            <p className="text-sm text-gray-500 text-center mt-4">
              You selected <strong>{deliverySlot}</strong> slot — items will be
              delivered <strong>{slotMessages[deliverySlot]}</strong>.
            </p>
          )}
          {deliveryType === "instant" && (
            <p className="text-sm text-gray-500 text-center mt-4">
              You selected <strong>Instant Delivery</strong> — items will be
              delivered within <strong>30 minutes</strong>.
            </p>
          )}
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
      {showQR && (
        <QRCodeModal
          qrUrl={qrUrl}
          onClose={() => setShowQR(false)}
          onSubmitTransaction={handleSubmitTransactionId}
        />
      )}
    </section>
  );
};

export default CheckoutPage;
