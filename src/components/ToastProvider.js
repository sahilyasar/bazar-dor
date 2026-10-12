"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          fontFamily: "Hind Siliguri, sans-serif",
          background: "#fafcfa",
          color: "#1d271f",
        },
      }}
    />
  );
}
