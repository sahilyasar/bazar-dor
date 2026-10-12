export default function AuthSkeleton() {
  return (
    <div
      className="mx-auto mt-10 mb-18 w-[calc(100%-2rem)] max-w-[416px]"
      role="status"
      aria-label="অ্যাকাউন্টের তথ্য লোড হচ্ছে"
    >
      <span className="sr-only">লোড হচ্ছে…</span>
      <div className="skeleton bg-[#e5ece5] motion-reduce:animate-none mb-8 h-12 w-[200px]" />
      <div
        className="rounded-2xl border border-line bg-surface p-6 max-[600px]:p-5"
        aria-hidden="true"
      >
        <div className="skeleton bg-[#e5ece5] motion-reduce:animate-none mb-4 h-[42px] rounded-lg" />
        <div className="skeleton bg-[#e5ece5] motion-reduce:animate-none mb-4 h-[42px] rounded-lg" />
        <div className="skeleton bg-[#e5ece5] motion-reduce:animate-none mb-4 h-[42px] rounded-lg" />
      </div>
    </div>
  );
}
