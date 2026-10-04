"use client";

import React, { useState } from "react";
import {
  X,
  Trash2,
  ArrowRight,
  Heart,
  Zap,
  Smartphone,
  Laptop,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
  Truck,
  Star,
  Check,
  AlertCircle,
  Loader2,
  Lock,
  ShoppingBag,
  Sparkles,
  Plus,
  Minus,
  Info,
} from "lucide-react";
import { Product, CartItem, AuthUser } from "@/types/retech";
import {
  loginWithEmail,
  signUpWithEmail,
  loginWithGoogle,
  getCurrentUser,
} from "@/lib/auth/authService";
import { createSellRequest } from "@/lib/services/valuationsService";

interface ModalsProps {
  cartOpen: boolean;
  onCloseCart: () => void;
  cart: CartItem[];
  onUpdateCartQty: (productId: string, delta: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onOpenCheckout: () => void;
  onClearCart?: () => void;
  onMoveToWishlist?: (product: Product) => void;

  wishlistOpen: boolean;
  onCloseWishlist: () => void;
  wishlist: Product[];
  onAddToCart: (p: Product) => void;
  onRemoveWishlist: (productId: string) => void;
  onViewDetails?: (p: Product) => void;

  authOpen: boolean;
  onCloseAuth: () => void;
  onOpenAuth?: () => void;
  onAuthSuccess?: (user: AuthUser) => void;
  currentUser?: AuthUser | null;
  authNotice?: string | null;

  valuationOpen: boolean;
  onCloseValuation: () => void;
}

export default function Modals({
  cartOpen,
  onCloseCart,
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  onOpenCheckout,
  onClearCart,
  onMoveToWishlist,
  wishlistOpen,
  onCloseWishlist,
  wishlist,
  onAddToCart,
  onRemoveWishlist,
  onViewDetails,
  authOpen,
  onCloseAuth,
  onOpenAuth,
  onAuthSuccess,
  currentUser,
  authNotice,
  valuationOpen,
  onCloseValuation,
}: ModalsProps) {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authSuccessMsg, setAuthSuccessMsg] = useState("");
  
