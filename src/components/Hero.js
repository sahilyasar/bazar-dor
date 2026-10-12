import Image from "next/image";
import { DateLabel } from "@/components/Navbar";

export default function Hero() {
  return (
    <section className="hero-banner" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="hero-eyebrow">
          <span className="date-dot" />
          <DateLabel />
        </div>
        <h1 id="hero-title">আজকের বাজারের দাম এক নজরে</h1>
        <p>
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a href="#সব-পণ্য" className="btn btn-primary">
          সব পণ্য দেখুন <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="hero-art">
        <Image
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
