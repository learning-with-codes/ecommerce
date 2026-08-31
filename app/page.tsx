import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import Features from "@/components/Features";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <FeaturedProducts />
      <PromoBanner />
      <Footer />
    </main>
  );
}