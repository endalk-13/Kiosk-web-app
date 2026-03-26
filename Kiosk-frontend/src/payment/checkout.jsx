import React from "react";
import { useStore } from "../StoreContext";
import { useNavigate } from "react-router-dom";
import "./checkout.css"; // We'll create this new file

const Checkout = () => {
  const { cart, sendOrderToKitchen } = useStore();
  const navigate = useNavigate();

  const grandTotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1), 
    0
  );

  const handleConfirm = () => {
    // Passing the total so the kitchen can see it
    sendOrderToKitchen(grandTotal);
    navigate("/kitchen");
  };

  if (cart.length === 0) {
    return (
      <div className="receipt-container">
        <p>Your cart is empty.</p>
        <button onClick={() => navigate("/")}>Return to Menu</button>
      </div>
    );
  }

  return (
    <div className="receipt-page">
      <div className="receipt-card">
        <div className="receipt-header">
          <h1>BURGER HOUSE</h1>
          <p>Order Date: {new Date().toLocaleDateString()}</p>
          <div className="dashed-line"></div>
        </div>

        <div className="receipt-body">
          {cart.map((item) => (
            <div key={item.id} className="receipt-row">
              <span className="receipt-item-name">
                {item.qty}x {item.name}
              </span>
              <span className="receipt-item-price">
                ${((item.price || 0) * (item.qty || 1)).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="dashed-line"></div>

        <div className="receipt-footer">
          <div className="receipt-row total">
            <span>TOTAL</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
          <p className="thank-you">Thank you for your order!</p>
        </div>
        
        {/* The "Jagged Edge" at the bottom of the receipt */}
        <div className="receipt-jagged"></div>
      </div>

      <button className="confirm-btn" onClick={handleConfirm}>
        Confirm & Send to Kitchen
      </button>
    </div>
  );
};

export default Checkout;