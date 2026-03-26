import React from "react";


function LandingPage() {
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
      <button onClick={() => window.location.href = "/Home"}>
        Start Ordering
      </button>
    </div>
  );
}

export default LandingPage;