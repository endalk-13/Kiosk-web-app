import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Home from "./homepage/homepage";
import Cart from "./cart/cart";
import Checkout from "./payment/checkout";
import Kitchen from "./kitchen/kitchen";

import { StoreProvider } from "./StoreContext";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/kitchen" element={<Kitchen />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
}
export default App
