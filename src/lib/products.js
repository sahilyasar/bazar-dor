import { cacheLife } from "next/cache";
import savedProducts from "@/data/products.json";

const apiUrls = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export async function getProducts() {
  "use cache";
  cacheLife("minutes");

  for (const baseUrl of apiUrls) {
    try {
      const response = await fetch(`${baseUrl}/products`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) continue;
      const products = await response.json();
      const valid =
        Array.isArray(products) &&
        products.length > 0 &&
        products.every(
          (product) =>
            product.slug &&
            product.nameBn &&
            Number.isFinite(product.today) &&
            product.change &&
            Number.isFinite(product.change.pct) &&
            Array.isArray(product.markets),
        );
      if (valid) return { products, fallback: false };
    } catch {
      // Try the assignment's alternative API before using the saved API response.
    }
  }
  return { products: savedProducts, fallback: true };
}
