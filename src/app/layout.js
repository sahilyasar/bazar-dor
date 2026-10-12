import "./globals.css";

export const metadata = {
  title: { default: "বাজার দর — আজকের বাজারের দাম", template: "%s | বাজার দর" },
  description: "চাল, ডাল, তেল, সবজি, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের দাম এবং বাজারভিত্তিক তুলনা এক জায়গায়।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
