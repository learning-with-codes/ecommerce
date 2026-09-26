"use client";

import React from "react";
import { Flame, Heart, ShieldCheck, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/data/retechData";
import { Product } from "@/types/retech";

interface TrendingSectionProps {
  activeCategoryTab: string;
  onSelectCategory: (tab: string) => void;
  wishlist: Product[];
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export default function TrendingSection({
  activeCategoryTab,
  onSelectCategory,
  wishlist,
  onToggleWishlist,
  onAddToCart
}: TrendingSectionProps) {
  const filteredProducts = activeCategoryTab === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategoryTab);

  return (
    <section id="trending" className="py-20 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest flex items-center gap-1.5">
              <Flame className="h-4 w-4 fill-orange-500 text-orange-500" /> Hot Deals Trending Today
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">Trending Technology</h2>
            <p className="text-sm text-slate-500">Curated flagships, laptops & audio gear ready for immediate shipping</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {["all", "smartphones", "laptops", "tablets", "audio"].map((tab) => (
              <button
                key={tab}
                onClick={() => onSelectCategory(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeCategoryTab === tab
                    ? "bg-orange-600 text-white shadow-md shadow-orange-600/30"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isSaved = wishlist.some((p) => p.id === product.id);
            return (
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
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur shadow-sm text-slate-600 hover:text-rose-500 transition"
                      aria-label="Save item"
                    >
                      <Heart className={`h-4 w-4 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
                    </button>
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="bg-orange-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm">
                        {product.discount}% OFF
                      </span>
                      {product.badge && (
                        <span className="bg-slate-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-orange-600 uppercase tracking-wide">{product.brand}</span>
                      <span className="flex items-center gap-1 font-bold text-slate-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        ★ {product.rating} <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                      </span>
                    </div>
                    <h3 className="font-extrabold text-slate-950 text-sm sm:text-base line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> {product.warranty}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xl font-black text-slate-950">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-slate-400 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold px-4 py-2.5 shadow-md shadow-orange-600/20 transition"
                  >
                    <ShoppingBag className="h-4 w-4 mr-1.5" /> Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}