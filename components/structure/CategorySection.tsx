"use client";

import React from "react";
import { CATEGORIES } from "@/data/retechData";

interface CategorySectionProps {
  activeCategoryTab: string;
  onSelectCategory: (catId: string) => void;
}

export default function CategorySection({ activeCategoryTab, onSelectCategory }: CategorySectionProps) {
  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
            Featured Hardware
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
            Explore by Category
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Browse certified electronics graded for optimal battery health & pristine cosmetics
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id === activeCategoryTab ? "all" : cat.id)}
              className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 text-center flex flex-col items-center group ${
                activeCategoryTab === cat.id
                  ? "border-orange-500 bg-orange-50/60 shadow-md ring-2 ring-orange-500/20"
                  : "border-slate-200 bg-slate-50/50 hover:border-orange-300 hover:bg-white hover:shadow-lg"
              }`}
            >
              <div className="relative h-20 w-20 rounded-full overflow-hidden mb-3 bg-white shadow-inner border border-slate-100">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
              </div>
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition">
                {cat.name}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}