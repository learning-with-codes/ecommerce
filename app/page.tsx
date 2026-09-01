
import ReTechHeader from "@/components/retech/ReTechHeader";
import ReTechHero from "@/components/retech/ReTechHero";
import ReTechServices from "@/components/retech/ReTechServices";
import ReTechSellDevice from "@/components/retech/ReTechSellDevice";
import ReTechRefurbished from "@/components/retech/ReTechRefurbished";
import ReTechStoreLocator from "@/components/retech/ReTechStoreLocator";
import ReTechFooter from "@/components/retech/ReTechFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <ReTechHeader />
      <ReTechHero />
      <ReTechServices />
      <ReTechSellDevice />
      <ReTechRefurbished />
      <ReTechStoreLocator />
      <ReTechFooter />
    </main>
  );
}