  // Valuation Form State
  const [valName, setValName] = useState(currentUser?.name || "");
  const [valPhone, setValPhone] = useState(currentUser?.phone || "+91 ");
  const [valAddress, setValAddress] = useState("");
  const [valLoading, setValLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookedRequestNumber, setBookedRequestNumber] = useState("");

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartOriginalSubtotal = cart.reduce(
    (acc, item) => acc + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );
  const totalSavings = Math.max(0, cartOriginalSubtotal - cartSubtotal);
  const totalCartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* 1. Ultra-Professional E-Commerce Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onCloseCart} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            {/* Cart Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/90">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-600/20">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-slate-950 leading-tight">
                    Shopping Cart
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    {totalCartQuantity} {totalCartQuantity === 1 ? "item" : "items"} in your cart
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {cart.length > 0 && onClearCart && (
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-[11px] font-bold text-slate-400 hover:text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50 transition"
                    title="Remove all items"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={onCloseCart}
                  className="p-2 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Persistent Login / Guest Status Strip */}
            <div className="px-4 py-2.5 bg-slate-100/90 border-b border-slate-200/80">
              {currentUser ? (
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>Permanent Cart • Saved to your account</span>
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full truncate max-w-[130px]">
                    {currentUser.email?.split("@")[0]}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="flex items-center gap-1.5 text-amber-800 font-medium leading-tight">
                    <Info className="h-4 w-4 text-amber-600 flex-shrink-0" />
                    <span>
                      <strong>Guest Cart:</strong> Resets on page refresh.
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onCloseCart();
                      onOpenAuth?.();
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-sm transition active:scale-95 whitespace-nowrap"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>

            {/* Free Delivery Unlock Progress Banner */}
            {cart.length > 0 && (
              <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-emerald-600" />
                  <span>Doorstep Bluedart Air Delivery:</span>
                </span>
                <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  FREE (₹0)
                </span>
              </div>
            )}

            {/* Cart Items Scrollable Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
              {cart.length === 0 ? (
                /* High-Fidelity Empty Cart State */
                <div className="text-center py-12 px-4 space-y-5">
                  <div className="h-24 w-24 rounded-3xl bg-orange-100/70 border border-orange-200 text-orange-600 flex items-center justify-center mx-auto shadow-inner">
                    <ShoppingBag className="h-12 w-12 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-black text-xl text-slate-900">
                      Your Shopping Cart is Empty
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                      Explore certified refurbished smartphones, MacBooks, audio gear and gaming consoles with 1-year replacement warranty.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onCloseCart();
                        const trendingEl = document.getElementById("trending");
                        trendingEl?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-6 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-2xl font-bold text-xs shadow-lg shadow-orange-600/25 transition active:scale-95 inline-flex items-center gap-2"
                    >
                      <Sparkles className="h-4 w-4" /> Browse Trending Deals
                    </button>
                  </div>
                </div>
              ) : (
                /* Item Cards List */
                cart.map(({ product, quantity }) => {
                  const savings = Math.max(0, product.originalPrice - product.price);
                  return (
                    <div
                      key={product.id}
                      className="p-3.5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:border-orange-300 transition-all space-y-3"
                    >
                      <div className="flex gap-3 items-start">
                        {/* Thumbnail */}
                        <div
                          onClick={() => {
                            onCloseCart();
                            onViewDetails?.(product);
                          }}
                          className="relative h-20 w-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 cursor-pointer border border-slate-200/80 group"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute bottom-1 left-1 bg-slate-900/90 text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                            {product.brand}
                          </span>
                        </div>

                        {/* Title, Condition & Price */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wide text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                              {product.condition || "Refurbished - Like New"}
                            </span>
                            <button
                              type="button"
                              onClick={() => onRemoveFromCart(product.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                              title="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <h4
                            onClick={() => {
                              onCloseCart();
                              onViewDetails?.(product);
                            }}
                            className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 hover:text-orange-600 cursor-pointer transition-colors"
                          >
                            {product.name}
                          </h4>

                          <p className="text-[11px] text-slate-500 flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3 text-emerald-600" />
                            <span>{product.warranty || "1 Year ReTech Warranty"}</span>
                          </p>

                          <div className="flex items-baseline gap-2 pt-0.5">
                            <span className="text-sm sm:text-base font-black text-slate-950">
                              ₹{(product.price * quantity).toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs text-slate-400 line-through">
                              ₹{(product.originalPrice * quantity).toLocaleString("en-IN")}
                            </span>
                            {savings > 0 && (
                              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                Save ₹{(savings * quantity).toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Controls Row: Quantity Stepper & Save to Wishlist */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
                          <button
                            type="button"
                            onClick={() => onUpdateCartQty(product.id, -1)}
                            className="h-6 w-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-90 transition font-bold"
                            title="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 font-black text-xs text-slate-900">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateCartQty(product.id, 1)}
                            className="h-6 w-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-90 transition font-bold"
                            title="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {onMoveToWishlist && (
                          <button
                            type="button"
                            onClick={() => onMoveToWishlist(product)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50 transition"
                          >
                            <Heart className="h-3.5 w-3.5" /> Save for Later
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Sticky Order Summary & Checkout Bottom Bar */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 space-y-3.5 shadow-inner">
                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalCartQuantity} items):</span>
                    <span className="font-bold text-slate-900">
                      ₹{cartOriginalSubtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Refurbished Savings:</span>
                      <span>-₹{totalSavings.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Express Air Delivery:</span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-black text-base pt-2 border-t border-slate-200">
                    <span>Total Amount:</span>
                    <span className="text-orange-600">
                      ₹{cartSubtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Primary Proceed CTA Button */}
                <button
                  type="button"
                  onClick={() => {
                    onCloseCart();
                    onOpenCheckout();
                  }}
                  className="w-full inline-flex items-center justify-between bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white p-4 rounded-2xl font-black text-sm shadow-xl shadow-orange-600/30 transition hover:scale-[1.01] active:scale-95"
                >
                  <span className="flex items-center gap-2">
                    {!currentUser && <Lock className="h-4 w-4" />}
                    <span>{currentUser ? "Proceed to Checkout" : "Sign In & Checkout"}</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-xl text-xs font-black">
                    ₹{cartSubtotal.toLocaleString("en-IN")}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </button>

                {/* Trust Guarantee Strip */}
                <div className="grid grid-cols-3 gap-1 pt-1 text-center text-[10px] text-slate-500 font-semibold border-t border-slate-200/60">
                  <div className="flex items-center justify-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-600" /> 1-Yr Warranty
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <RotateCcw className="h-3 w-3 text-emerald-600" /> 7-Day Return
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Lock className="h-3 w-3 text-emerald-600" /> 256-Bit SSL
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Professional Wishlist Modal */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onCloseWishlist} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-5 sm:p-6 shadow-2xl z-10 max-h-[85vh] flex flex-col border border-slate-100">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Heart className="h-5 w-5 fill-rose-600" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900 leading-tight">
                    Saved Wishlist
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    {wishlist.length} {wishlist.length === 1 ? "device saved" : "devices saved"}
                    {currentUser ? " • Saved to your account" : " • Guest session"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onCloseWishlist}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {wishlist.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="h-16 w-16 rounded-2xl bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
                    <Heart className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Your wishlist is empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Tap the heart icon on any product to save it here for quick access later.
                  </p>
                </div>
              ) : (
                wishlist.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 border border-slate-200 rounded-2xl hover:border-orange-300 transition bg-white shadow-sm gap-3"
                  >
                    <div
                      onClick={() => {
                        onCloseWishlist();
                        onViewDetails?.(p);
                      }}
                      className="flex items-center gap-3 cursor-pointer group flex-1 min-w-0"
                    >
                      <div className="relative h-14 w-14 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200/80">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-black text-orange-600 uppercase">
                          {p.brand}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-orange-600 transition-colors">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-black text-slate-900">
                            ₹{p.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-slate-400 line-through">
                            ₹{p.originalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(p);
                          onRemoveWishlist(p.id);
                        }}
                        className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-md shadow-orange-600/20 active:scale-95 inline-flex items-center gap-1.5"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" /> Move to Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveWishlist(p.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Split Auth Modal */}
      {authOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCloseAuth();
              setAuthSuccessMsg("");
            }} 
          />

          {/* Modal Dialog */}
          <div 
            className="relative z-20 w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[92vh] border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Visual Column */}
            <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 text-white p-8 flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-orange-400 text-[11px] font-extrabold uppercase tracking-wider">
                  <Zap className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
                  India&apos;s #1 Re-Commerce Store
                </div>
                <h3 className="text-2xl font-black tracking-tight leading-tight text-white">
                  Join 50,000+ <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                    Smart Tech Shoppers
                  </span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unlock member-only discounts on certified flagships, zero-deduction sell quotes & warranty tracking.
                </p>
              </div>

              <div className="relative my-6 z-10">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900/60 group">
                  <img
                    src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=80"
                    alt="Phones and Laptops"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                </div>

                <div className="absolute -top-3 -right-2 bg-slate-900/90 backdrop-blur-md border border-orange-500/40 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 text-[11px] font-bold text-orange-400 animate-pulse">
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>iPhone 15 • 99% Battery</span>
                </div>

                <div className="absolute -bottom-3 -left-2 bg-slate-900/95 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 text-[11px] text-white font-bold">
                  <Laptop className="h-3.5 w-3.5 text-amber-400" />
                  <span>MacBook M3 • 45-Pt Verified</span>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> 1-Year Warranty
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5 text-orange-400" /> 7-Day Returns
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-400" /> 100% Data Wiped
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-emerald-400" /> Instant Doorstep Cash
                  </span>
                </div>
                
                <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400" />
                    ))}
                  </div>
                  <span>4.9/5 from 12,400+ verified Indian users</span>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto relative">
              <button 
                onClick={() => {
                  onCloseAuth();
                  setAuthSuccessMsg("");
                }} 
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-7 w-7 rounded-lg bg-orange-600 flex items-center justify-center text-white">
                      <Zap className="h-4 w-4 fill-white" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-orange-600">ReTech Account</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {authMode === "login" ? "Welcome Back" : "Create an Account"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {authMode === "login" 
                      ? "Sign in to track orders, manage device buybacks, or view active warranties." 
                      : "Sign up today to explore exclusive refurbished discounts and get doorstep cashouts."}
                  </p>
                </div>

                {authNotice && (
                  <div className="p-3 bg-orange-50 border border-orange-200 text-orange-950 rounded-xl text-xs font-medium flex items-start gap-2.5">
                    <Lock className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-orange-900 block mb-0.5">Account Login Required</span>
                      {authNotice}
                    </div>
                  </div>
                )}

                {authSuccessMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>{authSuccessMsg}</span>
                  </div>
                )}

                {authError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={async () => {
                    setIsGoogleLoading(true);
                    setAuthError("");
                    try {
                      const res = await loginWithGoogle();
                      if (res.error) {
                        setAuthError(res.error);
                        setIsGoogleLoading(false);
                      } else {
                        setAuthSuccessMsg("Google sign in successful!");
                        const u = await getCurrentUser();
                        if (u) onAuthSuccess?.(u);
                        setTimeout(() => {
                          onCloseAuth();
                          setAuthSuccessMsg("");
                          setIsGoogleLoading(false);
                        }, 700);
                      }
                    } catch (err: unknown) {
                      const message = err instanceof Error ? err.message : "Google sign in error";
                      setAuthError(message);
                      setIsGoogleLoading(false);
                    }
                  }}
                  disabled={isGoogleLoading || authLoading}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 shadow-sm transition hover:shadow-md disabled:opacity-60"
                >
                  {isGoogleLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-orange-600" />
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                  )}
                  <span>Continue with Google</span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                    or continue with email
                  </span>
                  <div className="border-t border-slate-200 w-full" />
                </div>

                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setAuthLoading(true);
                    setAuthError("");
                    setAuthSuccessMsg("");

                    try {
                      if (authMode === "login") {
                        const res = await loginWithEmail(authEmail, authPassword);
                        if (res.error) {
                          setAuthError(res.error);
                        } else if (res.user) {
                          setAuthSuccessMsg("Signed in successfully!");
                          onAuthSuccess?.(res.user);
                          setTimeout(() => {
                            onCloseAuth();
                            setAuthSuccessMsg("");
                          }, 700);
                        }
                      } else {
                        const res = await signUpWithEmail(
                          authEmail,
                          authPassword,
                          authName,
                          authPhone
                        );
                        if (res.error) {
                          setAuthError(res.error);
                        } else if (res.user) {
                          setAuthSuccessMsg("Account created and signed in!");
                          onAuthSuccess?.(res.user);
                          setTimeout(() => {
                            onCloseAuth();
                            setAuthSuccessMsg("");
                          }, 700);
                        }
                      }
                    } catch (err: unknown) {
                      const message = err instanceof Error ? err.message : "Authentication failed";
                      setAuthError(message);
                    } finally {
                      setAuthLoading(false);
                    }
                  }} 
                  className="space-y-3.5"
                >
                  {authMode === "signup" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700">Full Name</label>
                        <input
                          type="text"
                          required
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          placeholder="Subham Roy"
                          className="w-full mt-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700">Mobile Number</label>
                        <input
                          type="tel"
                          required
                          value={authPhone}
                          onChange={(e) => setAuthPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full mt-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full mt-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">Password</label>
                      {authMode === "login" && (
                        <button
                          type="button"
                          onClick={() => setAuthSuccessMsg("Password reset instructions have been sent to your email.")}
                          className="text-[11px] font-bold text-orange-600 hover:text-orange-700 hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative mt-1">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[11px] font-bold select-none"
                      >
                        {showPassword ? "HIDE" : "SHOW"}
                      </button>
                    </div>
                  </div>

                  {authMode === "login" && (
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        defaultChecked
                        className="h-3.5 w-3.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                      />
                      <label htmlFor="rememberMe" className="text-xs text-slate-600 select-none">
                        Keep me signed in on this device
                      </label>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={authLoading || isGoogleLoading}
                    className="w-full mt-2 inline-flex items-center justify-center bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-2xl py-3.5 text-sm font-extrabold shadow-lg shadow-orange-600/25 transition-all hover:scale-[1.01] disabled:opacity-60"
                  >
                    {authLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    ) : null}
                    <span>{authMode === "login" ? "Sign In to ReTech" : "Create My Account"}</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </form>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 text-center space-y-2">
                <p className="text-xs text-slate-600">
                  {authMode === "login" ? "New to ReTech? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode(authMode === "login" ? "signup" : "login");
                      setAuthSuccessMsg("");
                    }}
                    className="font-extrabold text-orange-600 hover:text-orange-700 underline underline-offset-2"
                  >
                    {authMode === "login" ? "Create an account" : "Sign in here"}
                  </button>
                </p>
                <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                  Protected by 256-bit SSL encryption. By signing in, you agree to ReTech&apos;s Terms of Service & Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Valuation Booking Modal */}
      {valuationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => { onCloseValuation(); setBookingSuccess(false); }} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-5">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-black text-xl text-slate-900">Book Free Doorstep Pickup</h3>
                <p className="text-xs text-orange-600 font-bold">Instant payout on inspection via UPI / Cash</p>
              </div>
              <button onClick={() => { onCloseValuation(); setBookingSuccess(false); }} className="p-2 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
                <h4 className="font-black text-xl text-slate-900">Pickup Successfully Scheduled!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Booking Reference: <strong className="text-orange-600 font-extrabold">{bookedRequestNumber || "VAL-849201"}</strong>. Our certified diagnostic executive will visit your address. Payout is transferred directly to your UPI/Bank before the technician leaves.
                </p>
                <button
                  type="button"
                  onClick={() => { onCloseValuation(); setBookingSuccess(false); }}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  setValLoading(true);
                  try {
                    const res = await createSellRequest({
                      userId: currentUser?.id,
                      deviceCategory: "smartphones",
                      brand: "Apple",
                      model: "iPhone 14 Pro Max (256GB)",
                      bodyCondition: "Flawless - Like New",
                      screenCondition: "Original Screen (No Scratches)",
                      estimatedCash: 58500,
                      customerName: valName || "Customer",
                      customerPhone: valPhone || "+91 98765 43210",
                      pickupAddress: valAddress || "Kolkata, West Bengal",
                      pickupDate: "Tomorrow",
                      pickupTimeSlot: "11:00 AM - 2:00 PM",
                    });
                    if (res.request) {
                      setBookedRequestNumber(res.request.requestNumber);
                      setBookingSuccess(true);
                    }
                  } catch (err) {
                    console.error("Valuation booking error:", err);
                  } finally {
                    setValLoading(false);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={valName}
                    onChange={(e) => setValName(e.target.value)}
                    placeholder="Subham Roy"
                    className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Phone Number for Verification *</label>
                  <input
                    type="tel"
                    required
                    value={valPhone}
                    onChange={(e) => setValPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Pickup Address & Pincode *</label>
                  <input
                    type="text"
                    required
                    value={valAddress}
                    onChange={(e) => setValAddress(e.target.value)}
                    placeholder="Flat No. 4B, Greenwood Park, Kolkata 700001"
                    className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={valLoading}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-2xl py-4 font-bold shadow-lg shadow-orange-600/30 transition text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {valLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <span>Confirm Doorstep Inspection (Get ₹58,500)</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}