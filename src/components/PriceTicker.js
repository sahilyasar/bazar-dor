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
      <div className="group relative h-[37px] overflow-hidden border-b border-line bg-surface grid place-items-center text-xs text-muted">
        {loading
          ? "আজকের বাজারের দাম লোড হচ্ছে…"
          : "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে"}
      </div>
    );
  return (
    <div
      className="group relative h-[37px] overflow-hidden border-b border-line bg-surface"
      aria-label="পণ্যের দামের চলমান তালিকা"
    >
      <div
        className={`flex w-max animate-ticker group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none ${paused ? "[animation-play-state:paused]" : ""}`}
      >
        {[0, 1].map((copy) => (
          <div
            className="flex"
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
          >
            {products.map((product) => (
              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 leading-5 whitespace-nowrap"
                key={product.id}
              >
                <span aria-hidden="true">{product.image}</span>
                <strong className="font-medium">{product.nameBn}</strong>
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
        className="absolute top-0 right-0 h-9 w-8 cursor-pointer border-0 border-l border-line bg-surface text-brand"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "দামের তালিকা চালু করুন" : "দামের তালিকা থামান"}
        aria-pressed={paused}
      >
        {paused ? "▶" : "Ⅱ"}
      </button>
    </div>
  );
}
