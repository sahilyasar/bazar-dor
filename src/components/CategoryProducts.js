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
      <section className="flex items-center gap-4 pb-8">
        <span
          className="grid size-[52px] place-items-center rounded-2xl border border-line bg-surface text-[28px]"
          aria-hidden="true"
        >
          {category.icon}
        </span>
        <div>
          <h1 className="mb-1 text-[30px] font-bold max-[600px]:text-[26px]">
            {category.nameBn}
          </h1>
          <p className="text-base text-muted max-[600px]:text-sm">
            {loading
              ? "আজকের দাম ও পরিবর্তন"
              : `${banglaNumber(shown.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}
          </p>
        </div>
      </section>
      <div className="mb-6 flex items-center justify-between gap-4 max-[600px]:flex-col max-[600px]:items-start">
        <p className="text-muted" aria-live="polite">
          {loading
            ? "পণ্যের তথ্য লোড হচ্ছে…"
            : `মোট ${banglaNumber(shown.length)}টি পণ্য দেখানো হচ্ছে`}
        </p>
        <label className="flex items-center gap-2.5 whitespace-nowrap">
          সাজান{" "}
          <select
            className="select h-9 min-h-9 w-auto min-w-[100px] rounded-lg border-line bg-surface text-xs"
            value={order}
            onChange={(event) => setOrder(event.target.value)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      <DataNotice className="mb-6" />
      {!error &&
        (loading ? (
          <ProductSkeleton />
        ) : shown.length ? (
          <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
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
