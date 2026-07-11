import React, { useCallback, useEffect, useState } from "react";
import "./Kitchen.css";
import api from "../api";

function Kitchen() {
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [view, setView] = useState("active");
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const [activeRes, completedRes] = await Promise.all([
        api.get("/api/orders/active"),
        api.get("/api/orders/completed"),
      ]);
      setActiveOrders(activeRes.data);
      setCompletedOrders(completedRes.data);
    } catch (err) {
      console.error("Failed to load kitchen orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Poll so the board updates itself without needing a manual refresh
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleConfirm = async (id) => {
    await api.patch(`/api/orders/${id}/confirm`);
    fetchOrders();
  };

  const handleComplete = async (id) => {
    await api.patch(`/api/orders/${id}/complete`);
    fetchOrders();
  };

  const ordersToShow = view === "active" ? activeOrders : completedOrders;

  return (
    <div className="kitchen-screen">
      <h2>Kitchen Display System</h2>

      <div className="kitchen-tabs">
        <button
          className={view === "active" ? "active" : ""}
          onClick={() => setView("active")}
        >
          Active ({activeOrders.length})
        </button>
        <button
          className={view === "completed" ? "active" : ""}
          onClick={() => setView("completed")}
        >
          Completed Orders ({completedOrders.length})
        </button>
      </div>

      {loading && <p className="empty-msg">Loading orders...</p>}

      <div className="order-grid">
        {ordersToShow.map((order) => (
          <div key={order.id} className={`order-ticket status-${order.status.toLowerCase()}`}>
            <div className="ticket-header">
              <span>Order #{order.id}</span>
              <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
            </div>
            <div className="ticket-customer">{order.customerName} · {order.customerPhone}</div>
            <ul className="ticket-items">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.quantity}x {item.itemName}
                  {item.customizationSummary && (
                    <div className="ticket-customization">{item.customizationSummary}</div>
                  )}
                </li>
              ))}
            </ul>

            {order.status === "PENDING" && (
              <button onClick={() => handleConfirm(order.id)} className="confirm-order-btn">
                Confirm Order
              </button>
            )}
            {order.status === "CONFIRMED" && (
              <button onClick={() => handleComplete(order.id)} className="done-btn">
                Mark Done
              </button>
            )}
            {order.status === "DONE" && <div className="done-label">✓ Served</div>}
          </div>
        ))}
      </div>

      {!loading && ordersToShow.length === 0 && (
        <p className="empty-msg">
          {view === "active" ? "No pending orders. Take a break! ☕" : "No completed orders yet."}
        </p>
      )}
    </div>
  );
}

export default Kitchen;