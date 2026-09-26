"use client";

import React, { useState } from "react";
import { Zap, Search, Sparkles, RefreshCcw, Heart, ShoppingBag, User, Menu, X } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onOpenValuation: () => void;
}

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onOpenValuation
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 group cursor-pointer flex-shrink-0">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
            <Zap className="h-6 w-6 stroke-[2.4] fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-slate-950 group-hover:text-orange-600 transition-colors">
              Re<span className="text-orange-600">Tech</span>
            </span>
            <span className="text-[9px] uppercase font-extrabold tracking-widest text-slate-400 -mt-1">
              Certified Store
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-lg mx-6">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-600" />
            <input
              type="text"
              placeholder="Search for Mobiles, Laptops, Earbuds, Smartwatches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100/90 border border-slate-200 hover:border-orange-300 rounded-xl pl-11 pr-24 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-inner"
            />
            <button
              type="button"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#trending" className="text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors">
            Buy Electronics
          </a>
          <a href="#refurbished" className="text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-orange-500" />
            Refurbished Hub
          </a>
          <button
            onClick={onOpenValuation}
            className="text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors flex items-center gap-1.5"
          >
            <RefreshCcw className="h-4 w-4 text-orange-500" />
            Sell Old Tech
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenWishlist}
            className="p-2.5 rounded-full hover:bg-orange-50 text-slate-700 hover:text-orange-600 transition relative"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="p-2.5 rounded-full hover:bg-orange-50 text-slate-700 hover:text-orange-600 transition relative"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-orange-600 text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAuth}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border rounded-xl border-slate-200 font-bold text-slate-800 hover:border-orange-500 hover:text-orange-600 transition text-sm"
          >
            <User className="h-4 w-4 text-orange-600" />
            Login
          </button>

          <button
            onClick={onOpenValuation}
            className="hidden xl:inline-flex items-center bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-orange-500/25 transition-all"
          >
            <Zap className="h-4 w-4 fill-white mr-1" />
            Instant Cash Valuation
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-800"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Quick Category Subbar */}
      <div className="hidden md:block bg-slate-50 border-t border-slate-200/80 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold text-slate-600">
          <a href="#categories" className="hover:text-orange-600 transition">Smartphones</a>
          <a href="#categories" className="hover:text-orange-600 transition">MacBooks & Laptops</a>
          <a href="#categories" className="hover:text-orange-600 transition">iPads & Tablets</a>
          <a href="#categories" className="hover:text-orange-600 transition">Earbuds & Headphones</a>
          <a href="#categories" className="hover:text-orange-600 transition">Smartwatches</a>
          <a href="#refurbished" className="hover:text-orange-600 text-orange-600 font-bold flex items-center gap-1 transition">
            Refurbished Deals (Up to 40% OFF)
          </a>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-600" />
            <input
              type="text"
              placeholder="Search gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex flex-col space-y-2 text-sm font-semibold">
            <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600">
              Shop by Categories
            </a>
            <a href="#trending" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600">
              Trending Electronics
            </a>
            <a href="#refurbished" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-orange-50 text-orange-600 flex items-center justify-between">
              <span>Refurbished Marketplace</span>
              <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded">Verified</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenValuation();
              }}
              className="text-left w-full px-3 py-2 rounded-lg text-emerald-600 hover:bg-emerald-50 font-bold"
            >
              Sell Device & Get Cash
            </button>
          </div>
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3 font-bold text-sm"
            >
              Sign In / Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}