"use client";

import Link from "next/link";

export default function ErrorPage({ reset }) {
  return <div className="container empty-state"><span className="empty-icon" aria-hidden="true">🧺</span><h1>তথ্য দেখাতে সমস্যা হয়েছে</h1><p className="muted">একটু পরে আবার চেষ্টা করুন।</p><div className="error-actions"><button onClick={reset} className="btn btn-primary">আবার চেষ্টা করুন</button><Link href="/" className="btn btn-outline">হোম পেজে ফিরে যান</Link></div></div>;
}
