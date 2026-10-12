"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthForm({ mode, enabledProviders, notice = "" }) {
  const signup = mode === "signup";
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState("");

  useEffect(() => {
    if (notice) toast.error(notice, { id: "auth-notice" });
  }, [notice]);

  function showError(message) {
    setError(message);
    toast.error(message);
  }

  async function submit(event) {
    event.preventDefault();
    if (pending) return;
    const values = new FormData(event.currentTarget);
    const email = values.get("email").trim();
    const password = values.get("password");
    const name = signup ? values.get("name").trim() : "";
    if (signup && name.length < 2) {
      showError("কমপক্ষে ২ অক্ষরের নাম লিখুন।");
      return;
    }
    if (signup && values.get("password") !== values.get("confirmPassword")) {
      const message = "পাসওয়ার্ড দুটি মিলছে না। আবার লিখুন।";
      showError(message);
      return;
    }
    setError("");
    setPending("email");
    try {
      const result = signup
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });
      if (result.error) {
        showError(
          result.error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।",
        );
        return;
      }
      toast.success(
        signup
          ? "নিবন্ধন সম্পন্ন। এবার সাইন ইন করুন।"
          : "সফলভাবে সাইন ইন করেছেন।",
      );
      router.replace(signup ? "/signin" : "/");
      router.refresh();
    } catch {
      showError("সার্ভারের সাথে সংযোগ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setPending("");
    }
  }

  async function googleLogin() {
    if (pending || !enabledProviders.google) return;
    setError("");
    setPending("google");
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/?auth=success",
        errorCallbackURL: "/signin?reason=social-error",
      });
      if (result.error)
        showError(result.error.message || "Google সাইন ইন করা যায়নি।");
    } catch {
      showError("Google সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setPending("");
    }
  }

  return (
    <div className="mx-auto mt-10 mb-18 w-[calc(100%-2rem)] max-w-[416px]">
      <div className="mb-8">
        <h1 className="mb-2 text-[30px] font-bold">
          {signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
        </h1>
        <p className="text-base text-muted">
          {signup
            ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
            : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}
        </p>
      </div>
      <div className="rounded-2xl border border-line bg-surface p-6 max-[600px]:p-5">
        {notice && (
          <p
            className="mb-5 rounded-lg border border-line bg-page px-3 py-2 text-xs text-muted"
            role="status"
          >
            {notice}
          </p>
        )}
        <form
          onSubmit={submit}
          onInvalid={() => toast.error("ফর্মের তথ্য সঠিকভাবে পূরণ করুন।")}
        >
          <fieldset disabled={Boolean(pending)}>
            {signup && (
              <label className="mb-4 flex flex-col gap-2 font-semibold">
                নাম
                <input
                  className="input h-[42px] min-h-[42px] w-full rounded-lg border border-line bg-surface text-ink font-normal placeholder:text-[#858f87] placeholder:opacity-100"
                  name="name"
                  type="text"
                  placeholder="যেমন: রহিম উদ্দিন"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                />
              </label>
            )}
            <label className="mb-4 flex flex-col gap-2 font-semibold">
              ইমেইল
              <input
                className="input h-[42px] min-h-[42px] w-full rounded-lg border border-line bg-surface text-ink font-normal placeholder:text-[#858f87] placeholder:opacity-100"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>
            <label className="mb-4 flex flex-col gap-2 font-semibold">
              পাসওয়ার্ড
              <input
                className="input h-[42px] min-h-[42px] w-full rounded-lg border border-line bg-surface text-ink font-normal placeholder:text-[#858f87] placeholder:opacity-100"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete={signup ? "new-password" : "current-password"}
                minLength={8}
                maxLength={128}
                required
              />
            </label>
            {signup && (
              <label className="mb-4 flex flex-col gap-2 font-semibold">
                পাসওয়ার্ড নিশ্চিত করুন
                <input
                  className="input h-[42px] min-h-[42px] w-full rounded-lg border border-line bg-surface text-ink font-normal placeholder:text-[#858f87] placeholder:opacity-100"
                  name="confirmPassword"
                  type="password"
                  placeholder="আবার লিখুন"
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={128}
                  required
                />
              </label>
            )}
            {error && (
              <p className="mb-3 text-[#c63639]" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="btn disabled:opacity-50 focus-visible:outline-brand h-auto min-h-10 rounded-lg border px-[18px] py-[9px] text-sm font-semibold shadow-none motion-reduce:transition-none border-brand bg-brand text-white hover:border-[#067334] hover:bg-[#067334] w-full"
              disabled={Boolean(pending)}
              aria-busy={pending === "email"}
            >
              {pending === "email" && (
                <span
                  className="loading loading-spinner loading-xs"
                  aria-hidden="true"
                />
              )}
              {pending === "email"
                ? "অপেক্ষা করুন…"
                : signup
                  ? "অ্যাকাউন্ট তৈরি করুন"
                  : "সাইন ইন"}
            </button>
          </fieldset>
        </form>
        <div className="my-5 flex items-center gap-3 text-xs text-muted before:h-px before:flex-1 before:bg-line before:content-[''] after:h-px after:flex-1 after:bg-line after:content-['']">
          <span>অথবা</span>
        </div>
        <div className="flex gap-2 max-[600px]:flex-col">
          <button
            type="button"
            className="btn disabled:opacity-50 focus-visible:outline-brand h-auto min-h-10 w-full rounded-lg border gap-1.5 px-2.5 py-2 text-sm whitespace-nowrap font-semibold shadow-none motion-reduce:transition-none border-line bg-transparent text-ink hover:border-[#c6d4c6] hover:bg-[#e6ede6]"
            onClick={googleLogin}
            disabled={!enabledProviders.google || Boolean(pending)}
            aria-busy={pending === "google"}
          >
            {pending === "google" ? (
              <span
                className="loading loading-spinner loading-xs"
                aria-hidden="true"
              />
            ) : (
              <span
                className="font-[Arial,sans-serif] text-[17px] font-bold text-[#4285f4]"
                aria-hidden="true"
              >
                G
              </span>
            )}
            {pending === "google" ? "অপেক্ষা করুন…" : "Google দিয়ে চালিয়ে যান"}
          </button>
        </div>
        {!enabledProviders.google && (
          <p className="mt-3 text-xs text-muted">
            Google সাইন ইন এখন উপলব্ধ নয়। ইমেইল দিয়ে চালিয়ে যান।
          </p>
        )}
        <p className="mt-4 text-sm">
          {signup ? "অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
          <Link
            className="font-semibold text-brand"
            href={signup ? "/signin" : "/signup"}
          >
            {signup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </div>
      <Link href="/" className="mt-6 inline-block text-brand">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
