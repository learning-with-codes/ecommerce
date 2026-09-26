"use client";

import React, { useState } from "react";
import TopAnnouncement from "@/components/structure/TopAnnouncement";
import Navbar from "@/components/structure/Navbar";
import HeroCarousel from "@/components/structure/HeroCarousel";
import FeatureStrip from "@/components/structure/FeatureStrip";
import CategorySection from "@/components/structure/CategorySection";
import TrendingSection from "@/components/structure/TrendingSection";
import RefurbishedSection from "@/components/structure/RefurbishedSection";
import SellCalculator from "@/components/structure/SellCalculator";
import ReviewsSection from "@/components/structure/ReviewsSection";
import Footer from "@/components/structure/Footer";
import Modals from "@/components/structure/Modals";

import { Product, CartItem } from "@/types/retech";

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [activeCategoryTab, setActiveCategoryTab] = useState("all");

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [valuationOpen, setValuationOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* 1. Festive Top Ribbon */}
      <TopAnnouncement onOpenValuation={() => setValuationOpen(true)} />

      {/* 2. Primary Navigation Bar */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        onOpenValuation={() => setValuationOpen(true)}
      />

      <main className="flex-1">
        {/* 3. Hero Carousel Banner */}
        <HeroCarousel onOpenValuation={() => setValuationOpen(true)} />

        {/* 4. Trust Badges & Guarantee Strip */}
        <FeatureStrip />

        {/* 5. Featured Electronics Categories */}
        <CategorySection
          activeCategoryTab={activeCategoryTab}
          onSelectCategory={setActiveCategoryTab}
        />

        {/* 6. Trending Hardware Deals */}
        <TrendingSection
          activeCategoryTab={activeCategoryTab}
          onSelectCategory={setActiveCategoryTab}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />

        {/* 7. Certified Refurbished Marketplace */}
        <RefurbishedSection onAddToCart={handleAddToCart} />

        {/* 8. Instant Cash Sell Valuation Calculator */}
        <SellCalculator onOpenValuation={() => setValuationOpen(true)} />

        {/* 9. Verified Customer Reviews */}
        <ReviewsSection />
      </main>

      {/* 10. Footer Section */}
      <Footer />

      {/* 11. Modals (Cart, Wishlist, Split Authentication, Valuation Pickup) */}
      <Modals
        cartOpen={cartOpen}
        onCloseCart={() => setCartOpen(false)}
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        wishlistOpen={wishlistOpen}
        onCloseWishlist={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onRemoveWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        authOpen={authOpen}
        onCloseAuth={() => setAuthOpen(false)}
        valuationOpen={valuationOpen}
        onCloseValuation={() => setValuationOpen(false)}
      />
    </div>
  );
}