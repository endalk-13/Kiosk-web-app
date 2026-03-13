import React from "react";
import { useStore } from "../StoreContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // Make sure to create this file!

function Cart() {
  const { cart } = useStore();
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      
      {/* Message if cart is empty */}
      {cart.length === 0 && <p>Your cart is currently empty.</p>}

      <div className="cart-list">
        {cart.map((item) => {
          // Fallbacks: If price or qty are missing, default to 0 and 1 so the app doesn't break
          const price = item.price || 0; 
          const qty = item.qty || 1;

          return (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-img" />
              
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Unit Price: ${price.toFixed(2)}</p>
                <p>Quantity: {qty}</p>
                <p className="cart-subtotal">
                  Subtotal: ${(price * qty).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {cart.length > 0 && (
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;