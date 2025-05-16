import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.order);

  console.log("order Items", orders);
  return (
    <div>
      <div className="bg-white shadow-md p-3 font-semibold">
        <h1>Order</h1>
      </div>{
        
      }
      
      {!orders[0] && <NoData />}
      {orders.map((order, index) => {
        const product = order?.product_details;

        if (!product) return null; // skip rendering this order if product details are missing

        return (
          <div
            key={order._id + index + "order"}
            className="order rounded p-4 text-sm"
          >
            <p>Order No: {order?.orderId}</p>
            <div className="flex gap-3 items-center">
              <img
                src={product?.image?.[0] || "/placeholder.png"}
                alt="product"
                className="w-14 h-14 object-cover rounded"
              />
              <p className="font-medium">{product.name || "Unnamed Product"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
