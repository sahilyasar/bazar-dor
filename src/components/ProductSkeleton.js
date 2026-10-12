export default function ProductSkeleton({ count = 6 }) {
  return <div className="product-grid" role="status" aria-label="পণ্যের তথ্য লোড হচ্ছে">
    <span className="sr-only">পণ্যের তথ্য লোড হচ্ছে…</span>
    {Array.from({ length: count }, (_, index) => <div className="product-card skeleton-card" key={index} aria-hidden="true"><div className="product-top"><div className="skeleton skeleton-icon" /><div><div className="skeleton skeleton-title" /><div className="skeleton skeleton-unit" /></div></div><div className="product-bottom"><div className="skeleton skeleton-price" /><div className="skeleton skeleton-badge" /></div></div>)}
  </div>;
}
