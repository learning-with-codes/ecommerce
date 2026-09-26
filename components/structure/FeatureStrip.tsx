"use client";

import React from "react";
import { Flame, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function FeatureStrip() {
  return (
    <section className="bg-white border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-orange-50/70 border border-orange-100">
            <div className="p-2.5 rounded-xl bg-orange-600 text-white">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">Flash Clearance</p>
              <p className="text-[11px] text-orange-700 font-semibold">Up to 45% Off</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
            <div className="p-2.5 rounded-xl bg-amber-600 text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">ReTech Assured</p>
              <p className="text-[11px] text-amber-700 font-semibold">45-Point Inspection</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-orange-50/70 border border-orange-100">
            <div className="p-2.5 rounded-xl bg-orange-600 text-white">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">Doorstep Cash</p>
              <p className="text-[11px] text-orange-700 font-semibold">Instant UPI Credit</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
            <div className="p-2.5 rounded-xl bg-amber-600 text-white">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">7-Day Free Trial</p>
              <p className="text-[11px] text-amber-700 font-semibold">100% Moneyback</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}