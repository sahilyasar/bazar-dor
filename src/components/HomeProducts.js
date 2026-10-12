"use client";

import { useState } from "react";
import categories from "@/data/categories.json";
import { useProducts } from "@/components/ProductsProvider";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import DataNotice from "@/components/DataNotice";
import { banglaNumber, topMovers } from "@/lib/format";

function PriceSection({ title, direction, products, loading }) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 flex items-center gap-2 text-xl leading-7 font-bold">
        <span
          className={`text-base ${direction === "up" ? "text-[#148644]" : "text-[#c63639]"}`}
          aria-hidden="true"
        >
          {direction === "up" ? "▲" : "▼"}
        </span>
        {title}
      </h2>
      {loading ? (
        <ProductSkeleton />
      ) : products.length ? (
        <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-line p-6 text-muted">
          আজ এই তালিকায় কোনো পণ্য নেই।
        </p>
      )}
    </section>
  );
}

export default function HomeProducts() {
  const { products, loading, error } = useProducts();
  const [category, setCategory] = useState("all");
  const shown =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);
  return (
    <>
      <DataNotice />
      {!error && (
        <>
          <PriceSection
            title="আজ দাম বেড়েছে"
            direction="up"
            products={topMovers(products, "up")}
            loading={loading}
          />
          <PriceSection
            title="আজ দাম কমেছে"
            direction="down"
            products={topMovers(products, "down")}
            loading={loading}
          />
          <section id="সব-পণ্য" className="mt-8">
            <h2 className="mb-4 flex items-center gap-2 text-xl leading-7 font-bold">
              সব পণ্য
            </h2>
            <div className="mb-4 flex items-center justify-between gap-4 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-2">
              <p className="text-muted" aria-live="polite">
                {loading
                  ? "পণ্যের তথ্য লোড হচ্ছে…"
                  : `মোট ${banglaNumber(shown.length)}টি পণ্য দেখানো হচ্ছে`}
              </p>
              <div
                className="flex flex-wrap gap-1"
                aria-label="ক্যাটাগরি অনুযায়ী পণ্য বাছাই"
              >
                <button
                  className={`cursor-pointer rounded-full border px-2.5 py-[3px] text-xs ${category === "all" ? "border-brand bg-brand text-white" : "border-line bg-transparent hover:border-[#a9c9ad]"}`}
                  aria-pressed={category === "all"}
                  onClick={() => setCategory("all")}
                >
                  সব
                </button>
                {categories.map((item) => (
                  <button
                    key={item.slug}
                    className={`cursor-pointer rounded-full border px-2.5 py-[3px] text-xs ${category === item.slug ? "border-brand bg-brand text-white" : "border-line bg-transparent hover:border-[#a9c9ad]"}`}
                    aria-pressed={category === item.slug}
                    onClick={() => setCategory(item.slug)}
                  >
                    {item.nameBn}
                  </button>
                ))}
              </div>
            </div>
            {loading ? (
              <ProductSkeleton count={9} />
            ) : shown.length ? (
              <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
                {shown.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-line p-6 text-muted">
                এই ক্যাটাগরিতে কোনো পণ্য নেই।
              </p>
            )}
          </section>
        </>
      )}
    </>
  );
}
