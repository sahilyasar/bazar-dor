"use client";

import { useState } from "react";
import categories from "@/data/categories.json";
import { useProducts } from "@/components/ProductsProvider";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import DataNotice from "@/components/DataNotice";
import { banglaNumber, topMovers } from "@/lib/format";

function PriceSection({ title, direction, products, loading }) {
  return <section className="products-section"><h2><span className={`section-arrow ${direction}`} aria-hidden="true">{direction === "up" ? "▲" : "▼"}</span>{title}</h2>{loading ? <ProductSkeleton /> : products.length ? <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="empty-message">আজ এই তালিকায় কোনো পণ্য নেই।</p>}</section>;
}

export default function HomeProducts() {
  const { products, loading, error } = useProducts();
  const [category, setCategory] = useState("all");
  const shown = category === "all" ? products : products.filter((product) => product.category === category);
  return <>
    <DataNotice />
    {!error && <>
      <PriceSection title="আজ দাম বেড়েছে" direction="up" products={topMovers(products, "up")} loading={loading} />
      <PriceSection title="আজ দাম কমেছে" direction="down" products={topMovers(products, "down")} loading={loading} />
      <section id="সব-পণ্য" className="products-section all-products">
        <h2>সব পণ্য</h2>
        <div className="catalog-toolbar"><p className="muted" aria-live="polite">{loading ? "পণ্যের তথ্য লোড হচ্ছে…" : `মোট ${banglaNumber(shown.length)}টি পণ্য দেখানো হচ্ছে`}</p><div className="filter-chips" aria-label="ক্যাটাগরি অনুযায়ী পণ্য বাছাই"><button className={`filter-chip ${category === "all" ? "selected" : ""}`} aria-pressed={category === "all"} onClick={() => setCategory("all")}>সব</button>{categories.map((item) => <button key={item.slug} className={`filter-chip ${category === item.slug ? "selected" : ""}`} aria-pressed={category === item.slug} onClick={() => setCategory(item.slug)}>{item.nameBn}</button>)}</div></div>
        {loading ? <ProductSkeleton count={9} /> : shown.length ? <div className="product-grid">{shown.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="empty-message">এই ক্যাটাগরিতে কোনো পণ্য নেই।</p>}
      </section>
    </>}
  </>;
}
