export function banglaNumber(value, decimals = 0) {
  return new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function numericPrice(value) {
  if (typeof value === "number") return value;
  return Number(String(value).replace(/[০-৯]/g, (digit) => "০১২৩৪৫৬৭৮৯".indexOf(digit)).replace(/[^\d.-]/g, ""));
}

export function sortProducts(products, order) {
  const sorted = [...products];
  if (order === "low") sorted.sort((a, b) => numericPrice(a.today) - numericPrice(b.today));
  if (order === "high") sorted.sort((a, b) => numericPrice(b.today) - numericPrice(a.today));
  return sorted;
}

export function topMovers(products, direction) {
  return products.filter((product) => product.change.dir === direction)
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct)).slice(0, 6);
}

export const units = { kg: "কেজি", liter: "লিটার", litre: "লিটার", l: "লিটার", dozen: "ডজন", piece: "পিস", pcs: "পিস" };
export function unitName(unit) { return units[unit] || unit; }

export function marketSummary(markets) {
  if (!markets.length) return null;
  return {
    min: Math.min(...markets.map((market) => market.min)),
    max: Math.max(...markets.map((market) => market.max)),
    average: markets.reduce((total, market) => total + (market.min + market.max) / 2, 0) / markets.length,
  };
}
