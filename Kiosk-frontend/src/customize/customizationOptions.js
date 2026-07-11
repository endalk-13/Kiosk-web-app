// Every burger uses this same option set. Prices are add-ons on top of the
// base menu item price. "price: 0" options are the default / included choice.

export const PATTY_OPTIONS = [
  { id: "beef", label: "Beef Patty (Original)", price: 0 },
  { id: "grilled-chicken", label: "Grilled Chicken Patty", price: 1.00 },
  { id: "crispy-chicken", label: "Crispy Fried Chicken Patty", price: 1.50 },
  { id: "veggie", label: "Plant-Based Veggie Patty", price: 1.50 },
];

export const BUN_OPTIONS = [
  { id: "sesame", label: "Classic Sesame Bun", price: 0 },
  { id: "brioche", label: "Brioche Bun", price: 0.75 },
  { id: "lettuce-wrap", label: "Lettuce Wrap (No Bun)", price: 0 },
  { id: "gluten-free", label: "Gluten-Free Bun", price: 1.50 },
];

export const EXTRA_TOPPINGS = [
  { id: "extra-cheese", label: "Extra Cheese", price: 0.75 },
  { id: "bacon", label: "Bacon", price: 1.50 },
  { id: "fried-egg", label: "Fried Egg", price: 1.25 },
  { id: "mushrooms", label: "Sauteed Mushrooms", price: 1.00 },
  { id: "jalapenos", label: "Jalapenos", price: 0.50 },
  { id: "avocado", label: "Avocado", price: 1.50 },
];

// Free - removing something the burger normally comes with
export const REMOVE_OPTIONS = [
  { id: "no-onion", label: "No Onion" },
  { id: "no-pickles", label: "No Pickles" },
  { id: "no-lettuce", label: "No Lettuce" },
  { id: "no-tomato", label: "No Tomato" },
  { id: "no-cheese", label: "No Cheese" },
];

// Free - sauce selection
export const SAUCE_OPTIONS = [
  { id: "ketchup", label: "Ketchup" },
  { id: "mustard", label: "Mustard" },
  { id: "mayo", label: "Mayo" },
  { id: "bbq", label: "BBQ Sauce" },
  { id: "special", label: "Special Sauce" },
  { id: "spicy-mayo", label: "Spicy Mayo" },
];