import React, { useState } from "react";
import "./homepage.css";
import { useStore } from "../StoreContext";
import Customize from "../customize/Customize";
import { BURGERS, SIDES, DRINKS, CATEGORY_EMOJI } from "../menuData";

const TABS = [
  { key: "BURGER", label: "Burgers", items: BURGERS },
  { key: "SIDE", label: "Sides", items: SIDES },
  { key: "DRINK", label: "Drinks", items: DRINKS },
];

function Home() {
  const { addToCart } = useStore();
  const [activeTab, setActiveTab] = useState("BURGER");
  const [customizingItem, setCustomizingItem] = useState(null);

  const activeItems = TABS.find((t) => t.key === activeTab).items;

  const handleQuickAdd = (item) => {
    addToCart({
      cartLineId: crypto.randomUUID(),
      itemId: item.id,
      name: item.name,
      category: item.category,
      image: item.image,
      basePrice: item.price,
      unitPrice: item.price,
      qty: 1,
      customizationSummary: null,
    });
  };

  return (
    <div className="home-container">
      <h1>Menu</h1>

      <div className="menu-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`menu-tab ${activeTab === t.key ? "active" : ""}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="food-grid">
        {activeItems.map((item) => (
          <div key={item.id} className="food-card">
            {item.image ? (
              <img src={item.image} alt={item.name} />
            ) : (
              <div className="food-placeholder">{CATEGORY_EMOJI[item.category]}</div>
            )}
            <h3>{item.name}</h3>
            <h4>{item.description}</h4>
            <p className="price">${item.price.toFixed(2)}</p>
            <div className="card-buttons">
              <button className="add-btn" onClick={() => handleQuickAdd(item)}>
                Add to Cart
              </button>
              {item.category === "BURGER" && (
                <button className="details-btn" onClick={() => setCustomizingItem(item)}>
                  Customize
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {customizingItem && (
        <Customize
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAdd={addToCart}
        />
      )}
    </div>
  );
}

export default Home;