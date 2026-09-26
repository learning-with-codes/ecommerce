"use client";

import React from "react";
import { Zap, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="h-10 w-10 rounded-xl bg-orange-600 flex items-center justify-center text-white">
                <Zap className="h-5 w-5 fill-white" />
              </div>
              <span className="text-2xl font-black text-white">
                Re<span className="text-orange-500">Tech</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              Smarter Tech. Better Value. India&apos;s most reliable ecosystem to purchase certified refurbished electronics and sell old gadgets with instant UPI payment.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> ISO Certified Lab</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-orange-400" /> 100% Data Wiping</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Shop Devices</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#trending" className="hover:text-white transition">Certified Refurbished iPhones</a></li>
              <li><a href="#trending" className="hover:text-white transition">MacBooks & OLED Laptops</a></li>
              <li><a href="#trending" className="hover:text-white transition">Noise-Cancelling Headphones</a></li>
              <li><a href="#refurbished" className="hover:text-white transition">Open Box Deals</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Sell & Exchange</p>
            <ul className="space-y-2 text-xs">
              <li><a href="#sell" className="hover:text-white transition">Sell Old Smartphone</a></li>
              <li><a href="#sell" className="hover:text-white transition">Sell Apple MacBook</a></li>
              <li><a href="#sell" className="hover:text-white transition">Sell Used Tablet</a></li>
              <li><a href="#sell" className="hover:text-white transition">Doorstep Valuation Flow</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider">Deals Newsletter</p>
            <p className="text-xs text-slate-400">Receive drop alerts for refurbished MacBooks and iPhones.</p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xs rounded-xl py-2 font-bold transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ReTech Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Exchange</span>
            <span className="hover:text-slate-400 cursor-pointer">Warranty Registration</span>
          </div>
        </div>
      </div>
    </footer>
  );
}