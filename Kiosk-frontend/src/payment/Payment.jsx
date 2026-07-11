import React, { useState } from "react";
import { useStore } from "../StoreContext";
import { useNavigate } from "react-router-dom";
import "./payment.css";

const formatCardNumber = (value) =>
  value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

function Payment() {
  const { cart, cartTotal, customerInfo, placeOrder } = useStore();
  const navigate = useNavigate();
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  // Guard against someone landing here directly without going through checkout
  if (cart.length === 0) {
    navigate("/home");
    return null;
  }
  if (!customerInfo.name || !customerInfo.email) {
    navigate("/checkout");
    return null;
  }

  const handlePay = async (e) => {
    e.preventDefault();
    setError("");

    const digits = card.number.replace(/\s/g, "");
    if (digits.length !== 16) return setError("Card number must be 16 digits.");
    if (!card.name.trim()) return setError("Name on card is required.");
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) return setError("Expiry must be in MM/YY format.");
    if (!/^\d{3,4}$/.test(card.cvv)) return setError("CVV must be 3-4 digits.");

    setProcessing(true);
    try {
      // Simulated processing delay - this is a demo flow, no real charge occurs
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const order = await placeOrder();
      navigate("/confirmation", { state: order });
    } catch (err) {
      console.error("Order placement failed:", err);
      setError("Something went wrong placing your order. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <div className="payment-page">
      <form className="payment-card" onSubmit={handlePay}>
        <h2>Payment</h2>
        <p className="payment-demo-note">Demo checkout — no real card is charged.</p>

        <label>
          Card Number
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={card.number}
            onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
            maxLength={19}
          />
        </label>

        <label>
          Name on Card
          <input
            type="text"
            value={card.name}
            onChange={(e) => setCard({ ...card, name: e.target.value })}
          />
        </label>

        <div className="payment-row">
          <label>
            Expiry
            <input
              type="text"
              placeholder="MM/YY"
              value={card.expiry}
              onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
              maxLength={5}
            />
          </label>
          <label>
            CVV
            <input
              type="password"
              placeholder="123"
              value={card.cvv}
              onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
              maxLength={4}
            />
          </label>
        </div>

        {error && <p className="payment-error">{error}</p>}

        <button type="submit" className="pay-btn" disabled={processing}>
          {processing ? "Processing..." : `Pay $${cartTotal.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}

export default Payment;