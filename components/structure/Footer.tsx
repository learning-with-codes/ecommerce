'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ActiveTab } from '@/types/retech';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-base">
                R
              </div>
              <span className="font-extrabold text-xl text-white">ReTech</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              ReTech is India's next-generation circular technology marketplace. Sell pre-owned gadgets for immediate funds, buy certified hardware with warranty, or request doorstep repairs.
            </p>
            <div className="pt-2 flex items-center gap-2 text-indigo-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified 100% Data Destruction Standard</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Services</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="hover:text-indigo-400 cursor-pointer" onClick={() => onNavigate('sell')}>Sell Phone</li>
              <li className="hover:text-indigo-400 cursor-pointer" onClick={() => onNavigate('buy')}>Refurbished iPhones</li>
              <li className="hover:text-indigo-400 cursor-pointer" onClick={() => onNavigate('repair')}>Screen Replacement</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Support</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="hover:text-indigo-400 cursor-pointer">Warranty Verification</li>
              <li className="hover:text-indigo-400 cursor-pointer">Data Privacy Protocol</li>
              <li className="hover:text-indigo-400 cursor-pointer">Help & FAQs</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-500">
          © 2026 ReTech ReCommerce Technologies Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}