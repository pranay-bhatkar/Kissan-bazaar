import { useEffect, useState } from "react";

const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/order/history/:userId`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching orders:" , err));
  }, [userId]);

  if (loading) return <p>Loading order history...</p>;
  if (!orders.length) return <p>No past orders found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="p-4 border rounded-lg shadow-md">
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ₹{order.totalAmt}</p>
            <p><strong>Status:</strong> <span className="text-blue-600">{order.status}</span></p>
            <ul className="mt-2">
              {order.items.map((item) => (
                <li key={item.productId}>
                  {item.name} (x{item.quantity}) - ₹{item.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
