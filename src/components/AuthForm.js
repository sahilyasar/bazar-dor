"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AuthForm({ mode }) {
  const signup = mode === "signup";
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    if (signup && values.get("password") !== values.get("confirmPassword")) {
      const message = "পাসওয়ার্ড দুটি মিলছে না। আবার লিখুন।";
      setError(message);
      toast.error(message);
      return;
    }
    setError("");
    toast("অ্যাকাউন্ট সেবা এখনো চালু হয়নি। পরে আবার চেষ্টা করুন।", { icon: "ℹ️" });
  }

  function socialLogin() {
    toast("সোশ্যাল সাইন ইন এখনো চালু হয়নি।", { icon: "ℹ️" });
  }

  return <div className="auth-page">
    <div className="auth-heading"><h1>{signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}</h1><p className="muted">{signup ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।" : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}</p></div>
    <div className="auth-card"><p className="account-notice">অ্যাকাউন্ট তৈরি ও সাইন ইন শীঘ্রই চালু হবে।</p>
      <form onSubmit={submit} onInvalid={() => toast.error("ফর্মের তথ্য সঠিকভাবে পূরণ করুন।")}>
        {signup && <label className="form-field">নাম<input className="input" name="name" type="text" placeholder="যেমন: রহিম উদ্দিন" autoComplete="name" required maxLength={100} /></label>}
        <label className="form-field">ইমেইল<input className="input" name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label>
        <label className="form-field">পাসওয়ার্ড<input className="input" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete={signup ? "new-password" : "current-password"} minLength={8} required /></label>
        {signup && <label className="form-field">পাসওয়ার্ড নিশ্চিত করুন<input className="input" name="confirmPassword" type="password" placeholder="আবার লিখুন" autoComplete="new-password" minLength={8} required /></label>}
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="btn btn-primary form-submit">{signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}</button>
      </form>
      <div className="form-divider"><span>অথবা</span></div>
      <div className="social-buttons"><button type="button" className="btn btn-outline" onClick={socialLogin}><span className="google-icon" aria-hidden="true">G</span>Google দিয়ে চালিয়ে যান</button><button type="button" className="btn btn-outline" onClick={socialLogin}><span className="github-icon" aria-hidden="true">GH</span>GitHub দিয়ে চালিয়ে যান</button></div>
      <p className="auth-switch">{signup ? "অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}<Link href={signup ? "/signin" : "/signup"}>{signup ? "সাইন ইন করুন" : "সাইন আপ করুন"}</Link></p>
    </div>
    <Link href="/" className="back-link">← হোম পেজে ফিরে যান</Link>
  </div>;
}
