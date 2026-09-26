"use client";

import React from "react";

interface TopAnnouncementProps {
  onOpenValuation: () => void;
}

export default function TopAnnouncement({ onOpenValuation }: TopAnnouncementProps) {
  return (
    <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white text-xs py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
          <span className="font-extrabold uppercase tracking-wide bg-black/20 px-2 py-0.5 rounded text-[10px]">
            Festive Super Deals
          </span>
          <span className="hidden sm:inline">
            Extra ₹2,500 off on Axis & HDFC cards + 1 Year Warranty Included!
          </span>
        </div>
        <div className="flex items-center gap-4 text-orange-100 text-[11px]">
          <span className="hover:text-white cursor-pointer transition">Express Free Delivery</span>
          <span className="h-3 w-px bg-orange-400" />
          <button onClick={onOpenValuation} className="text-white font-bold underline hover:text-amber-200">
            Get Instant Sell Cash
          </button>
        </div>
      </div>
    </div>
  );
}