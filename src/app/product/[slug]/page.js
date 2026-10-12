import Link from "next/link";
import { notFound } from "next/navigation";
import savedProducts from "@/data/products.json";
import { getProducts } from "@/lib/products";
import { banglaNumber, marketSummary, unitName } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";

export function generateStaticParams() {
  return savedProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = savedProducts.find((item) => item.slug === slug);
  return { title: product ? `${product.nameBn} — বাজারভিত্তিক দাম` : "পণ্য পাওয়া যায়নি" };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const { products, fallback } = await getProducts();
  const product = products.find((item) => item.slug === slug || String(item.id) === slug);
  if (!product) notFound();
  const summary = marketSummary(product.markets);
  const markets = [...product.markets].sort((a, b) => a.min - b.min);
  const difference = product.today - product.yesterday;

  return <div className="container detail-page">
    <nav className="breadcrumb" aria-label="অবস্থান"><Link href="/">হোম</Link><span aria-hidden="true">›</span><Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link><span aria-hidden="true">›</span><span>{product.nameBn}</span></nav>
    <section className="product-summary">
      <div className="summary-product"><span className="detail-emoji" aria-hidden="true">{product.image}</span><div><h1>{product.nameBn}</h1><div className="product-tags"><span>প্রতি {unitName(product.unit)}</span><span aria-hidden="true">·</span><Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link></div><p className="muted">{difference === 0 ? "গতকালের তুলনায় আজ দাম অপরিবর্তিত" : `গতকালের তুলনায় আজ দাম ${difference > 0 ? "বেড়েছে" : "কমেছে"} · ${banglaNumber(Math.abs(difference))} টাকা`}</p></div></div>
      <div className="summary-today"><p className="muted">আজকের দাম</p><strong>{banglaNumber(product.today)}</strong><p>টাকা / {unitName(product.unit)}</p><ChangeBadge change={product.change} /></div>
    </section>
    {fallback && <p className="data-notice">সরাসরি তথ্য এখন পাওয়া যাচ্ছে না। ১২ অক্টোবর ২০২৬-এ সংরক্ষিত API তথ্য দেখানো হচ্ছে।</p>}
    <section className="detail-section"><h2>দামের সারসংক্ষেপ</h2>{summary ? <div className="summary-grid"><article className="price-stat"><p className="muted">সর্বনিম্ন দাম</p><strong>{banglaNumber(summary.min)} টাকা</strong><p className="muted">সবচেয়ে কম দামের বাজার</p></article><article className="price-stat"><p className="muted">সর্বাধিক দাম</p><strong>{banglaNumber(summary.max)} টাকা</strong><p className="muted">সবচেয়ে বেশি দামের বাজার</p></article><article className="price-stat"><p className="muted">গড় দাম</p><strong>{banglaNumber(summary.average)} টাকা</strong><p className="muted">প্রতি {unitName(product.unit)}-এর হিসাবে</p></article></div> : <p className="empty-message">এই পণ্যের বাজারভিত্তিক তথ্য এখনো পাওয়া যায়নি।</p>}</section>
    <section className="detail-section"><h2>বাজারভিত্তিক আজকের দাম</h2>{markets.length > 0 && <div className="market-table-wrap" tabIndex={0} role="region" aria-label="বাজারভিত্তিক দামের তালিকা, ছোট পর্দায় পাশে সরিয়ে দেখুন"><table className="table market-table"><caption className="sr-only">{product.nameBn}: বাজারভিত্তিক সর্বনিম্ন, সর্বাধিক ও গড় দাম</caption><thead><tr><th scope="col">বাজার</th><th scope="col">বিভাগ</th><th scope="col">সর্বনিম্ন</th><th scope="col">সর্বাধিক</th><th scope="col">গড়</th></tr></thead><tbody>{markets.map((market) => <tr key={`${market.market}-${market.division}`}><th scope="row">{market.market}</th><td>{market.division}</td><td>{banglaNumber(market.min)} টাকা</td><td>{banglaNumber(market.max)} টাকা</td><td>{banglaNumber((market.min + market.max) / 2)} টাকা</td></tr>)}</tbody></table></div>}</section>
    <aside className="market-note"><strong>মনে রাখুন</strong><p>বাজার, পণ্যের মান ও সরবরাহ অনুযায়ী দাম পরিবর্তিত হতে পারে। গড় দাম বাজারগুলোর সর্বনিম্ন ও সর্বাধিক দামের মধ্যমান থেকে হিসাব করা হয়েছে।</p></aside>
    <Link href={`/category/${product.category}`} className="back-link">← {product.categoryNameBn}-এর সব পণ্য দেখুন</Link>
  </div>;
}
