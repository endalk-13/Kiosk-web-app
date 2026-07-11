import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      minWidth: "100vw",
      backgroundColor: "#FF6B35",
      color: "white",
      textAlign: "center",
      padding: "20px",
    }}>
      <h1>Welcome to Burger House Kiosk system</h1>
      <p>Order your favorite burgers with ease!</p>
      <button onClick={() => navigate("/home")}>
        Start Ordering
      </button>
    </div>
  );
}

export default LandingPage;