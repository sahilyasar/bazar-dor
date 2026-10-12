"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import categories from "@/data/categories.json";

export function DateLabel() {
  const [date, setDate] = useState("");
  useEffect(() => {
    // Read the browser's current time after hydration to avoid a stale build date.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka" }).format(new Date()));
  }, []);
  return <span className="brand-date">{date || "নিত্যপ্রয়োজনীয় পণ্যের দাম"}</span>;
}

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="container header-top">
        <Link href="/" className="brand" aria-label="বাজার দর হোম পেজ">
          <span className="brand-icon"><Image src="/logo-icon.png" width={25} height={25} alt="" /></span>
          <span><strong>বাজার দর</strong><DateLabel /></span>
        </Link>
        <div className="auth-links">
          <Link href="/signin" className="btn btn-outline" aria-current={pathname === "/signin" ? "page" : undefined}>সাইন ইন</Link>
          <Link href="/signup" className="btn btn-primary" aria-current={pathname === "/signup" ? "page" : undefined}>সাইন আপ</Link>
        </div>
      </div>
      <nav className="container category-nav" aria-label="পণ্যের ক্যাটাগরি">
        {categories.map((category) => {
          const active = pathname === `/category/${category.slug}`;
          return <Link key={category.id} href={`/category/${category.slug}`} className={`nav-chip ${active ? "active" : ""}`} aria-current={active ? "page" : undefined}><span aria-hidden="true">{category.icon}</span>{category.nameBn}</Link>;
        })}
      </nav>
    </header>
  );
}
