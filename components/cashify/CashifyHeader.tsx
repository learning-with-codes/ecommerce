"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronDown, User, ShoppingBag } from "lucide-react";

export default function CashifyHeader() {
  const [selectedCity] = useState("Kolkata");

  const subNavLinks = [
    { label: "All", href: "#" },
    { label: "Sell Phone", href: "#sell-section" },
    { label: "Sell Gadgets", href: "#sell-section" },
    { label: "Buy Refurbished Devices", href: "#refurbished-section" },
    { label: "Find New Gadget", href: "#" },
    { label: "Buy Laptop", href: "#refurbished-section" },
    { label: "Cashify Store", href: "#stores-section" },
    { label: "More", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-100 shadow-xs">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-2xl font-black tracking-tight text-teal-600">CASHIFY</span>
          <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-1.5 py-0.5 rounded-sm">
            ASSURED
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-2xl relative hidden md:block">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search for mobiles, accessories & More"
            className="w-full pl-11 pr-4 py-2.5 bg-neutral-100/80 rounded-lg text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 transition"
          />
        </div>

        {/* Location & Links */}
        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-1.5 text-neutral-700 hover:text-teal-600 font-medium cursor-pointer">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>{selectedCity}</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-3.5 py-2 rounded-lg font-medium transition"
          >
            <User className="w-4 h-4 text-neutral-600" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Subnav */}
      <div className="bg-neutral-50/70 border-t border-neutral-100 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 py-2 text-xs font-semibold text-neutral-700 whitespace-nowrap">
          {subNavLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="hover:text-teal-600 transition flex items-center gap-1"
            >
              {item.label}
              {item.label === "More" && <ChevronDown className="w-3 h-3 text-neutral-400" />}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}