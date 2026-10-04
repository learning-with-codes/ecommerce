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
import ProductDetailsModal from "@/components/structure/ProductDetailsModal";

import { Product, CartItem, AuthUser } from "@/types/retech";
import { getCurrentUser, logoutUser } from "@/lib/auth/authService";
import {
  fetchUserCart,
  syncUserCart,
  fetchUserWishlist,
  syncUserWishlist,
  purgeGuestStorage,
} from "@/lib/services/cartWishlistService";

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

  // Mandatory Login for Checkout state
  const [pendingCheckout, setPendingCheckout] = useState(false);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  // Product View Details State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDetailsOpen, setProductDetailsOpen] = useState(false);

  useEffect(() => {
    // Purge any stale unauthenticated storage so guests always start with empty cart on refresh
    purgeGuestStorage();

    getCurrentUser().then(async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          // Permanently load authenticated user's cart & wishlist from backend
          const [userCart, userWishlist] = await Promise.all([
            fetchUserCart(user.id),
            fetchUserWishlist(user.id),
          ]);
          setCart(userCart);
          setWishlist(userWishlist);
        } catch (err) {
          console.warn("Failed to load user cart/wishlist:", err);
        }
      } else {
        // Guest user: strictly in-memory; refresh will reset cart & wishlist to []
        setCart([]);
        setWishlist([]);
      }
    });
  }, []);

  const handleSignOut = async () => {
    await logoutUser();
    setCurrentUser(null);
    // Immediately clear in-memory state for unauthenticated visitor
    setCart([]);
    setWishlist([]);
    purgeGuestStorage();
  };

  const handleOpenAccount = (tab: "orders" | "sell_requests" | "profile" = "orders") => {
    setAccountTab(tab);
    setAccountOpen(true);
  };

  const handleOrderPlaced = () => {
    // Keep cart cleared upon order placement
    setCart([]);
    if (currentUser) {
      syncUserCart(currentUser.id, []);
    }
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setProductDetailsOpen(true);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      let nextCart: CartItem[];
      if (existing) {
        nextCart = prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        nextCart = [...prev, { product, quantity }];
      }

      // If logged in: permanently save to backend!
      // If guest (login chara): DO NOT persist; will clear upon refresh!
      if (currentUser) {
        syncUserCart(currentUser.id, nextCart);
      }

      return nextCart;
    });
    setCartOpen(true);
  };

  // Protected Checkout Handlers: Checkout is strictly prohibited without account login
  const handleOpenCheckout = () => {
    if (!currentUser) {
      setAuthNotice(
        "Please sign in or create an account to proceed to checkout. Login is mandatory to link your 1-year replacement warranty, track your Bluedart shipment, and receive your order confirmation email."
      );
      setCartOpen(false);
      setProductDetailsOpen(false);
      setPendingCheckout(true);
      setAuthOpen(true);
      return;
    }
    setCheckoutOpen(true);
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    // 1. Add item to cart so it is preserved
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      let nextCart: CartItem[];
      if (existing) {
        nextCart = prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        nextCart = [...prev, { product, quantity }];
      }

      if (currentUser) {
        syncUserCart(currentUser.id, nextCart);
      }

      return nextCart;
    });
    setProductDetailsOpen(false);

    // 2. Gate check: If user not logged in, redirect to login modal with checkout intent
    if (!currentUser) {
      setAuthNotice(
        `Please sign in or create an account to purchase "${product.name}". Login is mandatory to generate your 45-point warranty certificate and receive doorstep order tracking.`
      );
      setPendingCheckout(true);
      setAuthOpen(true);
      return;
    }

    setCheckoutOpen(true);
  };

  const handleAuthSuccess = async (user: AuthUser) => {
    setCurrentUser(user);
    setAuthNotice(null);

    try {
      // Fetch user's persistent backend cart & wishlist
      const [backendCart, backendWishlist] = await Promise.all([
        fetchUserCart(user.id),
        fetchUserWishlist(user.id),
      ]);

      // Merge transient guest items added in current session before login
      const mergedCart = [...backendCart];
      if (cart.length > 0) {
        for (const guestItem of cart) {
          const existingIdx = mergedCart.findIndex((c) => c.product.id === guestItem.product.id);
          if (existingIdx >= 0) {
            mergedCart[existingIdx].quantity += guestItem.quantity;
          } else {
            mergedCart.push(guestItem);
          }
        }
      }

      const mergedWishlist = [...backendWishlist];
      if (wishlist.length > 0) {
        for (const guestWish of wishlist) {
          if (!mergedWishlist.some((w) => w.id === guestWish.id)) {
            mergedWishlist.push(guestWish);
          }
        }
      }

      setCart(mergedCart);
      setWishlist(mergedWishlist);

      // Permanently sync to backend for this logged-in user
      await Promise.all([
        syncUserCart(user.id, mergedCart),
        syncUserWishlist(user.id, mergedWishlist),
      ]);
    } catch (err) {
      console.warn("Auth sync error:", err);
    }

    // If user was attempting to checkout, seamlessly continue to CheckoutModal!
    if (pendingCheckout) {
      setPendingCheckout(false);
      setCheckoutOpen(true);
    }
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prev) => {
      const nextCart = prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];

      if (currentUser) {
        syncUserCart(currentUser.id, nextCart);
      }

      return nextCart;
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => {
      const nextCart = prev.filter((item) => item.product.id !== productId);
      if (currentUser) {
        syncUserCart(currentUser.id, nextCart);
      }
      return nextCart;
    });
  };

  const handleClearCart = () => {
    setCart([]);
    if (currentUser) {
      syncUserCart(currentUser.id, []);
    }
  };

  const handleMoveToWishlist = (product: Product) => {
    handleRemoveFromCart(product.id);
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      const nextWishlist = [...prev, product];
      if (currentUser) {
        syncUserWishlist(currentUser.id, nextWishlist);
      }
      return nextWishlist;
    });
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      const nextWishlist = exists
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];

      if (currentUser) {
        syncUserWishlist(currentUser.id, nextWishlist);
      }

      return nextWishlist;
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
        <HeroCarousel
          onOpenValuation={() => setValuationOpen(true)}
          onViewDetails={handleViewDetails}
        />

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
          onViewDetails={handleViewDetails}
          onBuyNow={handleBuyNow}
        />

        {/* 7. Certified Refurbished Marketplace */}
        <RefurbishedSection
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
          onBuyNow={handleBuyNow}
        />

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
        onOpenCheckout={handleOpenCheckout}
        onClearCart={handleClearCart}
        onMoveToWishlist={handleMoveToWishlist}
        wishlistOpen={wishlistOpen}
        onCloseWishlist={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onRemoveWishlist={(id) => {
          setWishlist((prev) => {
            const nextList = prev.filter((p) => p.id !== id);
            if (currentUser) {
              syncUserWishlist(currentUser.id, nextList);
            }
            return nextList;
          });
        }}
        onViewDetails={handleViewDetails}
        authOpen={authOpen}
        onCloseAuth={() => {
          setAuthOpen(false);
          setAuthNotice(null);
          setPendingCheckout(false);
        }}
        onOpenAuth={() => setAuthOpen(true)}
        onAuthSuccess={handleAuthSuccess}
        currentUser={currentUser}
        authNotice={authNotice}
        valuationOpen={valuationOpen}
        onCloseValuation={() => setValuationOpen(false)}
      />

      {/* 12. Checkout Modal with Doorstep Delivery, Login Gate & Email Dispatch */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        currentUser={currentUser}
        onOrderPlaced={handleOrderPlaced}
        onClearCart={() => setCart([])}
        onOpenAuth={() => {
          setAuthNotice("Please sign in or create an account to complete your checkout and receive your invoice.");
          setAuthOpen(true);
        }}
        onOpenAccount={handleOpenAccount}
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

      {/* 14. Professional Product View Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={productDetailsOpen}
        onClose={() => setProductDetailsOpen(false)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProduct ? wishlist.some((p) => p.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />
    </div>
  );
}