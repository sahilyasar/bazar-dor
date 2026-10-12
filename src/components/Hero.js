import Image from "next/image";
import { DateLabel } from "@/components/Navbar";

export default function Hero() {
  return (
    <section
      className="flex min-h-[283px] items-center justify-between rounded-3xl border border-line bg-surface p-4 max-[600px]:flex-col max-[600px]:items-start max-[600px]:p-6"
      aria-labelledby="hero-title"
    >
      <div className="max-w-xl max-[900px]:max-w-[60%] max-[600px]:max-w-full">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-page px-3 py-1">
          <span className="size-1.5 rounded-full bg-brand" />
          <DateLabel className="block min-h-4 text-sm max-[600px]:text-xs" />
        </div>
        <h1
          id="hero-title"
          className="my-4 text-4xl leading-tight font-bold max-[900px]:text-[30px]"
        >
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mb-[26px] text-base leading-normal text-muted max-[600px]:mb-5 max-[600px]:text-sm">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a
          href="#সব-পণ্য"
          className="gap-3.5 btn disabled:opacity-50 focus-visible:outline-brand h-auto min-h-10 rounded-lg border px-[18px] py-[9px] text-sm font-semibold shadow-none motion-reduce:transition-none border-brand bg-brand text-white hover:border-[#067334] hover:bg-[#067334]"
        >
          সব পণ্য দেখুন <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="flex w-[36%] items-center justify-center max-[600px]:mt-3 max-[600px]:w-full">
        <Image
          className="h-auto w-60 max-[600px]:w-[180px]"
          src="/bazar-hero.png"
          width={270}
          height={270}
          alt="তাজা ফল ও সবজিতে ভরা বাজারের ঝুড়ি"
          priority
        />
      </div>
    </section>
  );
}
