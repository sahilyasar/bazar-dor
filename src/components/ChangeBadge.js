import { banglaNumber } from "@/lib/format";

export default function ChangeBadge({ change, plain = false, className = "" }) {
  const arrow = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-xl leading-[18px] font-semibold whitespace-nowrap ${change.dir === "up" ? "text-[#148644]" : change.dir === "down" ? "text-[#c63639]" : "text-[#747a75]"} ${plain ? "bg-transparent p-0 text-sm" : "bg-page px-2 py-[3px] text-xs"} ${className}`}
      aria-label={`দাম ${change.dir === "up" ? "বেড়েছে" : change.dir === "down" ? "কমেছে" : "অপরিবর্তিত"} ${banglaNumber(Math.abs(change.pct), 1)} শতাংশ`}
    >
      {arrow} {banglaNumber(Math.abs(change.pct), 1)}%
    </span>
  );
}
