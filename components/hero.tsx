import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
// import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-50 pt-16 pb-24 lg:pt-28 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/60 text-xs font-semibold text-neutral-800 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Autumn Collection 2026
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              Elevate your craft with minimal essentials.
            </h1>
            <p className="text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Precision-engineered accessories crafted from sustainable, aircraft-grade materials. Designed for the modern creative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="#featured"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-black text-white font-medium hover:bg-neutral-800 transition shadow-sm"
              >
                Shop Collection jkhjkhjkjh
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-neutral-300 bg-white text-neutral-800 font-medium hover:bg-neutral-50 transition"
              >
                Our Philosophy
              </Link>
            </div>
            
            {/* Social Proof Mini */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-4 text-xs text-neutral-500 font-medium">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-neutral-700" />
                2-Year Global Warranty
              </div>
              <span>•</span>
              <div>Free Worldwide Shipping</div>
            </div>
          </div>

          {/* Right Showcase Column */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-200 shadow-2xl">
                {/* <Image
                  src="05740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop"
                  alt="Premium Audio Product"
                  className="w-full h-full object-cover object-center"
                  
                /> */}
              </div>
              {/* Floating Product Highlight Card */}
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-neutral-100 hidden sm:flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden flex items-center justify-center font-bold text-neutral-700">
                  4.9★
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">Studio ANC Pro</p>
                  <p className="text-xs text-neutral-500">Over 1,200+ Verified Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}