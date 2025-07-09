import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { setOrder } from "../store/orderSlice";
import AxiosToastError from "../utils/AxiosToastError";
import moment from "moment";

const MyOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.order);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await Axios(SummaryApi.getOrderItems);
        if (response.data.success) {
          dispatch(setOrder(response.data.data));
        }
      } catch (err) {
        AxiosToastError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [dispatch]);

  return (
    <div>
      <div className="bg-white shadow-md p-3 font-semibold">
        <h1>My Orders</h1>
      </div>

      {loading && <p className="text-center py-5">Loading orders...</p>}

      {!loading && orders.length === 0 && <NoData />}

      {!loading &&
        orders.map((order, index) => (
          
          <div
            key={order._id + index + "order"}
            className="order rounded p-4 text-sm border my-2 mx-2 bg-white"
          >
            <p className="font-semibold text-primary-200 mb-1">
              Order No: <span className="text-black">{order.orderId}</span>
            </p>
            <p className="text-gray-600 mb-1">
              Date: {moment(order.createdAt).format("DD MMM YYYY, h:mm A")}
            </p>
            <p className="text-gray-600 mb-1">
              Payment: {order.payment_status}
            </p>
            <p className="text-gray-600 mb-1">
              Delivery: {order.deliveryType}
              {order.deliveryType === "scheduled" &&
                order.subscriptionDetails?.slot && (
                  <> ({order.subscriptionDetails.slot})</>
                )}
            </p>
            <p className="text-gray-600 mb-1">
              Total: ₹{order.totalAmt?.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-3">
              Address: {}
              {order.delivery_address
                ? `${order.delivery_address.address_line}, ${order.delivery_address.city}`
                : "N/A"}
            </p>

            <div className="border-t pt-3">
              {order.items.map((item, i) => (
                <div className="flex gap-3 items-center border-b py-2" key={i}>
                  <img
                  loading="lazy"
                    src={item?.productId?.image?.[0] || "/placeholder.png"}
                    alt={item?.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item?.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.price?.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyOrders;
