'use client';

import React, { useState } from 'react';
import Navbar from '@/components/structure/Navbar';
import SellCalculator from '@/components/structure/SellCalculator';
import RefurbishedStore from '@/components/structure/RefurbishedStore';
import RepairEstimator from '@/components/structure/RepairEstimator';
import { CityModal, CartDrawer } from '@/components/structure/Modals';
import Footer from '@/components/structure/Footer';
import {
  HERO_SLIDES,
  CATEGORIES,
  TESTIMONIALS,
  BRANDS,
  REFURBISHED_PHONES
} from '@/data/retechData';
import { CartItem, RefurbishedPhoneItem, ActiveTab } from '@/types/retech';
import {
  ArrowRight,
  Star,
  Zap,
  Smartphone,
  Laptop,
  Wrench,
  RefreshCw,
  ShieldCheck,
  Truck,
  Lock,
  ChevronRight,
  ShoppingCart
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedCity, setSelectedCity] = useState<string>('Kolkata');
  const [showCityModal, setShowCityModal] = useState<boolean>(false);
  const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: RefurbishedPhoneItem) => {
    const exists = cart.find(i => i.id === product.id);
    if (exists) {
      setCart(cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setShowCartDrawer(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Top Banner Alert */}
      <div className="bg-slate-950 text-slate-300 text-[11px] sm:text-xs py-2 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              Offer
            </span>
            <span className="truncate">Get Extra ₹1,500 Exchange Bonus on Selling iPhones & Galaxies!</span>
          </div>
          <div className="hidden lg:flex items-center gap-5 text-slate-400 shrink-0">
            <span className="hover:text-indigo-400 cursor-pointer flex items-center gap-1" onClick={() => setActiveTab('repair')}>
              <Wrench className="w-3.5 h-3.5 text-indigo-400" /> Doorstep Repair
            </span>
            <span className="hover:text-indigo-400 cursor-pointer flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> 32-Point Quality Guarantee
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar
        selectedCity={selectedCity}
        setShowCityModal={setShowCityModal}
        setShowSearchModal={() => {}}
        setShowAuthModal={() => {}}
        isLoggedIn={false}
        userProfile={{ name: 'Demo User' }}
        cartCount={cart.reduce((a, b) => a + b.qty, 0)}
        setShowCartDrawer={setShowCartDrawer}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Categories Horizontal Scroll Strip */}
      <div className="bg-white border-b border-slate-200 overflow-x-auto no-scrollbar py-2.5 px-3 sm:px-4 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 min-w-max">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive =
              (activeTab === 'sell' && cat.id === 'sell-phone') ||
              (activeTab === 'buy' && cat.id === 'buy-refurbished') ||
              (activeTab === 'repair' && cat.id === 'repair');
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => {
                  if (cat.id === 'sell-phone') setActiveTab('sell');
                  else if (cat.id === 'buy-refurbished') setActiveTab('buy');
                  else if (cat.id === 'repair') setActiveTab('repair');
                  else setActiveTab('sell');
                }}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-indigo-600'}`} />
                <span>{cat.label}</span>
                {cat.badge && (
                  <span className="bg-amber-400 text-slate-950 text-[8px] sm:text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 pb-12 sm:pb-16">
        {activeTab === 'home' && (
          <div className="space-y-6 sm:space-y-10">
            {/* Hero Banner Slider Section */}
            <section className="bg-slate-950 text-white py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
                  
                  {/* Left Column: Heading & CTAs */}
                  <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-center lg:text-left">
                    <span className="inline-block text-[10px] sm:text-xs font-bold text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
                      {HERO_SLIDES[0].badge}
                    </span>
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                      {HERO_SLIDES[0].title}
                    </h1>
                    <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                      {HERO_SLIDES[0].subtitle}
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveTab('sell')}
                        className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 shadow-lg transition"
                      >
                        <span>Sell My Phone Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('buy')}
                        className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
                      >
                        Buy Pre-Owned
                      </button>
                    </div>
                  </div>

                  {/* Right Column: AI Valuation Feature Card */}
                  <div className="lg:col-span-5 flex justify-center mt-2 lg:mt-0">
                    <div className="bg-slate-900/80 border border-slate-700/80 p-5 rounded-2xl shadow-xl backdrop-blur-md max-w-sm w-full text-center space-y-3">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-3xl shadow-inner">
                        📱
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-indigo-400 font-bold uppercase tracking-wider">Fast & Verified</p>
                        <h3 className="text-base sm:text-lg font-bold text-white">Instant AI Price Engine</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">Get highest market value for your device today</p>
                      </div>
                      <div className="pt-2 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <p className="font-black text-white text-xs sm:text-sm">32+</p>
                          <p className="text-slate-400 text-[9px]">Lab Checks</p>
                        </div>
                        <div className="border-x border-slate-800">
                          <p className="font-black text-white text-xs sm:text-sm">100%</p>
                          <p className="text-slate-400 text-[9px]">Data Wipe</p>
                        </div>
                        <div>
                          <p className="font-black text-white text-xs sm:text-sm">Instant</p>
                          <p className="text-slate-400 text-[9px]">UPI Payout</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Quick Service Cards Grid (4 Cards) */}
            <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-6 sm:-mt-10">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-600" />
                    What would you like to do?
                  </h2>
                  <span
                    className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer"
                    onClick={() => setActiveTab('sell')}
                  >
                    All Services →
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div
                    onClick={() => setActiveTab('sell')}
                    className="group p-3 sm:p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 hover:border-indigo-500 transition cursor-pointer hover:shadow-md"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition">
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">Sell Old Mobile</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Instant Cash at Doorstep</p>
                  </div>

                  <div
                    onClick={() => setActiveTab('buy')}
                    className="group p-3 sm:p-4 rounded-xl border border-purple-100 bg-purple-50/40 hover:border-purple-500 transition cursor-pointer hover:shadow-md"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">Buy Refurbished</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">6 Months Warranty & Box</p>
                  </div>

                  <div
                    onClick={() => setActiveTab('repair')}
                    className="group p-3 sm:p-4 rounded-xl border border-violet-100 bg-violet-50/40 hover:border-violet-500 transition cursor-pointer hover:shadow-md"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition">
                      <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">Repair Phone</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">Doorstep Screen / Battery</p>
                  </div>

                  <div
                    onClick={() => setActiveTab('sell')}
                    className="group p-3 sm:p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-indigo-400 transition cursor-pointer hover:shadow-md"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition">
                      <Laptop className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">Sell Laptop</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">MacBooks & Windows PC</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Select Brand Quick Valuation Bar */}
            <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-1">
                  <div>
                    <span className="text-indigo-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Select Brand</span>
                    <h2 className="text-lg sm:text-2xl font-black text-slate-900">Get Instant Cash Value</h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('sell')}
                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>All brands</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3">
                  {BRANDS.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => setActiveTab('sell')}
                      className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition group"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 text-white font-black text-sm sm:text-base flex items-center justify-center group-hover:scale-105 transition">
                        {b.logo}
                      </div>
                      <span className="font-bold text-[11px] sm:text-xs text-slate-900 text-center truncate w-full">{b.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Top Deals on Refurbished Flagships */}
            <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-1">
                <div>
                  <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                    Deals on Refurbished Phones
                  </h2>
                  <p className="text-slate-500 text-[11px] sm:text-xs">32-Point Quality Inspected with 6-Month Warranty</p>
                </div>
                <button
                  onClick={() => setActiveTab('buy')}
                  className="text-indigo-600 hover:text-indigo-700 font-bold text-xs flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>View Full Store</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {REFURBISHED_PHONES.slice(0, 4).map((phone) => (
                  <div
                    key={phone.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-indigo-400 transition flex flex-col p-4 sm:p-5 group"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                        {phone.grade}
                      </span>
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Save {Math.round(((phone.originalPrice - phone.price) / phone.originalPrice) * 100)}%
                      </span>
                    </div>

                    <div className="py-4 sm:py-6 flex items-center justify-center bg-slate-50 rounded-xl mb-3 group-hover:bg-indigo-50/20 transition text-4xl sm:text-5xl">
                      {phone.emoji}
                    </div>

                    <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold mb-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{phone.rating}</span>
                      <span className="text-slate-400 text-[10px]">({phone.reviewsCount})</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-indigo-600 transition truncate">
                      {phone.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{phone.storage} • {phone.color}</p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm sm:text-base font-black text-slate-900">₹{phone.price.toLocaleString()}</p>
                        <p className="text-[10px] text-slate-400 line-through">₹{phone.originalPrice.toLocaleString()}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(phone)}
                        className="p-2 sm:p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Trust Pillars (Cashify Replicated Assurances) */}
            <section className="bg-slate-900 text-white py-10 sm:py-16 border-y border-slate-800">
              <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
                  <span className="text-indigo-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase">The ReTech Assurance</span>
                  <h2 className="text-xl sm:text-3xl font-black tracking-tight mt-1">Why Sell & Buy on ReTech?</h2>
                  <p className="text-slate-400 text-xs mt-1">Certified recommerce platform built for doorstep convenience.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="bg-slate-800/80 border border-slate-700 p-5 sm:p-6 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-white">Instant UPI Payout</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Instant transfer directly to your UPI/Bank account during device pickup.
                    </p>
                  </div>

                  <div className="bg-slate-800/80 border border-slate-700 p-5 sm:p-6 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-3">
                      <Truck className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-white">Free Doorstep Pickup</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Our verified executive arrives right at your home or office.
                    </p>
                  </div>

                  <div className="bg-slate-800/80 border border-slate-700 p-5 sm:p-6 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-3">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-white">32-Point Quality Lab</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Rigorous testing ensures all devices perform at OEM standards.
                    </p>
                  </div>

                  <div className="bg-slate-800/80 border border-slate-700 p-5 sm:p-6 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-3">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-white">100% Data Erasure</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Complete certified data sanitization to safeguard personal privacy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 mb-4 sm:mb-6">What ReTech Users Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {TESTIMONIALS.map((t) => (
                  <div key={t.id} className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                    <div className="flex text-amber-400 mb-2">
                      {[...Array(t.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">"{t.text}"</p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900">{t.name} ({t.city})</span>
                      <span className="text-indigo-600 font-semibold">{t.device}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Tab Views */}
        {activeTab === 'sell' && <SellCalculator selectedCity={selectedCity} />}
        {activeTab === 'buy' && <RefurbishedStore onAddToCart={handleAddToCart} />}
        {activeTab === 'repair' && <RepairEstimator />}
      </main>

      {/* Modals & Overlays */}
      <CityModal
        isOpen={showCityModal}
        onClose={() => setShowCityModal(false)}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />

      <CartDrawer
        isOpen={showCartDrawer}
        onClose={() => setShowCartDrawer(false)}
        cart={cart}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          setCart([]);
          setShowCartDrawer(false);
          alert('Order confirmed successfully on ReTech!');
        }}
      />

      <Footer onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}