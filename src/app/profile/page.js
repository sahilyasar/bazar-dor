import Link from "next/link";

export const metadata = { title: "আমার প্রোফাইল" };

export default function ProfilePage() {
  return (
    <div className="profile-page">
      <h1>আমার প্রোফাইল</h1>
      <p className="muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      <div className="profile-card">
        <div className="profile-user">
          <span className="profile-avatar" aria-hidden="true">
            👤
          </span>
          <div>
            <h2>আপনার অ্যাকাউন্ট</h2>
            <p className="muted">
              সাইন ইন চালু হলে আপনার তথ্য এখানে দেখা যাবে।
            </p>
          </div>
          <Link href="/signin" className="btn btn-outline">
            সাইন ইন
          </Link>
        </div>
        <div className="profile-info">
          <h2>তথ্য</h2>
          <dl>
            <div>
              <dt>নাম</dt>
              <dd>—</dd>
            </div>
            <div>
              <dt>ইমেইল</dt>
              <dd>—</dd>
            </div>
          </dl>
          <Link href="/profile/update" className="btn btn-primary form-submit">
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
