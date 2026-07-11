import React, { createContext, useContext, useState, useMemo } from "react";
import api from "./api";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", email: "" });

  // Each cart "line" gets its own cartLineId (not the menu item id), so two
  // customized versions of the same burger never merge into one row.
  const addToCart = (line) => {
    setCart((prev) => [...prev, { ...line, qty: line.qty || 1 }]);
  };

  const removeFromCart = (cartLineId) => {
    setCart((prev) => prev.filter((l) => l.cartLineId !== cartLineId));
  };

  const updateQty = (cartLineId, delta) => {
    setCart((prev) =>
      prev
        .map((l) => (l.cartLineId === cartLineId ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = useMemo(
    () => cart.reduce((sum, l) => sum + l.unitPrice * l.qty, 0),
    [cart]
  );

  // Called after the mock payment succeeds - actually creates the order in
  // the backend, triggers the confirmation email, and clears the cart.
  const placeOrder = async () => {
    const payload = {
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customerEmail: customerInfo.email,
      items: cart.map((l) => ({
        itemName: l.name,
        category: l.category,
        unitPrice: l.unitPrice,
        quantity: l.qty,
        customizationSummary: l.customizationSummary,
      })),
    };
    const response = await api.post("/api/orders", payload);
    clearCart();
    return response.data;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartTotal,
        customerInfo,
        setCustomerInfo,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);