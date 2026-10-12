import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[1120px] max-[600px]:w-[calc(100%-2rem)] pt-10 pb-16">
      <div className="skeleton bg-[#e5ece5] motion-reduce:animate-none mb-8 h-12 w-[200px]" />
      <ProductSkeleton />
    </div>
  );
}
