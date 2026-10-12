"use client";

import { useProducts } from "@/components/ProductsProvider";

export default function DataNotice() {
  const { error, fallback, retry } = useProducts();
  if (error)
    return (
      <div className="data-notice" role="alert">
        <p>{error}</p>
        <button className="btn btn-outline" onClick={retry}>
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  if (fallback)
    return (
      <p className="data-notice" role="status">
        সরাসরি তথ্য এখন পাওয়া যাচ্ছে না। ১২ অক্টোবর ২০২৬-এ সংরক্ষিত API তথ্য
        দেখানো হচ্ছে।
      </p>
    );
  return null;
}
