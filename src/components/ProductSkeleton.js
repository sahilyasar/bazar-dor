export default function ProductSkeleton({ count = 6 }) {
  return (
    <div
      className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1"
      role="status"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
    >
      <span className="sr-only">পণ্যের তথ্য লোড হচ্ছে…</span>
      {Array.from({ length: count }, (_, index) => (
        <div
          className="block min-h-[138px] rounded-2xl border border-line bg-surface p-4 transition-[border-color,transform] duration-200 motion-reduce:transition-none"
          key={index}
          aria-hidden="true"
        >
          <div className="flex min-h-12 items-center gap-3">
            <div className="skeleton bg-[#e5ece5] motion-reduce:animate-none size-12 rounded-xl" />
            <div>
              <div className="skeleton bg-[#e5ece5] motion-reduce:animate-none mb-2 h-4 w-[130px]" />
              <div className="skeleton bg-[#e5ece5] motion-reduce:animate-none h-3 w-[70px]" />
            </div>
          </div>
          <div className="mt-3 flex items-end justify-between gap-2">
            <div className="skeleton bg-[#e5ece5] motion-reduce:animate-none h-[30px] w-[85px]" />
            <div className="skeleton bg-[#e5ece5] motion-reduce:animate-none h-6 w-[58px] rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
