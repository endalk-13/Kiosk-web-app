
import React from "react";






function Cart({ cart, total }) {
  const TAX_RATE = 0.1;
  const tax = total * TAX_RATE;
  const grandTotal = total + tax;

  const formatUSD = (amount) =>
    `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="receipt">
      {cart.map((item) => (
        <div className="receipt-item" key={item.id}>
          <div className="row">
            <strong>{item.name}</strong>
            <span>{formatUSD(item.price * item.qty)}</span>
          </div>
          <div className="row small">
            <span>Qty: {item.qty}</span>
          </div>
          <hr />
        </div>
      ))}

      <div className="summary">
        <div className="row">
          <span>Subtotal</span>
          <span>{formatUSD(total)}</span>
        </div>
        <div className="row">
          <span>Tax (10%)</span>
          <span>{formatUSD(tax)}</span>
        </div>
        <div className="row total">
          <strong>Total</strong>
          <strong>{formatUSD(grandTotal)}</strong>
        </div>
      </div>
    </div>
  );
}

export default Cart;
