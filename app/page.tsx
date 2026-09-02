'use client';

import React, { useState } from 'react';
import { SellCalculator } from '@/components/structure/SellCalculator';
import { RefurbishedStore } from '@/components/structure/RefurbishedStore';
import { RepairEstimator } from '@/components/structure/RepairEstimator';
import { CityModal, CartDrawer } from '@/components/structure/Modals';
import { Footer } from '@/components/structure/Footer';
import { HERO_SLIDES, CATEGORIES, TESTIMONIALS } from '@/data/retechData';
import { CartItem, RefurbishedPhoneItem, ActiveTab } from '@/types/retech';
import { ArrowRight, Star } from 'lucide-react';
import { Navbar } from '@/components/structure/Navbar';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
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

      {/* Categories Bar */}
      <div className="bg-slate-100 border-b border-slate-200 overflow-x-auto py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3 min-w-max">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => {
                  if (cat.id === 'sell-phone') setActiveTab('sell');
                  else if (cat.id === 'buy-refurbished') setActiveTab('buy');
                  else if (cat.id === 'repair') setActiveTab('repair');
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-slate-200 hover:border-indigo-500 transition"
              >
                <Icon className="w-3.5 h-3.5 text-indigo-600" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'home' && (
          <div>
            {/* Hero Slider banner */}
            <section className="bg-slate-950 text-white py-12 px-4">
              <div className="max-w-7xl mx-auto rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 border border-slate-800">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
                  {HERO_SLIDES[0].badge}
                </span>
                <h1 className="text-3xl sm:text-5xl font-black mt-4 leading-tight max-w-2xl">
                  {HERO_SLIDES[0].title}
                </h1>
                <p className="text-slate-300 text-sm mt-2 max-w-xl">
                  {HERO_SLIDES[0].subtitle}
                </p>
                <div className="mt-6 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('sell')}
                    className="px-6 py-3 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-lg"
                  >
                    <span>Sell My Phone Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('buy')}
                    className="px-6 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  >
                    Buy Pre-Owned
                  </button>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="max-w-7xl mx-auto px-4 py-12">
              <h2 className="text-2xl font-black text-slate-900 mb-6">What ReTech Users Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TESTIMONIALS.map((t) => (
                  <div key={t.id} className="p-6 bg-white rounded-2xl border border-slate-200">
                    <div className="flex text-amber-400 mb-2">
                      {[...Array(t.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 italic leading-relaxed">{t.text}</p>
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

        {activeTab === 'sell' && <SellCalculator selectedCity={selectedCity} />}
        {activeTab === 'buy' && <RefurbishedStore onAddToCart={handleAddToCart} />}
        {activeTab === 'repair' && <RepairEstimator />}
      </main>

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
          alert('Order placed on ReTech successfully!');
        }}
      />

      <Footer onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}