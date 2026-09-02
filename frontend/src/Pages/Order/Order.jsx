import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import "./Order.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { token, url } = useContext(StoreContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        const res = await axios.post(
          `${url}/api/order/userorders`,
          {},
          { headers: { token } },
        );
        setOrders(res.data.orders);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="orders">
      <h2>Your Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-card-header">
              <span className="order-id">
                Order #{order._id.slice(-6).toUpperCase()}
              </span>
              <span
                className={`order-status ${order.status === "Food Processing" ? "processing" : "delivered"}`}
              >
                {order.status}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div className="order-item" key={index}>
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="order-item-img"
                  />
                  <div className="order-item-info">
                    <p className="order-item-name">{item.name}</p>
                    <p className="order-item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="order-item-price">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="order-card-footer">
              <p className="order-total">Total: ₹{order.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
