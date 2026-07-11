import React from "react";
import { useStore } from "../StoreContext";
import { useNavigate } from "react-router-dom";
import "./cart.css";

function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useStore();
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Your cart is currently empty.</p>}

      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item.cartLineId}>
            {item.image ? (
              <img src={item.image} alt={item.name} className="cart-img" />
            ) : (
              <div className="cart-img cart-img-placeholder">🍽️</div>
            )}

            <div className="cart-details">
              <h3>{item.name}</h3>
              {item.customizationSummary && (
                <p className="cart-customization">{item.customizationSummary}</p>
              )}
              <p>Unit Price: ${item.unitPrice.toFixed(2)}</p>

              <div className="qty-control">
                <button onClick={() => updateQty(item.cartLineId, -1)} aria-label="Decrease quantity">-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.cartLineId, 1)} aria-label="Increase quantity">+</button>
              </div>

              <p className="cart-subtotal">
                Subtotal: ${(item.unitPrice * item.qty).toFixed(2)}
              </p>

              <button className="remove-btn" onClick={() => removeFromCart(item.cartLineId)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <>
          <div className="cart-grand-total">Total: ${cartTotal.toFixed(2)}</div>
          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;