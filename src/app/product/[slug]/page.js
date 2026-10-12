import Link from "next/link";
import { notFound } from "next/navigation";
import savedProducts from "@/data/products.json";
import { getProducts } from "@/lib/products";
import { banglaNumber, marketSummary, unitName } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";
import { requireSession } from "@/lib/session";

export function generateStaticParams() {
  return savedProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = savedProducts.find((item) => item.slug === slug);
  return {
    title: product
      ? `${product.nameBn} — বাজারভিত্তিক দাম`
      : "পণ্য পাওয়া যায়নি",
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const { products, fallback } = await getProducts();
  const product = products.find(
    (item) => item.slug === slug || String(item.id) === slug,
  );
  if (!product) notFound();
  await requireSession();
  const summary = marketSummary(product.markets);
  const markets = [...product.markets].sort((a, b) => a.min - b.min);
  const difference = product.today - product.yesterday;

  return (
    <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[1120px] max-[600px]:w-[calc(100%-2rem)] pt-6 pb-12">
      <nav
        className="mb-10 flex flex-wrap items-center gap-3 text-xs text-muted"
        aria-label="অবস্থান"
      >
        <Link className="hover:text-brand" href="/">
          হোম
        </Link>
        <span aria-hidden="true">›</span>
        <Link
          className="hover:text-brand"
          href={`/category/${product.category}`}
        >
          {product.categoryNameBn}
        </Link>
        <span aria-hidden="true">›</span>
        <span>{product.nameBn}</span>
      </nav>
      <section className="flex items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-6 max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:p-5">
        <div className="flex items-center gap-5 max-[600px]:gap-3">
          <span
            className="grid size-[72px] shrink-0 place-items-center rounded-2xl bg-page text-[42px] max-[600px]:size-14 max-[600px]:text-[32px]"
            aria-hidden="true"
          >
            {product.image}
          </span>
          <div>
            <h1 className="mb-1.5 text-[30px] font-bold max-[600px]:text-[25px]">
              {product.nameBn}
            </h1>
            <div className="mb-3.5 flex items-center gap-2">
              <span>প্রতি {unitName(product.unit)}</span>
              <span aria-hidden="true">·</span>
              <Link
                className="rounded-md bg-[#e6f1e8] px-2 py-0.5 text-xs text-brand"
                href={`/category/${product.category}`}
              >
                {product.categoryNameBn}
              </Link>
            </div>
            <p className="text-muted">
              {difference === 0
                ? "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
                : `গতকালের তুলনায় আজ দাম ${difference > 0 ? "বেড়েছে" : "কমেছে"} · ${banglaNumber(Math.abs(difference))} টাকা`}
            </p>
          </div>
        </div>
        <div className="min-w-[150px] rounded-xl bg-page px-5 py-4 max-[600px]:flex max-[600px]:flex-wrap max-[600px]:items-center max-[600px]:gap-x-3 max-[600px]:gap-y-2">
          <p className="mb-[3px] text-xs text-muted">আজকের দাম</p>
          <strong className="mb-1 block text-4xl leading-[1.2] font-bold max-[600px]:m-0 max-[600px]:text-[28px]">
            {banglaNumber(product.today)}
          </strong>
          <p className="mb-[3px] text-xs">টাকা / {unitName(product.unit)}</p>
          <ChangeBadge
            change={product.change}
            className="mt-2 bg-surface max-[600px]:mt-0 max-[600px]:ml-auto"
          />
        </div>
      </section>
      {fallback && (
        <p className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-[#d9dfb9] bg-[#f9faeb] px-4 py-3 max-[600px]:flex-col max-[600px]:items-start">
          সরাসরি তথ্য এখন পাওয়া যাচ্ছে না। ১২ অক্টোবর ২০২৬-এ সংরক্ষিত API তথ্য
          দেখানো হচ্ছে।
        </p>
      )}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>
        {summary ? (
          <div className="grid grid-cols-3 gap-4 max-[600px]:grid-cols-1">
            <article className="rounded-2xl border border-line bg-surface px-6 py-4">
              <p className="text-xs text-muted">সর্বনিম্ন দাম</p>
              <strong className="mb-2 block text-2xl font-bold">
                {banglaNumber(summary.min)} টাকা
              </strong>
              <p className="text-xs text-muted">সবচেয়ে কম দামের বাজার</p>
            </article>
            <article className="rounded-2xl border border-line bg-surface px-6 py-4">
              <p className="text-xs text-muted">সর্বাধিক দাম</p>
              <strong className="mb-2 block text-2xl font-bold">
                {banglaNumber(summary.max)} টাকা
              </strong>
              <p className="text-xs text-muted">সবচেয়ে বেশি দামের বাজার</p>
            </article>
            <article className="rounded-2xl border border-line bg-surface px-6 py-4">
              <p className="text-xs text-muted">গড় দাম</p>
              <strong className="mb-2 block text-2xl font-bold">
                {banglaNumber(summary.average)} টাকা
              </strong>
              <p className="text-xs text-muted">
                প্রতি {unitName(product.unit)}-এর হিসাবে
              </p>
            </article>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-line p-6 text-muted">
            এই পণ্যের বাজারভিত্তিক তথ্য এখনো পাওয়া যায়নি।
          </p>
        )}
      </section>
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {markets.length > 0 && (
          <div
            className="overflow-x-auto rounded-2xl border border-line bg-surface"
            tabIndex={0}
            role="region"
            aria-label="বাজারভিত্তিক দামের তালিকা, ছোট পর্দায় পাশে সরিয়ে দেখুন"
          >
            <table className="table w-full min-w-[620px] border-collapse">
              <caption className="sr-only">
                {product.nameBn}: বাজারভিত্তিক সর্বনিম্ন, সর্বাধিক ও গড় দাম
              </caption>
              <thead className="bg-[#e8efe8] text-muted">
                <tr>
                  <th
                    className="border-b border-line px-4 py-[13px] text-sm font-medium"
                    scope="col"
                  >
                    বাজার
                  </th>
                  <th
                    className="border-b border-line px-4 py-[13px] text-sm font-medium"
                    scope="col"
                  >
                    বিভাগ
                  </th>
                  <th
                    className="border-b border-line px-4 py-[13px] text-sm font-medium text-right whitespace-nowrap"
                    scope="col"
                  >
                    সর্বনিম্ন
                  </th>
                  <th
                    className="border-b border-line px-4 py-[13px] text-sm font-medium text-right whitespace-nowrap"
                    scope="col"
                  >
                    সর্বাধিক
                  </th>
                  <th
                    className="border-b border-line px-4 py-[13px] text-sm font-medium text-right whitespace-nowrap"
                    scope="col"
                  >
                    গড়
                  </th>
                </tr>
              </thead>
              <tbody>
                {markets.map((market) => (
                  <tr
                    className="hover:bg-page last:[&>*]:border-b-0"
                    key={`${market.market}-${market.division}`}
                  >
                    <th
                      className="border-b border-line px-4 py-[13px] text-sm font-medium"
                      scope="row"
                    >
                      {market.market}
                    </th>
                    <td className="border-b border-line px-4 py-[13px] text-sm">
                      {market.division}
                    </td>
                    <td className="border-b border-line px-4 py-[13px] text-sm text-right whitespace-nowrap">
                      {banglaNumber(market.min)} টাকা
                    </td>
                    <td className="border-b border-line px-4 py-[13px] text-sm text-right whitespace-nowrap">
                      {banglaNumber(market.max)} টাকা
                    </td>
                    <td className="border-b border-line px-4 py-[13px] text-sm text-right whitespace-nowrap">
                      {banglaNumber((market.min + market.max) / 2)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <aside className="mt-6 rounded-xl border border-dashed border-line px-5 py-4 text-xs text-muted">
        <strong className="text-ink">মনে রাখুন</strong>
        <p className="mt-1">
          বাজার, পণ্যের মান ও সরবরাহ অনুযায়ী দাম পরিবর্তিত হতে পারে। গড় দাম
          বাজারগুলোর সর্বনিম্ন ও সর্বাধিক দামের মধ্যমান থেকে হিসাব করা হয়েছে।
        </p>
      </aside>
      <Link
        href={`/category/${product.category}`}
        className="mt-6 inline-block text-brand"
      >
        ← {product.categoryNameBn}-এর সব পণ্য দেখুন
      </Link>
    </div>
  );
}
