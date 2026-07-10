import React from "react";
import "./cart.css";

function Cart({ cart, setCart }) {
  const TAX_RATE = 0.1;

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="cart-container">
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <div className="item-type">
            {item.type === "drink" ? "Softdrinks" : item.type.toUpperCase()}
          </div>

          <div className="item-row">
            <div>
              <span className="item-name">{item.name}</span>
              <div className="controls">
                <button onClick={() => increaseQty(item.id)}>+</button>
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <button onClick={() => removeItem(item.id)}>Remove</button>
                <span> Qty: {item.qty}</span>
              </div>
            </div>

            <span className="price">${(item.price * item.qty).toFixed(2)}</span>
          </div>
        </div>
      ))}

      <div className="summary">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax (10%): ${tax.toFixed(2)}</p>
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Cart;

