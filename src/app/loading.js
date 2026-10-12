import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="container loading-page">
      <div className="skeleton loading-heading" />
      <ProductSkeleton />
    </div>
  );
}
