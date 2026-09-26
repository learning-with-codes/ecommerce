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
  Check
} from "lucide-react";
import { Product, CartItem } from "@/types/retech";

interface ModalsProps {
  cartOpen: boolean;
  onCloseCart: () => void;
  cart: CartItem[];
  onUpdateCartQty: (productId: string, delta: number) => void;
  onRemoveFromCart: (productId: string) => void;

  wishlistOpen: boolean;
  onCloseWishlist: () => void;
  wishlist: Product[];
  onAddToCart: (p: Product) => void;
  onRemoveWishlist: (productId: string) => void;

  authOpen: boolean;
  onCloseAuth: () => void;

  valuationOpen: boolean;
  onCloseValuation: () => void;
}

export default function Modals({
  cartOpen,
  onCloseCart,
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  wishlistOpen,
  onCloseWishlist,
  wishlist,
  onAddToCart,
  onRemoveWishlist,
  authOpen,
  onCloseAuth,
  valuationOpen,
  onCloseValuation,
}: ModalsProps) {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authSuccessMsg, setAuthSuccessMsg] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <>
      {/* 1. Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onCloseCart} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-extrabold text-lg text-slate-900">Your Cart ({cart.length})</h3>
              <button onClick={onCloseCart} className="p-2 rounded-full hover:bg-slate-200 text-slate-500">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <p className="text-slate-400 font-medium">Your cart is completely empty</p>
                  <button
                    onClick={onCloseCart}
                    className="px-5 py-2.5 border border-slate-300 rounded-full font-bold text-xs hover:bg-slate-50"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-4 p-3 border border-slate-200 rounded-2xl items-center bg-white shadow-sm">
                    <div className="relative h-16 w-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs text-slate-900 truncate">{product.name}</p>
                      <p className="text-xs text-orange-600 font-black mt-1">₹{product.price.toLocaleString("en-IN")}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateCartQty(product.id, -1)}
                          className="h-6 w-6 rounded bg-slate-100 text-xs font-bold hover:bg-slate-200"
                        >
                          -
                        </button>
                        <span className="text-xs font-semibold">{quantity}</span>
                        <button
                          onClick={() => onUpdateCartQty(product.id, 1)}
                          className="h-6 w-6 rounded bg-slate-100 text-xs font-bold hover:bg-slate-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(product.id)}
                      className="p-2 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-100 space-y-3 bg-slate-50">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="font-black text-slate-900">₹{cartSubtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Delivery</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <button className="w-full inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-600/30 transition">
                  Proceed to Checkout <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Wishlist Modal */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onCloseWishlist} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl z-10 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-500 fill-rose-500" /> Saved Wishlist ({wishlist.length})
              </h3>
              <button onClick={onCloseWishlist} className="p-2 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {wishlist.length === 0 ? (
                <p className="text-center text-slate-400 py-8 font-medium">No saved items in your wishlist.</p>
              ) : (
                wishlist.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 border rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-lg bg-slate-100 overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</p>
                        <p className="text-xs text-orange-600 font-bold">₹{p.price.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onAddToCart(p);
                          onRemoveWishlist(p.id);
                        }}
                        className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => onRemoveWishlist(p.id)}
                        className="p-2 text-slate-400 hover:text-rose-500"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
          <div 
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity duration-300" 
            onClick={() => {
              onCloseAuth();
              setAuthSuccessMsg("");
            }} 
          />

          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl z-10 flex flex-col md:flex-row overflow-hidden max-h-[92vh] border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
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

                {authSuccessMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>{authSuccessMsg}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsGoogleLoading(true);
                    setTimeout(() => {
                      setIsGoogleLoading(false);
                      setAuthSuccessMsg("Successfully authenticated with Google account!");
                      setTimeout(() => onCloseAuth(), 1200);
                    }, 900);
                  }}
                  disabled={isGoogleLoading}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 shadow-sm transition hover:shadow-md disabled:opacity-60"
                >
                  {isGoogleLoading ? (
                    <div className="h-5 w-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    setAuthSuccessMsg(authMode === "login" ? "Signed in successfully!" : "Account created successfully!");
                    setTimeout(() => onCloseAuth(), 1200);
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
                          onClick={() => alert("Password reset instructions sent to your email.")}
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
                    className="w-full mt-2 inline-flex items-center justify-center bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-2xl py-3.5 text-sm font-extrabold shadow-lg shadow-orange-600/25 transition-all hover:scale-[1.01]"
                  >
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
                <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
                <h4 className="font-black text-lg text-slate-900">Pickup Successfully Scheduled!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Our certified diagnostic executive will visit your address within 2 hours. Payout is transferred directly before technician leaves.
                </p>
                <button
                  onClick={() => { onCloseValuation(); setBookingSuccess(false); }}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="Subham Roy"
                    className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Phone Number for Verification</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Pickup Address & Pincode</label>
                  <input
                    type="text"
                    placeholder="Flat No., Landmark, City, Pincode"
                    className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <button
                  onClick={() => setBookingSuccess(true)}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-2xl py-4 font-bold shadow-lg shadow-orange-600/30 transition text-sm"
                >
                  Confirm Doorstep Inspection
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}