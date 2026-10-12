import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ProductsProvider from "@/components/ProductsProvider";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  title: { default: "বাজার দর — আজকের বাজারের দাম", template: "%s | বাজার দর" },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের দাম এবং বাজারভিত্তিক তুলনা এক জায়গায়।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light" data-scroll-behavior="smooth">
      <body>
        <a href="#main-content" className="skip-link">
          মূল কনটেন্টে যান
        </a>
        <ProductsProvider>
          <Navbar />
          <PriceTicker />
          <main id="main-content">{children}</main>
          <Footer />
          <ToastProvider />
        </ProductsProvider>
      </body>
    </html>
  );
}
