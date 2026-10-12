import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ProductsProvider from "@/components/ProductsProvider";
import ToastProvider from "@/components/ToastProvider";
import AuthNotifications from "@/components/AuthNotifications";

export const metadata = {
  title: { default: "বাজার দর — আজকের বাজারের দাম", template: "%s | বাজার দর" },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের দাম এবং বাজারভিত্তিক তুলনা এক জায়গায়।",
};

export default function RootLayout({ children }) {
  return (
    <html
      className="scroll-smooth scroll-pt-6 motion-reduce:scroll-auto"
      lang="bn"
      data-theme="light"
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col bg-page font-sans text-sm leading-normal text-ink">
        <a
          href="#main-content"
          className="absolute -top-20 left-5 z-[100] bg-white p-3 focus:top-2.5"
        >
          মূল কনটেন্টে যান
        </a>
        <ProductsProvider>
          <Navbar />
          <PriceTicker />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <ToastProvider />
          <AuthNotifications />
        </ProductsProvider>
      </body>
    </html>
  );
}
