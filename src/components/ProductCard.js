import Link from "next/link";
import ChangeBadge from "@/components/ChangeBadge";
import { banglaNumber, unitName } from "@/lib/format";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="hover:-translate-y-0.5 hover:border-[#a9c9ad] block min-h-[138px] rounded-2xl border border-line bg-surface p-4 transition-[border-color,transform] duration-200 motion-reduce:transition-none"
    >
      <div className="flex min-h-12 items-center gap-3">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-xl bg-page text-2xl"
          aria-hidden="true"
        >
          {product.image}
        </span>
        <div>
          <h3 className="mb-0.5 text-base font-semibold">{product.nameBn}</h3>
          <p className="text-xs text-muted">প্রতি {unitName(product.unit)}</p>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs leading-4 text-muted">আজকের দাম</p>
          <p className="text-xl leading-7 font-bold">
            {banglaNumber(product.today)}{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <ChangeBadge change={product.change} className="mb-1" />
      </div>
    </Link>
  );
}
