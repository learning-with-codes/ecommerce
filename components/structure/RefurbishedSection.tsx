"use client";

import React from "react";
import { Sparkles, CheckCircle2, ShieldCheck, Award } from "lucide-react";
import { PRODUCTS } from "@/data/retechData";
import { Product } from "@/types/retech";

interface RefurbishedSectionProps {
  onAddToCart: (p: Product) => void;
}

export default function RefurbishedSection({ onAddToCart }: RefurbishedSectionProps) {
  const refurbishedItems = PRODUCTS.filter((p) => p.condition.includes("Refurbished"));

  return (
    <section id="refurbished" className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" />
              Circular Electronics Marketplace
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Certified Refurbished. Like New, For Less.
            </h2>
            <p className="text-slate-600 max-w-2xl text-sm sm:text-base">
              Every device passes our rigorous 45-point hardware inspection by certified technicians, backed by up to 1-year replacement warranty and 7-day doorstep return policy.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              45-Point Hardware Certified
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl shadow-sm">
              <ShieldCheck className="h-4 w-4 text-orange-600" />
              1-Year Warranty
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {refurbishedItems.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur">
                      {product.condition}
                    </span>
                    <span className="bg-orange-600 text-white text-[10px] font-black px-2 py-0.5 rounded">
                      Save {product.discount}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-orange-600 uppercase">{product.brand}</span>
                    <span className="flex items-center gap-1 text-slate-700 font-semibold">
                      ★ {product.rating} ({product.reviewsCount})
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 pt-1 text-xs text-slate-600 font-medium">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span>{product.warranty}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xl font-black text-slate-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </p>
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  className="bg-slate-900 hover:bg-orange-600 text-white rounded-xl font-bold text-xs px-4 py-2.5 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}