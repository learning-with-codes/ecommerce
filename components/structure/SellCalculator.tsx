"use client";

import React, { useState } from "react";
import { CheckCircle2, Smartphone, Laptop, Tablet, Headphones, ArrowRight } from "lucide-react";

interface SellCalculatorProps {
  onOpenValuation: () => void;
}

export default function SellCalculator({ onOpenValuation }: SellCalculatorProps) {
  const [calcDeviceType, setCalcDeviceType] = useState("phone");
  const [calcModel, setCalcModel] = useState("iPhone 13 128GB");
  const [calcCondition, setCalcCondition] = useState("good");

  const getEstimatedPrice = () => {
    let base = 28000;
    if (calcDeviceType === "laptop") base = 48000;
    if (calcDeviceType === "tablet") base = 22000;
    if (calcDeviceType === "audio") base = 8500;

    if (calcCondition === "flawless") return Math.round(base * 1.25);
    if (calcCondition === "fair") return Math.round(base * 0.75);
    return base;
  };

  return (
    <section id="sell" className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-orange-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Description */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-500/30">
              <CheckCircle2 className="h-3.5 w-3.5 text-orange-400" />
              Instant Doorstep UPI / Cash Transfer
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Your Old Gadgets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                Are Worth Instant Cash.
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Get real-time AI valuation, schedule doorstep pickup across India, and get paid before our technician leaves your doorstep.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div>
                <p className="text-2xl font-black text-white">60 Sec</p>
                <p className="text-xs text-slate-400">Instant Online Quote</p>
              </div>
              <div>
                <p className="text-2xl font-black text-orange-400">Free</p>
                <p className="text-xs text-slate-400">Doorstep Pickup</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-400">100%</p>
                <p className="text-xs text-slate-400">Data Wipe Guarantee</p>
              </div>
            </div>
          </div>

          {/* Right Live Calculator Card */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="font-bold text-lg text-white">Sell Valuation Calculator</h3>
                <span className="text-xs font-semibold text-orange-400 bg-orange-950/60 border border-orange-800/60 px-2.5 py-1 rounded-full">
                  Live Market Rates
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">Select Category</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "phone", label: "Mobile", icon: Smartphone },
                    { id: "laptop", label: "Laptop", icon: Laptop },
                    { id: "tablet", label: "Tablet", icon: Tablet },
                    { id: "audio", label: "Audio", icon: Headphones },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = calcDeviceType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCalcDeviceType(item.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-semibold transition ${
                          isActive
                            ? "bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-600/30"
                            : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        <Icon className="h-5 w-5 mb-1" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">Device Model</label>
                <input
                  type="text"
                  value={calcModel}
                  onChange={(e) => setCalcModel(e.target.value)}
                  placeholder="e.g. iPhone 13 128GB, MacBook Pro M1"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400">Condition</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "flawless", label: "Flawless", sub: "No Scratches" },
                    { id: "good", label: "Good", sub: "Minor Signs" },
                    { id: "fair", label: "Fair", sub: "Dents/Scratches" },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCalcCondition(c.id)}
                      className={`p-3 rounded-xl border text-left transition ${
                        calcCondition === c.id
                          ? "bg-orange-950/80 border-orange-500 text-white"
                          : "bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <p className="text-xs font-bold">{c.label}</p>
                      <p className="text-[10px] text-slate-500">{c.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Estimated Instant Payout</p>
                  <p className="text-2xl sm:text-3xl font-black text-orange-400">
                    ₹{getEstimatedPrice().toLocaleString("en-IN")}
                  </p>
                </div>
                <button
                  onClick={onOpenValuation}
                  className="inline-flex items-center bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold px-6 py-4 rounded-2xl shadow-lg shadow-orange-600/30 transition hover:scale-105 text-sm"
                >
                  Sell This Device <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}