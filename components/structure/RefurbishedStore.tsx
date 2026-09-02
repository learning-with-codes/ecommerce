'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, ShoppingCart } from 'lucide-react';
import { REFURBISHED_PHONES } from '@/data/retechData';
import { RefurbishedPhoneItem } from '@/types/retech';

interface RefurbishedStoreProps {
  onAddToCart: (phone: RefurbishedPhoneItem) => void;
}

export const RefurbishedStore: React.FC<RefurbishedStoreProps> = ({ onAddToCart }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const filtered = selectedBrand === 'all'
    ? REFURBISHED_PHONES
    : REFURBISHED_PHONES.filter(p => p.brand === selectedBrand);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">ReTech Certified Outlet</span>
          <h1 className="text-3xl font-black text-slate-900 mt-1">Pre-Owned & Factory Reconditioned</h1>
          <p className="text-xs text-slate-500 mt-1">Every phone includes 32-point diagnostics and a 6-month pan-India warranty.</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-4 md:mt-0">
          {['all', 'apple', 'samsung', 'oneplus'].map((b) => (
            <button
              type="button"
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition ${
                selectedBrand === b ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((phone) => (
          <div key={phone.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col p-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-200">
                Grade: {phone.grade}
              </span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Save {Math.round(((phone.originalPrice - phone.price) / phone.originalPrice) * 100)}%
              </span>
            </div>

            <div className="py-6 flex justify-center text-5xl bg-slate-50 rounded-xl mb-4">
              {phone.emoji}
            </div>

            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{phone.rating}</span>
              <span className="text-slate-400">({phone.reviewsCount})</span>
            </div>

            <h3 className="font-bold text-slate-900 text-base">{phone.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{phone.storage} • {phone.color}</p>

            <div className="my-4 space-y-1 text-xs text-slate-600">
              {phone.features.map((f: string, idx: number ) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xl font-black text-slate-900">₹{phone.price.toLocaleString()}</span>
                <span className="text-xs text-slate-400 line-through ml-2">₹{phone.originalPrice.toLocaleString()}</span>
              </div>
              <button
                type="button"
                onClick={() => onAddToCart(phone)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Buy</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};