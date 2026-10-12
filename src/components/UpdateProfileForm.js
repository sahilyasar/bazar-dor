"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ name }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    if (pending) return;
    const updatedName = new FormData(event.currentTarget).get("name").trim();
    if (updatedName.length < 2) {
      setError("কমপক্ষে ২ অক্ষরের নাম লিখুন।");
      toast.error("কমপক্ষে ২ অক্ষরের নাম লিখুন।");
      return;
    }
    setError("");
    setPending(true);
    try {
      const result = await authClient.updateUser({ name: updatedName });
      if (result.error) {
        const message = result.error.message || "তথ্য আপডেট করা যায়নি।";
        setError(message);
        toast.error(message);
        return;
      }
      toast.success("আপনার নাম আপডেট হয়েছে।");
      router.replace("/profile");
      router.refresh();
    } catch {
      setError("সার্ভারের সাথে সংযোগ করা যায়নি। আবার চেষ্টা করুন।");
      toast.error("সার্ভারের সাথে সংযোগ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="mx-auto mt-10 mb-18 w-[calc(100%-2rem)] max-w-[416px]">
      <div className="mb-8">
        <h1 className="mb-2 text-[30px] font-bold">তথ্য আপডেট করুন</h1>
        <p className="text-base text-muted">
          আপনার প্রোফাইলের নাম পরিবর্তন করুন।
        </p>
      </div>
      <form
        className="rounded-2xl border border-line bg-surface p-6 max-[600px]:p-5"
        onSubmit={submit}
      >
        <label className="mb-4 flex flex-col gap-2 font-semibold">
          নাম
          <input
            className="input h-[42px] min-h-[42px] w-full rounded-lg border border-line bg-surface text-ink font-normal placeholder:text-[#858f87] placeholder:opacity-100"
            name="name"
            autoComplete="name"
            placeholder="আপনার নাম"
            defaultValue={name}
            disabled={pending}
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        {error && (
          <p className="mb-3 text-[#c63639]" role="alert">
            {error}
          </p>
        )}
        <button
          className="btn disabled:opacity-50 focus-visible:outline-brand h-auto min-h-10 rounded-lg border px-[18px] py-[9px] text-sm font-semibold shadow-none motion-reduce:transition-none border-brand bg-brand text-white hover:border-[#067334] hover:bg-[#067334] w-full"
          type="submit"
          disabled={pending}
          aria-busy={pending}
        >
          {pending && (
            <span
              className="loading loading-spinner loading-xs"
              aria-hidden="true"
            />
          )}
          {pending ? "অপেক্ষা করুন…" : "তথ্য আপডেট করুন"}
        </button>
      </form>
      <Link href="/profile" className="mt-6 inline-block text-brand">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}
