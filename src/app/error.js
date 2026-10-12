"use client";

import Link from "next/link";

export default function ErrorPage({ reset }) {
  return (
    <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[1120px] max-[600px]:w-[calc(100%-2rem)] flex min-h-[520px] flex-col items-center justify-center px-5 py-20 text-center">
      <span className="mb-4 text-5xl" aria-hidden="true">
        🧺
      </span>
      <h1 className="mt-4 mb-2 text-[28px] font-bold">
        তথ্য দেখাতে সমস্যা হয়েছে
      </h1>
      <p className="mb-6 text-muted">একটু পরে আবার চেষ্টা করুন।</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="btn disabled:opacity-50 focus-visible:outline-brand h-auto min-h-10 rounded-lg border px-[18px] py-[9px] text-sm font-semibold shadow-none motion-reduce:transition-none border-brand bg-brand text-white hover:border-[#067334] hover:bg-[#067334]"
        >
          আবার চেষ্টা করুন
        </button>
        <Link
          href="/"
          className="btn disabled:opacity-50 focus-visible:outline-brand h-auto min-h-10 rounded-lg border px-[18px] py-[9px] text-sm font-semibold shadow-none motion-reduce:transition-none border-line bg-transparent text-ink hover:border-[#c6d4c6] hover:bg-[#e6ede6]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
