"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Zap,
  Search,
  Sparkles,
  RefreshCcw,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { AuthUser } from "@/types/retech";

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  currentUser?: AuthUser | null;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onOpenValuation: () => void;
  onOpenAccount?: (tab?: "orders" | "sell_requests" | "profile") => void;
  onSignOut: () => void;
}

export default function Navbar({
  cartCount,
  wishlistCount,
  currentUser,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onOpenValuation,
  onOpenAccount,
  onSignOut,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <a
            href="#trending"
            className="text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors"
          >
            Buy Electronics
          </a>
          <a
            href="#refurbished"
            className="text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors flex items-center gap-1.5"
          >
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

          {/* User Profile or Login Button */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="inline-flex items-center gap-2 p-1 sm:px-3 sm:py-1.5 border rounded-full sm:rounded-xl border-orange-200 bg-orange-50/80 hover:bg-orange-100 text-slate-800 transition shadow-sm"
                aria-label="User Profile"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-extrabold text-xs flex items-center justify-center shadow-sm overflow-hidden">
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>
                      {currentUser.name
                        ? currentUser.name.charAt(0).toUpperCase()
                        : "U"}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-extrabold text-xs max-w-[100px] truncate text-slate-900 leading-tight">
                    {currentUser.name?.split(" ")[0] || "Profile"}
                  </span>
                  <span className="text-[10px] text-orange-600 font-semibold leading-none">
                    Verified
                  </span>
                </div>
                <ChevronDown className="hidden sm:inline h-3.5 w-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <p className="font-extrabold text-sm text-slate-900 truncate">
                        {currentUser.name || "ReTech Member"}
                      </p>
                      <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {currentUser.email}
                    </p>
                    {currentUser.phone && (
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {currentUser.phone}
                      </p>
                    )}
                  </div>

                  <div className="py-1 text-xs font-semibold text-slate-700">
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        onOpenAccount?.("orders");
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-between"
                    >
                      <span>My Orders & Invoices</span>
                      <span className="text-[10px] text-orange-600 font-extrabold">Track</span>
                    </button>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        onOpenAccount?.("sell_requests");
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-between"
                    >
                      <span>Doorstep Sell Requests</span>
                      <span className="text-[10px] text-emerald-600 font-bold">Active</span>
                    </button>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        onOpenWishlist();
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-between"
                    >
                      <span>Saved Wishlist</span>
                      <span className="bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        {wishlistCount}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        onOpenAccount?.("profile");
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 flex items-center justify-between"
                    >
                      <span>Profile & Address</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100 px-2">
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        onSignOut();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenAuth();
              }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border rounded-xl border-slate-200 font-bold text-slate-800 hover:border-orange-500 hover:text-orange-600 transition text-xs sm:text-sm bg-white shadow-sm"
              aria-label="Login or Register"
            >
              <User className="h-4 w-4 text-orange-600 flex-shrink-0" />
              <span>Login</span>
            </button>
          )}

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
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Quick Category Subbar */}
      <div className="hidden md:block bg-slate-50 border-t border-slate-200/80 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold text-slate-600">
          <a href="#categories" className="hover:text-orange-600 transition">
            Smartphones
          </a>
          <a href="#categories" className="hover:text-orange-600 transition">
            MacBooks & Laptops
          </a>
          <a href="#categories" className="hover:text-orange-600 transition">
            iPads & Tablets
          </a>
          <a href="#categories" className="hover:text-orange-600 transition">
            Earbuds & Headphones
          </a>
          <a href="#categories" className="hover:text-orange-600 transition">
            Smartwatches
          </a>
          <a
            href="#refurbished"
            className="hover:text-orange-600 text-orange-600 font-bold flex items-center gap-1 transition"
          >
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
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600"
            >
              Shop by Categories
            </a>
            <a
              href="#trending"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600"
            >
              Trending Electronics
            </a>
            <a
              href="#refurbished"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-orange-50 text-orange-600 flex items-center justify-between"
            >
              <span>Refurbished Marketplace</span>
              <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded">
                Verified
              </span>
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
            {currentUser ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-orange-50/80 border border-orange-100 rounded-2xl">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-bold text-sm flex items-center justify-center shadow">
                    {currentUser.name
                      ? currentUser.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold text-sm text-slate-900 truncate">
                      {currentUser.name || "Member"}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAccount?.("orders");
                    }}
                    className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs text-center transition"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAccount?.("sell_requests");
                    }}
                    className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs text-center transition"
                  >
                    Sell Requests
                  </button>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl py-2.5 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3 font-bold text-sm shadow-md shadow-orange-600/20 active:scale-[0.99] transition"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
