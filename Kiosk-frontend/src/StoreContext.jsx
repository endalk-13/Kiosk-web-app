import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // add item to cart
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  // remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // send order to kitchen
  const sendOrderToKitchen = () => {
    const newOrder = {
      id: Date.now(),
      items: cart,
      status: "pending",
    };

    setOrders((prev) => [...prev, newOrder]);
    setCart([]);
  };

  const completeOrder = (id) => {
  setOrders((prev) => prev.filter((order) => order.id !== id));
};

  return (
    <StoreContext.Provider
    value={{
  cart,
  orders,
  addToCart,
  removeFromCart,
  sendOrderToKitchen,
  completeOrder
}} 
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};