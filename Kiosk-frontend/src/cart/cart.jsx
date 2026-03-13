import React from "react";
import { useStore } from "../StoreContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart } = useStore();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Cart</h2>

      {cart.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
      ))}

      <button onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;