"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LogoutButton({
  className = "btn disabled:opacity-50 focus-visible:outline-brand h-auto min-h-10 rounded-lg border px-[18px] py-[9px] text-sm font-semibold shadow-none motion-reduce:transition-none border-line bg-transparent text-ink hover:border-[#c6d4c6] hover:bg-[#e6ede6]",
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    if (pending) return;
    setPending(true);
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }
      toast.success("সফলভাবে সাইন আউট করেছেন।");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      className={className}
      disabled={pending}
      aria-busy={pending}
      onClick={logout}
    >
      {pending && (
        <span
          className="loading loading-spinner loading-xs"
          aria-hidden="true"
        />
      )}
      {pending ? "অপেক্ষা করুন…" : "সাইন আউট"}
    </button>
  );
}
