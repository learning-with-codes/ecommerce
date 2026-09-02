'use client';

import React from 'react';
import { Search, MapPin, ShoppingCart, User, Zap, RefreshCw, Wrench, ChevronRight } from 'lucide-react';
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

export const Navbar: React.FC<NavbarProps> = ({
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
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* ReTech Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition">
              R
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                  Re<span className="text-indigo-600">Tech</span>
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold -mt-1">
                Smart ReCommerce
              </span>
            </div>
          </div>

          {/* City Selection */}
          <button
            type="button"
            onClick={() => setShowCityModal(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition"
          >
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span>{selectedCity}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-90" />
          </button>

          {/* Search Trigger */}
          <div className="flex-1 max-w-xl relative">
            <div
              onClick={() => setShowSearchModal(true)}
              className="flex items-center w-full px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-transparent focus-within:border-indigo-500 text-sm text-slate-500 cursor-pointer transition"
            >
              <Search className="w-4 h-4 text-slate-400 mr-2.5 flex-shrink-0" />
              <span className="truncate">Search mobile models, sell prices, repairs...</span>
              <kbd className="hidden sm:inline-block ml-auto text-[10px] bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-400 font-mono">⌘K</kbd>
            </div>
          </div>

          {/* Action Tabs */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('sell')}
              className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === 'sell' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              <Zap className="w-4 h-4 text-indigo-600" />
              Sell Device
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('buy')}
              className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === 'buy' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              <RefreshCw className="w-4 h-4 text-indigo-600" />
              Certified Store
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('repair')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === 'repair' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              <Wrench className="w-4 h-4 text-indigo-600" />
              Repair
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setShowCartDrawer(true)}
              className="relative p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile / Auth Button */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2 cursor-pointer bg-indigo-50 border border-indigo-200 py-1.5 px-3 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                  {userProfile.name.charAt(0)}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-slate-800">
                  {userProfile.name.split(' ')[0]}
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition"
              >
                <User className="w-4 h-4 text-indigo-400" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};