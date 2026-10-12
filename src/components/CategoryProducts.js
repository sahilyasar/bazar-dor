"use client";

import { useState } from "react";
import { useProducts } from "@/components/ProductsProvider";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import EmptyState from "@/components/EmptyState";
import DataNotice from "@/components/DataNotice";
import { banglaNumber, sortProducts } from "@/lib/format";

export default function CategoryProducts({ category }) {
  const { products, loading, error } = useProducts();
  const [order, setOrder] = useState("default");
  const shown = sortProducts(
    products.filter((product) => product.category === category.slug),
    order,
  );
  return (
    <>
      <section className="category-heading">
        <span className="category-icon" aria-hidden="true">
          {category.icon}
        </span>
        <div>
          <h1>{category.nameBn}</h1>
          <p className="muted">
            {loading
              ? "আজকের দাম ও পরিবর্তন"
              : `${banglaNumber(shown.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}
          </p>
        </div>
      </section>
      <div className="category-toolbar">
        <p className="muted" aria-live="polite">
          {loading
            ? "পণ্যের তথ্য লোড হচ্ছে…"
            : `মোট ${banglaNumber(shown.length)}টি পণ্য দেখানো হচ্ছে`}
        </p>
        <label className="sort-control">
          সাজান{" "}
          <select
            className="select"
            value={order}
            onChange={(event) => setOrder(event.target.value)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      <DataNotice />
      {!error &&
        (loading ? (
          <ProductSkeleton />
        ) : shown.length ? (
          <div className="product-grid">
            {shown.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
            description="অন্য ক্যাটাগরির পণ্য দেখতে হোম পেজে ফিরে যান।"
          />
        ))}
    </>
  );
}
