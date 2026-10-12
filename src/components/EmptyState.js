import Link from "next/link";

export default function EmptyState({
  title = "পেজটি খুঁজে পাওয়া যায়নি",
  description = "আপনি যে পেজটি খুঁজছেন, সেটি নেই অথবা ঠিকানাটি সঠিক নয়।",
}) {
  return (
    <div className="flex min-h-[520px] flex-col items-center justify-center px-5 py-20 text-center">
      <span className="mb-4 text-5xl" aria-hidden="true">
        🧺
      </span>
      <span className="text-5xl leading-none font-bold text-brand">৪০৪</span>
      <h1 className="mt-4 mb-2 text-[28px] font-bold">{title}</h1>
      <p className="mb-6 text-muted">{description}</p>
      <Link
        href="/"
        className="btn disabled:opacity-50 focus-visible:outline-brand h-auto min-h-10 rounded-lg border px-[18px] py-[9px] text-sm font-semibold shadow-none motion-reduce:transition-none border-brand bg-brand text-white hover:border-[#067334] hover:bg-[#067334]"
      >
        হোম পেজে ফিরে যান <span aria-hidden="true">←</span>
      </Link>
    </div>
  );
}
