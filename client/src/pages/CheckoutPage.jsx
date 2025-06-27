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

import qrImageUrl from "../assets/gpayQR.jpg";

const CheckoutPage = () => {
  const handlingCharge = 10;
  const deliveryCharge = 10;

  const [qrUrl] = useState(qrImageUrl);
  const [showQR, setShowQR] = useState(false);

  const {
    notDiscountTotalPrice,
    totalPrice,
    totalQty,
    fetchCartItem,
    fetchOrder,
  } = useGlobalContext();

  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state.addresses.addressList);
  const [selectAddress, setSelectAddress] = useState(null);
  const cartItemsList = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (addressList.length > 0 && !selectAddress) {
      setSelectAddress(addressList[0]._id);
    }
  }, [addressList, selectAddress]);

  // 🆕 Delivery type foundation (default instant)
  const deliveryType = location.state?.deliveryType || "instant";

  const deliverySlot = location.state?.deliverySlot || null;

  const handleCashOnDelivery = async () => {
    if (selectAddress === null) {
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
          totalAmt: totalPrice,
          deliveryType: deliveryType, // 🆕 send to backend
          deliverySlot: deliverySlot,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem && fetchCartItem();
        fetchOrder && fetchOrder();
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
    setShowQR(true); // Show static GPay QR modal
  };

  const handleSubmitTransactionId = async (txnId) => {
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: selectAddress,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
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
    <section className="bg-blue-50">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold">
            {deliveryType === "schedule"
              ? "Scheduled Checkout"
              : "Instant Checkout"}
          </h3>
          <div className="bg-white p-2 grid gap-4">
            {addressList.map((address, index) => (
              <label
                htmlFor={`address${index}`}
                key={address._id}
                className={!address.status && "hidden"}
              >
                <div className="border rounded p-3 flex gap-3 hover:bg-blue-50">
                  <div>
                    <input
                      id={`address${index}`}
                      type="radio"
                      value={address._id}
                      name="address"
                      checked={selectAddress === address._id}
                      onChange={(e) => setSelectAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <p>{address.address_line}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>
                      {address.country} - {address.pincode}
                    </p>
                    <p>{address.mobile}</p>
                  </div>
                </div>
              </label>
            ))}
            <div
              onClick={() => setOpenAddress(true)}
              className="h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer"
            >
              Add address
            </div>
          </div>
        </div>

        <div className="w-full max-w-md bg-white py-4 px-2">
          <h3 className="text-lg font-semibold">Summary</h3>

          <BillDetails
            notDiscountTotalPrice={notDiscountTotalPrice}
            totalPrice={totalPrice}
            totalQty={totalQty}
            handlingCharge={handlingCharge}
            deliveryCharge={deliveryCharge}
          />

          <div className="w-full flex flex-col gap-4">
            <button
              className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
              onClick={handleQRPayment}
            >
              {deliveryType === "schedule"
                ? "Scan QR code or Online"
                : "Scan QR code or Online"}
            </button>

            <button
              className="py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white"
              onClick={handleCashOnDelivery}
            >
              {deliveryType === "schedule"
                ? "Cash on Delivery"
                : "Cash on Delivery"}
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}

      {deliveryType === "schedule" && deliverySlot && (
        <p className="text-sm text-gray-500 text-center mt-2">
          You selected the <strong>{deliverySlot}</strong> slot — items will be
          delivered by{" "}
          <strong>
            {deliverySlot === "morning" ? "order will be deliverd in next 1 hour" : "next morning"}
          </strong>
          .
        </p>
      )}

      {deliveryType === "instant" && (
        <p className="text-sm text-gray-500 text-center mt-2">
          You selected <strong>Instant Delivery</strong> — items will be
          delivered within <strong>30 minutes</strong>.
        </p>
      )}

      {/* ✅ Show QR Modal */}
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
