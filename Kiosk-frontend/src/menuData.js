import cheeseburger from "./assets/cheeseburger.jpg";
import hamburger from "./assets/hamburger.jpeg";
import veggieBurger from "./assets/veggieburger.jpg";
import smashBurger from "./assets/smashburger.jpg";
import doubleSmashBurger from "./assets/doublesmash.jpg";


export const BURGERS = [
  { id: 1, category: "BURGER", name: "Classic Cheeseburger", description: "A juicy beef patty with cheese, lettuce, and tomato", price: 12.99, image: cheeseburger },
  { id: 2, category: "BURGER", name: "Classic Hamburger", description: "A classic beef patty with lettuce, tomato, and onion", price: 15.50, image: hamburger },
  { id: 3, category: "BURGER", name: "Smash Burger", description: "A smashed beef patty with special sauce and pickles", price: 9.00, image: smashBurger },
  { id: 4, category: "BURGER", name: "Veggie Burger", description: "A plant-based burger with fresh vegetables and avocado", price: 22.00, image: veggieBurger },
  { id: 5, category: "BURGER", name: "Double Smash Burger", description: "Two smashed beef patties with special sauce and pickles", price: 30.00, image: doubleSmashBurger },
];

// Placeholder items per your instructions - no images, no customization.
// Swap in real prices/photos whenever you're ready.
export const SIDES = [
  { id: 101, category: "SIDE", name: "French Fries", description: "Crispy golden fries, salted to perfection", price: 3.50, image: null },
  { id: 102, category: "SIDE", name: "Onion Rings", description: "Beer-battered onion rings", price: 4.50, image: null },
  { id: 103, category: "SIDE", name: "Coleslaw", description: "Creamy house-made coleslaw", price: 2.75, image: null },
  { id: 104, category: "SIDE", name: "Mozzarella Sticks", description: "Golden fried, served with marinara", price: 5.00, image: null },
];

export const DRINKS = [
  { id: 201, category: "DRINK", name: "Coca-Cola", description: "Ice-cold classic Coke", price: 2.00, image: null },
  { id: 202, category: "DRINK", name: "Sprite", description: "Crisp lemon-lime soda", price: 2.00, image: null },
  { id: 203, category: "DRINK", name: "Iced Tea", description: "Freshly brewed iced tea", price: 2.25, image: null },
  { id: 204, category: "DRINK", name: "Bottled Water", description: "Still water, 500ml", price: 1.50, image: null },
];

export const CATEGORY_EMOJI = {
  BURGER: "🍔",
  SIDE: "🍟",
  DRINK: "🥤",
};