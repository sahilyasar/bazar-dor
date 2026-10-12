import Link from "next/link";

export default function EmptyState({ title = "পেজটি খুঁজে পাওয়া যায়নি", description = "আপনি যে পেজটি খুঁজছেন, সেটি নেই অথবা ঠিকানাটি সঠিক নয়।" }) {
  return <div className="empty-state"><span className="empty-icon" aria-hidden="true">🧺</span><span className="empty-code">৪০৪</span><h1>{title}</h1><p className="muted">{description}</p><Link href="/" className="btn btn-primary">হোম পেজে ফিরে যান <span aria-hidden="true">←</span></Link></div>;
}
