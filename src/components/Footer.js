import Link from "next/link";

export default function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><p><Link href="/">বাজার দর</Link> — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p><p className="muted">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p></div></footer>;
}
