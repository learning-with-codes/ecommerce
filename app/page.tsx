"use client";

import React, { useState, useEffect } from "react";
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
import CheckoutModal from "@/components/structure/CheckoutModal";
import AccountModal from "@/components/structure/AccountModal";

import { Product, CartItem, AuthUser } from "@/types/retech";
import { getCurrentUser, logoutUser } from "@/lib/auth/authService";

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [activeCategoryTab, setActiveCategoryTab] = useState("all");

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [valuationOpen, setValuationOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountTab, setAccountTab] = useState<"orders" | "sell_requests" | "profile">("orders");

  useEffect(() => {
    // Check active login state on mount
    getCurrentUser().then((user) => {
      if (user) setCurrentUser(user);
    });
  }, []);

  const handleSignOut = async () => {
    await logoutUser();
    setCurrentUser(null);
  };

  const handleOpenAccount = (tab: "orders" | "sell_requests" | "profile" = "orders") => {
    setAccountTab(tab);
    setAccountOpen(true);
  };

  const handleOrderPlaced = () => {
    // Keep cart cleared
    setCart([]);
  };

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
        currentUser={currentUser}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        onOpenValuation={() => setValuationOpen(true)}
        onOpenAccount={handleOpenAccount}
        onSignOut={handleSignOut}
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
        onOpenCheckout={() => setCheckoutOpen(true)}
        wishlistOpen={wishlistOpen}
        onCloseWishlist={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onRemoveWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        authOpen={authOpen}
        onCloseAuth={() => setAuthOpen(false)}
        onAuthSuccess={(user) => setCurrentUser(user)}
        currentUser={currentUser}
        valuationOpen={valuationOpen}
        onCloseValuation={() => setValuationOpen(false)}
      />

      {/* 12. Checkout Modal with Doorstep Delivery & Payment */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        currentUser={currentUser}
        onOrderPlaced={handleOrderPlaced}
        onClearCart={() => setCart([])}
      />

      {/* 13. My Account, Orders History & Sell Bookings Modal */}
      <AccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
        currentUser={currentUser}
        onOpenShopping={() => {
          setAccountOpen(false);
          const el = document.getElementById("trending");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        initialTab={accountTab}
      />
    </div>
  );
}