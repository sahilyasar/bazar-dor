import { banglaNumber } from "@/lib/format";

export default function ChangeBadge({ change, plain = false }) {
  const arrow = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";
  return <span className={`change ${change.dir} ${plain ? "change-plain" : ""}`} aria-label={`দাম ${change.dir === "up" ? "বেড়েছে" : change.dir === "down" ? "কমেছে" : "অপরিবর্তিত"} ${banglaNumber(Math.abs(change.pct), 1)} শতাংশ`}>{arrow} {banglaNumber(Math.abs(change.pct), 1)}%</span>;
}
