"use client";

import { useState } from "react";
import { useProducts } from "@/components/ProductsProvider";
import ChangeBadge from "@/components/ChangeBadge";
import { banglaNumber, unitName } from "@/lib/format";

export default function PriceTicker() {
  const { products, loading, error } = useProducts();
  const [paused, setPaused] = useState(false);
  if (loading || error)
    return (
      <div className="price-ticker ticker-placeholder">
        {loading
          ? "আজকের বাজারের দাম লোড হচ্ছে…"
          : "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে"}
      </div>
    );
  return (
    <div className="price-ticker" aria-label="পণ্যের দামের চলমান তালিকা">
      <div className={`ticker-track ${paused ? "paused" : ""}`}>
        {[0, 1].map((copy) => (
          <div
            className="ticker-group"
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
          >
            {products.map((product) => (
              <span className="ticker-item" key={product.id}>
                <span aria-hidden="true">{product.image}</span>
                <strong>{product.nameBn}</strong>
                <span>
                  {banglaNumber(product.today)} টাকা/{unitName(product.unit)}
                </span>
                <ChangeBadge change={product.change} plain />
              </span>
            ))}
          </div>
        ))}
      </div>
      <button
        className="ticker-pause"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "দামের তালিকা চালু করুন" : "দামের তালিকা থামান"}
        aria-pressed={paused}
      >
        {paused ? "▶" : "Ⅱ"}
      </button>
    </div>
  );
}
