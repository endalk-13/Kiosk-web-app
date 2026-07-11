import React, { useState } from "react";
import { useStore } from "../StoreContext";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

const Checkout = () => {
  const { cart, cartTotal, customerInfo, setCustomerInfo } = useStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div className="receipt-page">
        <div className="receipt-card">
          <p>Your cart is empty.</p>
        </div>
        <button className="confirm-btn" onClick={() => navigate("/home")}>Return to Menu</button>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (!customerInfo.name.trim()) e.name = "Name is required";
    if (!/^[0-9+\-\s()]{7,}$/.test(customerInfo.phone.trim())) e.phone = "Enter a valid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email.trim())) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (validate()) navigate("/payment");
  };

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
            <div key={item.cartLineId} className="receipt-row">
              <span className="receipt-item-name">
                {item.qty}x {item.name}
                {item.customizationSummary && (
                  <>
                    <br />
                    <small className="receipt-customization">{item.customizationSummary}</small>
                  </>
                )}
              </span>
              <span className="receipt-item-price">
                ${(item.unitPrice * item.qty).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="dashed-line"></div>

        <div className="receipt-footer">
          <div className="receipt-row total">
            <span>TOTAL</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="customer-form">
        <h2>Your Details</h2>
        <label>
          Full Name
          <input
            type="text"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>
        <label>
          Phone Number
          <input
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </label>
        <label>
          Email
          <input
            type="email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>
        <button className="confirm-btn" onClick={handleContinue}>Continue to Payment</button>
      </div>
    </div>
  );
};

export default Checkout;