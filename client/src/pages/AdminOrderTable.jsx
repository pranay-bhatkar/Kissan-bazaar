import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";


const AdminOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from server
  const fetchOrders = async () => {
    try {
      const res = await Axios.get("/api/admin/orders");
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Unable to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Listen to real-time new order event
    socket.on("new-order", (newOrder) => {
      toast.success("New order received!");
      fetchOrders();
    });

    // Cleanup on unmount
    return () => {
      socket.off("new-order");
    };
  }, []);

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">All Orders</h2>

      {loading ? (
        <p className="text-center py-4">Loading orders...</p>
      ) : (
        <table className="min-w-[900px] w-full bg-white border text-sm rounded shadow-md">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-3 py-2">Order ID</th>
              <th className="border px-3 py-2">User</th>
              <th className="border px-3 py-2">Amount</th>
              <th className="border px-3 py-2">Payment</th>
              <th className="border px-3 py-2">Delivery</th>
              <th className="border px-3 py-2">Slot</th>
              <th className="border px-3 py-2">Address</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const address = order.delivery_address;
              return (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{order.orderId}</td>
                  <td className="border px-3 py-2">
                    {order.userId?.name || "N/A"}
                    <br />
                    <span className="text-gray-500 text-xs">
                      {order.userId?.email || "No email"}
                    </span>
                  </td>
                  <td className="border px-3 py-2 font-medium text-green-700">
                    ₹{order.totalAmt?.toFixed(2)}
                  </td>
                  <td className="border px-3 py-2">{order.payment_status}</td>
                  <td className="border px-3 py-2 capitalize">
                    {order.deliveryType}
                  </td>
                  <td className="border px-3 py-2">
                    {order.deliverySlot || "-"}
                  </td>
                  <td className="border px-3 py-2">
                    {address
                      ? `${address.address_line}, ${address.city}, ${address.state} - ${address.pincode}`
                      : "N/A"}
                    <br />
                    <span className="text-xs text-gray-500">
                      Ph: {address?.mobile || "-"}
                    </span>
                  </td>
                  <td className="border px-3 py-2">
                    {moment(order.createdAt).format("DD MMM YYYY, h:mm A")}
                  </td>
                  <td className="border px-3 py-2">
                    {order.status || "Pending"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrderTable;
