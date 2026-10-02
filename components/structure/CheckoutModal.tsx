"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  Truck,
  CheckCircle2,
  CreditCard,
  Banknote,
  QrCode,
  Building,
  ArrowRight,
  Loader2,
  Tag,
  Package,
} from "lucide-react";
import { CartItem, AuthUser, Order, ShippingAddress } from "@/types/retech";
import { createOrder } from "@/lib/services/ordersService";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currentUser: AuthUser | null;
  onOrderPlaced: (order: Order) => void;
  onClearCart: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  currentUser,
  onOrderPlaced,
  onClearCart,
}: CheckoutModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Address State
  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "+91 ");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Kolkata");
  const [state, setState] = useState("West Bengal");
  const [pincode, setPincode] = useState("700001");

  // Payment & Promo
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod" | "netbanking">("upi");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = promoApplied ? 2500 : 0;
  const shippingFee = 0; // Free express delivery
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "FESTIVE2500") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'FESTIVE2500' for ₹2,500 off!");
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const shippingAddress: ShippingAddress = {
      fullName: name,
      phone,
      street,
      city,
      state,
      pincode,
    };

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
      condition: item.product.condition,
      warranty: item.product.warranty,
    }));

    try {
      const res = await createOrder({
        userId: currentUser?.id,
        customerName: name,
        customerEmail: email || "customer@retech.in",
        customerPhone: phone,
        shippingAddress,
        items: orderItems,
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      });

      if (res.order) {
        setPlacedOrder(res.order);
        onOrderPlaced(res.order);
        onClearCart();
      }
    } catch (err) {
      console.error("Order placement failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Dialog */}
      <div
        className="relative z-20 w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[92vh] border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-600/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 leading-tight">
                {placedOrder ? "Order Confirmed!" : "Secure Express Checkout"}
              </h3>
              <p className="text-xs text-slate-500">
                {placedOrder
                  ? "Your certified refurbished devices are being prepped"
                  : "Doorstep diagnostic report • 1-Year Warranty Included"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {placedOrder ? (
            /* Success View */
            <div className="text-center py-6 space-y-6">
              <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-slate-900">
                  Thank You for Your Order!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your order <span className="font-extrabold text-orange-600">{placedOrder.orderNumber}</span> has been confirmed. A confirmation SMS and diagnostic summary have been dispatched.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Tracking Number:</span>
                  <span className="font-bold text-slate-900">{placedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Address:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[200px]">
                    {placedOrder.shippingAddress.street}, {placedOrder.shippingAddress.city}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Payment Mode:</span>
                  <span className="font-bold text-slate-900 uppercase">{placedOrder.paymentMethod} ({placedOrder.paymentStatus})</span>
                </div>
                <div className="flex justify-between text-slate-900 font-extrabold pt-2 border-t border-slate-200">
                  <span>Total Paid / Payable:</span>
                  <span className="text-orange-600 text-sm">₹{placedOrder.totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Order Items Preview */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-3">
                <p className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="h-4 w-4 text-orange-600" />
                  <span>Items in this shipment ({cart.length})</span>
                </p>
                <div className="divide-y divide-slate-200/60 max-h-36 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 truncate pr-2">
                        <div className="h-10 w-10 rounded-lg bg-white border border-slate-200 overflow-hidden flex-shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="truncate">
                          <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                          <p className="text-[10px] text-slate-500">Qty: {item.quantity} • {item.product.warranty}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-slate-900 flex-shrink-0">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Truck className="h-4 w-4 text-orange-600" />
                  <span>Doorstep Delivery Address</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ankit Sen"
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-slate-700">Email for Invoice *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ankit.sen@gmail.com"
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-slate-700">Complete Street Address *</label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Flat 4B, Greenwood Heights, Park Circus"
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-orange-600" />
                  <span>Choose Payment Method</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-1 transition ${
                      paymentMethod === "upi"
                        ? "border-orange-600 bg-orange-50/70 text-orange-950 font-bold shadow-sm"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <QrCode className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-xs font-bold">UPI / QR</p>
                      <p className="text-[10px] text-slate-500">GPay, PhonePe</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-1 transition ${
                      paymentMethod === "card"
                        ? "border-orange-600 bg-orange-50/70 text-orange-950 font-bold shadow-sm"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-xs font-bold">Cards</p>
                      <p className="text-[10px] text-slate-500">Credit / Debit</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-1 transition ${
                      paymentMethod === "cod"
                        ? "border-orange-600 bg-orange-50/70 text-orange-950 font-bold shadow-sm"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <Banknote className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold">Cash On Delivery</p>
                      <p className="text-[10px] text-emerald-600">Pay after trial</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-1 transition ${
                      paymentMethod === "netbanking"
                        ? "border-orange-600 bg-orange-50/70 text-orange-950 font-bold shadow-sm"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <Building className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="text-xs font-bold">Net Banking</p>
                      <p className="text-[10px] text-slate-500">All Major Banks</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Promo Code Strip */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code (e.g. FESTIVE2500)"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-orange-500 uppercase font-semibold"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Coupon &apos;FESTIVE2500&apos; applied! You saved ₹2,500.
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-rose-600 font-semibold">{promoError}</p>
                )}
              </div>

              {/* Bill Summary */}
              <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Festive Discount</span>
                    <span>- ₹2,500</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-700">
                  <span>Doorstep Diagnostic & Packaging</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>1-Year Hardware Warranty</span>
                  <span className="text-emerald-600 font-bold">INCLUDED</span>
                </div>
                <div className="pt-2 border-t border-orange-200 flex justify-between text-slate-950 font-black text-sm">
                  <span>Final Total</span>
                  <span className="text-orange-600">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-orange-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-60"
              >
                {submitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span>Confirm & Place Order (₹{totalAmount.toLocaleString("en-IN")})</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
