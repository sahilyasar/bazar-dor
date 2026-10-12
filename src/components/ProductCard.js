import Link from "next/link";
import ChangeBadge from "@/components/ChangeBadge";
import { banglaNumber, unitName } from "@/lib/format";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.slug}`} className="product-card">
      <div className="product-top">
        <span className="product-emoji" aria-hidden="true">
          {product.image}
        </span>
        <div>
          <h3>{product.nameBn}</h3>
          <p className="muted">প্রতি {unitName(product.unit)}</p>
        </div>
      </div>
      <div className="product-bottom">
        <div>
          <p className="price-label muted">আজকের দাম</p>
          <p className="product-price">
            {banglaNumber(product.today)} <span>টাকা</span>
          </p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
