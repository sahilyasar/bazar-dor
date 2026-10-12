import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";

export default function Home() {
  return (
    <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[1120px] max-[600px]:w-[calc(100%-2rem)] pt-6 pb-12">
      <Hero />
      <HomeProducts />
    </div>
  );
}
