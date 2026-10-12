"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import categories from "@/data/categories.json";
import { authClient } from "@/lib/auth-client";
import LogoutButton from "@/components/LogoutButton";

export function DateLabel({
  className = "block min-h-4 text-xs max-[600px]:text-[10px]",
}) {
  const [date, setDate] = useState("");
  useEffect(() => {
    // Read the browser's current time after hydration to avoid a stale build date.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(
      new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }).format(new Date()),
    );
  }, []);
  return (
    <span className={className}>{date || "নিত্যপ্রয়োজনীয় পণ্যের দাম"}</span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[1120px] max-[600px]:w-[calc(100%-2rem)] flex h-[68px] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-ink"
          aria-label="বাজার দর হোম পেজ"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-brand max-[600px]:size-[34px]">
            <Image src="/logo-icon.png" width={25} height={25} alt="" />
          </span>
          <span>
            <strong className="block text-xl leading-[1.4] tracking-[-0.5px] max-[600px]:text-lg">
              বাজার দর
            </strong>
            <DateLabel />
          </span>
        </Link>
        <div className="flex gap-2">
          {isPending ? (
            <div
              className="skeleton bg-[#e5ece5] motion-reduce:animate-none h-9 w-[110px] rounded-lg"
              role="status"
              aria-label="অ্যাকাউন্টের তথ্য লোড হচ্ছে"
            />
          ) : session ? (
            <>
              <details className="relative">
                <summary className="flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
                  <span
                    className="grid size-9 place-items-center rounded-full bg-[#dfede2] font-semibold text-brand"
                    aria-hidden="true"
                  >
                    {session.user.name.charAt(0)}
                  </span>
                  <span className="max-w-[140px] truncate max-[600px]:max-w-20">
                    {session.user.name}
                  </span>
                  <span aria-hidden="true">▾</span>
                </summary>
                <div className="absolute right-0 top-[calc(100%+12px)] z-20 w-[220px] rounded-xl border border-line bg-surface p-1.5 shadow-[0_8px_20px_#1d271f12]">
                  <Link
                    className="block w-full rounded-md px-3 py-2.5 text-left hover:bg-page"
                    href="/profile"
                    onClick={(event) =>
                      event.currentTarget
                        .closest("details")
                        .removeAttribute("open")
                    }
                  >
                    আমার প্রোফাইল
                  </Link>
                  <Link
                    className="block w-full rounded-md px-3 py-2.5 text-left hover:bg-page"
                    href="/profile/update"
                    onClick={(event) =>
                      event.currentTarget
                        .closest("details")
                        .removeAttribute("open")
                    }
                  >
                    তথ্য আপডেট
                  </Link>
                  <LogoutButton className="block w-full cursor-pointer rounded-md border-0 bg-transparent px-3 py-2.5 text-left text-[#c63639] hover:bg-page disabled:cursor-not-allowed" />
                </div>
              </details>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="btn disabled:opacity-50 focus-visible:outline-brand max-[600px]:min-h-[34px] max-[600px]:px-2.5 max-[600px]:py-2 max-[600px]:text-xs h-auto min-h-10 rounded-lg border px-[18px] py-[9px] text-sm font-semibold shadow-none motion-reduce:transition-none border-line bg-transparent text-ink hover:border-[#c6d4c6] hover:bg-[#e6ede6]"
                aria-current={pathname === "/signin" ? "page" : undefined}
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn disabled:opacity-50 focus-visible:outline-brand max-[600px]:min-h-[34px] max-[600px]:px-2.5 max-[600px]:py-2 max-[600px]:text-xs h-auto min-h-10 rounded-lg border px-[18px] py-[9px] text-sm font-semibold shadow-none motion-reduce:transition-none border-brand bg-brand text-white hover:border-[#067334] hover:bg-[#067334]"
                aria-current={pathname === "/signup" ? "page" : undefined}
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
      <nav
        className="mx-auto w-[calc(100%-2.5rem)] max-w-[1120px] flex h-[49px] items-center gap-1 overflow-x-auto [scrollbar-width:thin] max-[600px]:w-full max-[600px]:px-4"
        aria-label="পণ্যের ক্যাটাগরি"
      >
        {categories.map((category) => {
          const active = pathname === `/category/${category.slug}`;
          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap ${active ? "bg-[#e0f0e5] text-brand" : "hover:bg-page"}`}
              aria-current={active ? "page" : undefined}
            >
              <span aria-hidden="true">{category.icon}</span>
              {category.nameBn}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
