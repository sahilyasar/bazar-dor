"use client";

import { useProducts } from "@/components/ProductsProvider";

export default function DataNotice({ className = "" }) {
  const { error, fallback, retry } = useProducts();
  if (error)
    return (
      <div
        className={`mt-6 flex items-center justify-between gap-4 rounded-xl border border-[#d9dfb9] bg-[#f9faeb] px-4 py-3 max-[600px]:flex-col max-[600px]:items-start ${className}`}
        role="alert"
      >
        <p>{error}</p>
        <button
          className="btn disabled:opacity-50 focus-visible:outline-brand h-auto min-h-10 rounded-lg border px-[18px] py-[9px] text-sm font-semibold shadow-none motion-reduce:transition-none border-line bg-transparent text-ink hover:border-[#c6d4c6] hover:bg-[#e6ede6]"
          onClick={retry}
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  if (fallback)
    return (
      <p
        className={`mt-6 flex items-center justify-between gap-4 rounded-xl border border-[#d9dfb9] bg-[#f9faeb] px-4 py-3 max-[600px]:flex-col max-[600px]:items-start ${className}`}
        role="status"
      >
        সরাসরি তথ্য এখন পাওয়া যাচ্ছে না। ১২ অক্টোবর ২০২৬-এ সংরক্ষিত API তথ্য
        দেখানো হচ্ছে।
      </p>
    );
  return null;
}
