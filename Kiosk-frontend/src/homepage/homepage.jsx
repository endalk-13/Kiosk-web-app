import React from "react";
import "./homepage.css";

import cheeseburger from "../assets/cheeseburger.jpg";
import hamburger from "../assets/hamburger.jpeg";
import veggieBurger from "../assets/veggieburger.jpg";
import smashBurger from "../assets/smashburger.jpg";
import doubleSmashBurger from "../assets/doublesmash.jpg";


const foodItems = [
  { id: 1, name: "Classic Cheeseburger", description: "A juicy beef patty with cheese, lettuce, and tomato", price: 12.99, image: cheeseburger },
  { id: 2, name: "Classic Hamburger", description: "A classic beef patty with lettuce, tomato, and onion", price: 15.50, image: hamburger },
  { id: 3, name: "Smash Burger", description: "A smashed beef patty with special sauce and pickles", price: 9.00, image: smashBurger },
  { id: 4, name: "Veggie Burger", description: "A plant-based burger with fresh vegetables and avocado", price: 22.00, image: veggieBurger },
  { id: 5, name: "Double Smash Burger", description: "Two smashed beef patties with special sauce and pickles", price: 30.00, image: doubleSmashBurger },
];

function Home() {
  return (
    <div className="home-container">
      <h1>Menu</h1>
      <div className="food-grid">
        {foodItems.map((item) => (
          <div key={item.id} className="food-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <h4>{item.description}</h4>
            <p className="price">${item.price.toFixed(2)}</p>
            <div className="card-buttons">
              <button className="add-btn">Add to Cart</button>
              <button className="details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;