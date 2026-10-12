"use client";

import Link from "next/link";
import toast from "react-hot-toast";

export default function UpdateProfileForm() {
  function submit(event) {
    event.preventDefault();
    toast("অ্যাকাউন্ট সেবা চালু হলে নাম আপডেট করা যাবে।", { icon: "ℹ️" });
  }
  return (
    <div className="auth-page">
      <div className="auth-heading">
        <h1>তথ্য আপডেট করুন</h1>
        <p className="muted">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p>
      </div>
      <form className="auth-card" onSubmit={submit}>
        <p className="account-notice">অ্যাকাউন্ট সেবা শীঘ্রই চালু হবে।</p>
        <label className="form-field">
          নাম
          <input
            className="input"
            name="name"
            autoComplete="name"
            placeholder="আপনার নাম"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        <button className="btn btn-primary form-submit" type="submit">
          তথ্য আপডেট করুন
        </button>
      </form>
      <Link href="/profile" className="back-link">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}
