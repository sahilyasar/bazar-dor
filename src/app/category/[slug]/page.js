import { notFound } from "next/navigation";
import categories from "@/data/categories.json";
import CategoryProducts from "@/components/CategoryProducts";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  return {
    title: category
      ? `${category.nameBn} — আজকের দাম`
      : "ক্যাটাগরি পাওয়া যায়নি",
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  return (
    <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[1120px] max-[600px]:w-[calc(100%-2rem)] pt-10 pb-16">
      <CategoryProducts key={slug} category={category} />
    </div>
  );
}
