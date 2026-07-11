import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./confirmation.css";

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;

  // If someone lands here directly (e.g. refresh) with no order in state,
  // send them back to the menu rather than showing a broken page.
  if (!order) {
    navigate("/home");
    return null;
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-check">✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thanks, {order.customerName}. Order #{order.id} is on its way to the kitchen.</p>

        <div className="confirmation-items">
          {order.items.map((item) => (
            <div key={item.id} className="confirmation-item-row">
              <div>
                <span>{item.quantity}x {item.itemName}</span>
                {item.customizationSummary && (
                  <div className="confirmation-item-note">{item.customizationSummary}</div>
                )}
              </div>
              <span>${item.lineTotal.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="confirmation-total">Total: ${order.totalAmount.toFixed(2)}</div>
        <p className="confirmation-email-note">
          A confirmation email has been sent to {order.customerEmail}.
        </p>

        <button onClick={() => navigate("/home")}>Order Something Else</button>
      </div>
    </div>
  );
}

export default Confirmation;