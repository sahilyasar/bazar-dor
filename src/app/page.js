import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";

export default function Home() {
  return (
    <div className="container home-page">
      <Hero />
      <HomeProducts />
    </div>
  );
}
