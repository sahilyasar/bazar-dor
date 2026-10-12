import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface py-6">
      <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[1120px] max-[600px]:w-[calc(100%-2rem)] flex justify-between gap-6 text-xs max-[600px]:flex-col max-[600px]:gap-2">
        <p>
          <Link href="/" className="font-semibold">
            বাজার দর
          </Link>{" "}
          — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-muted">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
