import React from "react";
import "./Kitchen.css";
import { useStore } from "../StoreContext";

function Kitchen() {
  const { orders, completeOrder } = useStore();

  return (
    <div className="kitchen-screen">
      <h2>Kitchen Display System</h2>
      <div className="order-grid">
        {orders.map((order) => (
          <div key={order.id} className="order-ticket">
            <div className="ticket-header">
              <span>Order #{order.id.toString().slice(-4)}</span>
              <span>{order.time}</span>
            </div>
            <ul className="ticket-items">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.qty}x {item.name}
                </li>
              ))}
            </ul>
            <button onClick={() => completeOrder(order.id)} className="done-btn">
              SERVED
            </button>
          </div>
        ))}
      </div>
      {orders.length === 0 && <p className="empty-msg">No pending orders. Take a break! ☕</p>}
    </div>
  );
}

export default Kitchen;