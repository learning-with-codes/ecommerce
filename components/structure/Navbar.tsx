'use client';

import React, { useState } from 'react';
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  Zap,
  RefreshCw,
  Wrench,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { ActiveTab } from '@/types/retech';

interface NavbarProps {
  selectedCity: string;
  setShowCityModal: (open: boolean) => void;
  setShowSearchModal: (open: boolean) => void;
  setShowAuthModal: (open: boolean) => void;
  isLoggedIn: boolean;
  userProfile: { name: string };
  cartCount: number;
  setShowCartDrawer: (open: boolean) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Navbar({
  selectedCity,
  setShowCityModal,
  setShowSearchModal,
  setShowAuthModal,
  isLoggedIn,
  userProfile,
  cartCount,
  setShowCartDrawer,
  activeTab,
  setActiveTab
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs w-full">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        
        {/* TOP ROW: Brand, Search, Desktop/Tab Links, Cart, Login */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-1.5 sm:gap-3">
          
          {/* Left: Hamburger & Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 xl:hidden cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-indigo-600" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-sm sm:text-xl shadow-md shrink-0">
                R
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-xl xl:text-2xl tracking-tight text-slate-900 leading-none">
                  Re<span className="text-indigo-600">Tech</span>
                </span>
                <span className="text-[7px] sm:text-[8px] uppercase tracking-widest text-slate-400 font-bold hidden xs:inline-block">
                  Smart ReCommerce
                </span>
              </div>
            </div>
          </div>

          {/* City Trigger (Tablet & Desktop) */}
          <button
            type="button"
            onClick={() => setShowCityModal(true)}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition shrink-0 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="max-w-[70px] lg:max-w-[90px] truncate">{selectedCity}</span>
            <ChevronRight className="w-3 h-3 text-slate-400 rotate-90 shrink-0" />
          </button>

          {/* Search Bar (Tablet & Desktop Responsive Fit) */}
          <div className="hidden md:flex flex-1 min-w-[140px] max-w-xs lg:max-w-md">
            <div
              onClick={() => setShowSearchModal(true)}
              className="flex items-center w-full px-3 py-1.5 lg:py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-transparent focus-within:border-indigo-500 text-xs lg:text-sm text-slate-500 cursor-pointer transition"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
              <span className="truncate text-xs">Search mobile, repairs...</span>
              <kbd className="hidden lg:inline-block ml-auto text-[9px] bg-white border border-slate-300 rounded px-1 py-0.5 text-slate-400 font-mono">⌘K</kbd>
            </div>
          </div>

          {/* Desktop Full Text Nav Links (Shown only on Large Desktop 1280px+) */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('sell')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'sell' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-indigo-600" />
              <span>Sell Device</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('buy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'buy' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
              <span>Store</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('repair')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'repair' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-indigo-600" />
              <span>Repair</span>
            </button>
          </div>

          {/* Tablet Quick Icon Buttons (Between 768px and 1279px) */}
          <div className="hidden md:flex xl:hidden items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('sell')}
              className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'sell' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-700 hover:bg-slate-100'
              }`}
              title="Sell Device"
            >
              <Zap className="w-4 h-4 text-indigo-600" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('buy')}
              className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'buy' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-700 hover:bg-slate-100'
              }`}
              title="Store"
            >
              <RefreshCw className="w-4 h-4 text-indigo-600" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('repair')}
              className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'repair' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-700 hover:bg-slate-100'
              }`}
              title="Repair"
            >
              <Wrench className="w-4 h-4 text-indigo-600" />
            </button>
          </div>

          {/* Right Action Icons: City (Mobile) + Cart + Login (ALWAYS 100% VISIBLE) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto md:ml-0">
            
            {/* Mobile City Selector Pill */}
            <button
              type="button"
              onClick={() => setShowCityModal(true)}
              className="md:hidden flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-bold cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-indigo-600" />
              <span className="max-w-[48px] truncate">{selectedCity.split(' ')[0]}</span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setShowCartDrawer(true)}
              className="relative p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition cursor-pointer shrink-0"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white font-black text-[9px] sm:text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login / Profile Button */}
            {isLoggedIn ? (
              <div className="flex items-center gap-1 bg-indigo-50 border border-indigo-200 py-1 px-2 rounded-xl cursor-pointer shrink-0">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                  {userProfile.name.charAt(0)}
                </div>
                <span className="hidden xl:inline text-xs font-bold text-slate-800">
                  {userProfile.name.split(' ')[0]}
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-xs font-bold shadow-xs transition cursor-pointer shrink-0"
              >
                <User className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Login</span>
              </button>
            )}
          </div>

        </div>

        {/* BOTTOM ROW: Mobile Dedicated Search (Under 768px only) */}
        <div className="md:hidden pb-2.5 pt-0.5">
          <div
            onClick={() => setShowSearchModal(true)}
            className="flex items-center w-full px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/60 text-xs text-slate-500 cursor-pointer transition"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
            <span className="truncate text-xs">Search mobile models, repairs, prices...</span>
          </div>
        </div>

      </div>

      {/* Slide-Down Navigation Drawer for Mobile & Tablet */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2 shadow-xl w-full animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Delivery City:</span>
            <button
              onClick={() => { setShowCityModal(true); setMobileMenuOpen(false); }}
              className="text-xs font-bold text-indigo-600 flex items-center gap-1 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" /> {selectedCity} (Change)
            </button>
          </div>
          <button
            onClick={() => handleNavClick('sell')}
            className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold cursor-pointer ${
              activeTab === 'sell' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Zap className="w-4 h-4 text-indigo-600" /> Sell Used Phone (Instant Cash)
          </button>
          <button
            onClick={() => handleNavClick('buy')}
            className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold cursor-pointer ${
              activeTab === 'buy' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-indigo-600" /> Certified Refurbished Store
          </button>
          <button
            onClick={() => handleNavClick('repair')}
            className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold cursor-pointer ${
              activeTab === 'repair' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Wrench className="w-4 h-4 text-indigo-600" /> Book Doorstep Repair
          </button>
        </div>
      )}
    </header>
  );
}