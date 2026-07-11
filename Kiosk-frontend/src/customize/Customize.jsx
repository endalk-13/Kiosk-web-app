import React, { useMemo, useState } from "react";
import "./customize.css";
import {
  PATTY_OPTIONS,
  BUN_OPTIONS,
  EXTRA_TOPPINGS,
  REMOVE_OPTIONS,
  SAUCE_OPTIONS,
} from "./customizationOptions";

function toggleInSet(set, id) {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

function Customize({ item, onClose, onAdd }) {
  const [pattyId, setPattyId] = useState(PATTY_OPTIONS[0].id);
  const [bunId, setBunId] = useState(BUN_OPTIONS[0].id);
  const [toppings, setToppings] = useState(new Set());
  const [removed, setRemoved] = useState(new Set());
  const [sauces, setSauces] = useState(new Set());
  const [notes, setNotes] = useState("");
  const [qty, setQty] = useState(1);

  const patty = PATTY_OPTIONS.find((p) => p.id === pattyId);
  const bun = BUN_OPTIONS.find((b) => b.id === bunId);
  const toppingItems = EXTRA_TOPPINGS.filter((t) => toppings.has(t.id));

  const unitPrice = useMemo(() => {
    const addOns = patty.price + bun.price + toppingItems.reduce((sum, t) => sum + t.price, 0);
    return item.price + addOns;
  }, [item.price, patty, bun, toppingItems]);

  const summary = useMemo(() => {
    const parts = [];
    if (patty.price !== 0 || patty.id !== PATTY_OPTIONS[0].id) parts.push(patty.label);
    if (bun.id !== BUN_OPTIONS[0].id) parts.push(bun.label);
    toppingItems.forEach((t) => parts.push(`+${t.label}`));
    REMOVE_OPTIONS.filter((r) => removed.has(r.id)).forEach((r) => parts.push(r.label));
    SAUCE_OPTIONS.filter((s) => sauces.has(s.id)).forEach((s) => parts.push(s.label));
    if (notes.trim()) parts.push(`Note: ${notes.trim()}`);
    return parts.join(", ");
  }, [patty, bun, toppingItems, removed, sauces, notes]);

  const handleAdd = () => {
    onAdd({
      cartLineId: crypto.randomUUID(),
      itemId: item.id,
      name: item.name,
      category: item.category,
      image: item.image,
      basePrice: item.price,
      unitPrice,
      qty,
      customizationSummary: summary || null,
    });
    onClose();
  };

  return (
    <div className="customize-overlay" onClick={onClose}>
      <div className="customize-modal" onClick={(e) => e.stopPropagation()}>
        <div className="customize-header">
          <h2>Customize: {item.name}</h2>
          <button className="customize-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="customize-body">
          <section className="customize-group">
            <h3>Choose your patty</h3>
            {PATTY_OPTIONS.map((opt) => (
              <label key={opt.id} className="customize-option">
                <input
                  type="radio"
                  name="patty"
                  checked={pattyId === opt.id}
                  onChange={() => setPattyId(opt.id)}
                />
                {opt.label} {opt.price > 0 && <span className="option-price">+${opt.price.toFixed(2)}</span>}
              </label>
            ))}
          </section>

          <section className="customize-group">
            <h3>Choose your bun</h3>
            {BUN_OPTIONS.map((opt) => (
              <label key={opt.id} className="customize-option">
                <input
                  type="radio"
                  name="bun"
                  checked={bunId === opt.id}
                  onChange={() => setBunId(opt.id)}
                />
                {opt.label} {opt.price > 0 && <span className="option-price">+${opt.price.toFixed(2)}</span>}
              </label>
            ))}
          </section>

          <section className="customize-group">
            <h3>Extra toppings</h3>
            {EXTRA_TOPPINGS.map((opt) => (
              <label key={opt.id} className="customize-option">
                <input
                  type="checkbox"
                  checked={toppings.has(opt.id)}
                  onChange={() => setToppings((prev) => toggleInSet(prev, opt.id))}
                />
                {opt.label} <span className="option-price">+${opt.price.toFixed(2)}</span>
              </label>
            ))}
          </section>

          <section className="customize-group">
            <h3>Remove anything?</h3>
            {REMOVE_OPTIONS.map((opt) => (
              <label key={opt.id} className="customize-option">
                <input
                  type="checkbox"
                  checked={removed.has(opt.id)}
                  onChange={() => setRemoved((prev) => toggleInSet(prev, opt.id))}
                />
                {opt.label}
              </label>
            ))}
          </section>

          <section className="customize-group">
            <h3>Sauces</h3>
            {SAUCE_OPTIONS.map((opt) => (
              <label key={opt.id} className="customize-option">
                <input
                  type="checkbox"
                  checked={sauces.has(opt.id)}
                  onChange={() => setSauces((prev) => toggleInSet(prev, opt.id))}
                />
                {opt.label}
              </label>
            ))}
          </section>

          <section className="customize-group">
            <h3>Special instructions</h3>
            <textarea
              className="customize-notes"
              placeholder="e.g. cut in half, extra napkins..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={200}
            />
          </section>
        </div>

        <div className="customize-footer">
          <div className="customize-qty">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
          <button className="customize-add-btn" onClick={handleAdd}>
            Add to Cart - ${(unitPrice * qty).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Customize;