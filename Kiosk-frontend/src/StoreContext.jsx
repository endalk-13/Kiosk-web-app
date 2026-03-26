import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // add item to cart
  // Updated add item to cart logic
  const addToCart = (item) => {
    setCart((prev) => {
      // 1. Check if this item is already in the cart
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // 2. If it exists, map through and increase the qty of that specific ID
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      }

      // 3. If it's a new item, add it and initialize qty to 1
      // We also wrap price in Number() just in case it's a string
      return [...prev, { ...item, qty: 1, price: Number(item.price) }];
    });
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