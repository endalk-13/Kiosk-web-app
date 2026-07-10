import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./cart/StoreContext";
import Navbar from "./navbar/Navbar.jsx";
import Home from "./homepage/homepage.jsx";
import Cart from "./cart/cart.jsx";
import Checkout from "./payment/checkout.jsx";
import Kitchen from "./kitchen/Kitchen.jsx";

import { StoreProvider } from "./StoreContext";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
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
