"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext(null);

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fallback, setFallback] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/products", {
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error("পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
        const data = await response.json();
        setProducts(data.products);
        setFallback(data.fallback);
      } catch (err) {
        if (err.name !== "AbortError")
          setError("পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [attempt]);

  function retry() {
    setError("");
    setLoading(true);
    setAttempt(attempt + 1);
  }

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, fallback, retry }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
