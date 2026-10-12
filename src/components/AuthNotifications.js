"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthNotifications() {
  const pathname = usePathname();
  useEffect(() => {
    if (
      pathname === "/" &&
      new URLSearchParams(window.location.search).get("auth") === "success"
    ) {
      toast.success("সফলভাবে সাইন ইন করেছেন।", { id: "social-signin-success" });
      window.history.replaceState(window.history.state, "", "/");
    }
  }, [pathname]);
  return null;
}
