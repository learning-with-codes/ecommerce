import Link from "next/link";
import { Truck, Store, ArrowRight } from "lucide-react";

export default function ReTechHero() {
  return (
    <section className="bg-gradient-to-r from-emerald-50 via-teal-50/30 to-cyan-50 py-10 sm:py-16 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4 text-center md:text-left">
            <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
              Sell old tech for instant cash
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 font-medium max-w-lg mx-auto md:mx-0">
              Free doorstep pickup across Greater London or visit any of our UK drop-off stores.
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <span className="inline-flex items-center gap-1.5 bg-white text-neutral-800 text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs border border-neutral-200/60">
                <Truck className="w-4 h-4 text-teal-600" /> Free Doorstep Collection
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white text-neutral-800 text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs border border-neutral-200/60">
                <Store className="w-4 h-4 text-teal-600" /> London Drop-off Hubs
              </span>
            </div>

            <div className="pt-3">
              <Link
                href="#sell-section"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition transform active:scale-95"
              >
                Sell Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-teal-100/50 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop"
                alt="ReTech Certified Tech"
                className="w-56 h-56 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}