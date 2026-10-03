"use client";

import React, { useState, useEffect } from "react";
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
  Lock,
  User,
  Mail,
  Printer,
  Eye,
  Check,
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
  onOpenAuth?: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  currentUser,
  onOrderPlaced,
  onClearCart,
  onOpenAuth,
}: CheckoutModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Email Notification States
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailHtml, setEmailHtml] = useState<string>("");
  const [showEmailPreview, setShowEmailPreview] = useState(false);

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

  // Sync user info when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
      if (currentUser.phone && currentUser.phone !== "+91 ") {
        setPhone(currentUser.phone);
      }
    }
  }, [currentUser]);

  if (!isOpen) return null;

  // 1. Mandatory Login Gate: Without login, checkout is blocked
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
        <div className="relative z-20 w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-center space-y-6 border border-slate-100 animate-in fade-in zoom-in-95">
          <div className="h-16 w-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="h-8 w-8" />
          </div>
          
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
              Account Login Required
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Please Sign In to Checkout
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              As per ReTech Trust & Security Policy, an authenticated customer account is required to generate the <strong>45-point hardware warranty certificate</strong>, enable real-time Bluedart tracking, and dispatch your tax invoice to your verified email.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-left text-xs space-y-1.5 text-slate-700">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <Check className="h-3.5 w-3.5 stroke-[3]" /> 1-Year Replacement Warranty registration
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <Check className="h-3.5 w-3.5 stroke-[3]" /> Live Bluedart Air tracking on SMS & Email
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <Check className="h-3.5 w-3.5 stroke-[3]" /> Instant Cash on Delivery verification
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenAuth?.();
              }}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl py-3.5 font-bold text-sm shadow-lg shadow-orange-600/25 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <User className="h-4 w-4" /> Sign In or Register to Continue
            </button>
            <button
              onClick={onClose}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl py-2.5 font-bold text-xs transition"
            >
              Back to Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        customerEmail: email || currentUser?.email || "customer@retech.in",
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

        // Dispatch Professional Order Confirmation Email (Flipkart/Cashify standard)
        setEmailSending(true);
        fetch("/api/send-order-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: res.order }),
        })
          .then((r) => r.json())
          .then((emailData) => {
            if (emailData.success) {
              setEmailSent(true);
              if (emailData.html) setEmailHtml(emailData.html);
            }
          })
          .catch((err) => console.error("Order email dispatch error:", err))
          .finally(() => setEmailSending(false));
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
                  ? "Your certified refurbished devices are being prepped & confirmation sent"
                  : `Signed in as ${currentUser.name || currentUser.email} • 1-Year Warranty Included`}
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
            <div className="text-center py-4 space-y-5">
              <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Thank You for Your Order! 🎉
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your order <span className="font-extrabold text-orange-600">{placedOrder.orderNumber || placedOrder.id}</span> has been confirmed.
                </p>
              </div>

              {/* Email Sent Notification Box */}
              <div className="p-4 bg-emerald-50/90 border border-emerald-200 rounded-2xl max-w-md mx-auto text-left space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <Mail className="h-4 w-4 text-emerald-600" />
                    {emailSending ? "Sending Confirmation Email..." : "Order Confirmation Email Dispatched"}
                  </span>
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {emailSending ? "Sending..." : emailSent ? "SENT ✓" : "DISPATCHED"}
                  </span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  A professional invoice with your <strong>45-Point Hardware Certification Report</strong> and <strong>Bluedart Air Tracking ({placedOrder.trackingNumber})</strong> has been dispatched to:
                </p>
                <div className="bg-white/90 p-2 rounded-xl border border-emerald-200/80 font-mono text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>{placedOrder.customerEmail}</span>
                  <span className="text-emerald-600 text-[10px]">Verified ✓</span>
                </div>
                <div className="pt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEmailPreview(true)}
                    className="text-xs font-bold text-emerald-900 hover:text-emerald-950 underline flex items-center gap-1"
                  >
                    <Eye className="h-3.5 w-3.5" /> Preview Sent Confirmation Email
                  </button>
                </div>
              </div>

              {/* Order Details Card */}
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
                  <span className="font-bold text-slate-900 uppercase">
                    {placedOrder.paymentMethod} ({placedOrder.paymentStatus})
                  </span>
                </div>
                <div className="flex justify-between text-slate-900 font-extrabold pt-2 border-t border-slate-200">
                  <span>Total Paid / Payable:</span>
                  <span className="text-orange-600 text-sm">₹{placedOrder.totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Success CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowEmailPreview(true)}
                  className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <Mail className="h-4 w-4" /> View Email Receipt
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <Printer className="h-4 w-4" /> Print Receipt
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md transition"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Subham Banerjee"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">
                      Email Address (Order Confirmation will be sent here)
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. subham@gmail.com"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Phone Number (For OTP Delivery)</label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">Pincode</label>
                    <input
                      required
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="700001"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-bold mb-1">Flat / Building / Street Address</label>
                    <input
                      required
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Flat 4B, Park Street Towers, Near Park Street Metro"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">City</label>
                    <input
                      required
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">State</label>
                    <input
                      required
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Promo Code Strip */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Coupon Code (e.g. FESTIVE2500)"
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs uppercase font-bold focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">
                    ✓ FESTIVE2500 Applied! ₹2,500 Festive discount added.
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-500 font-bold mt-1">{promoError}</p>
                )}
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-900">Select Payment Method</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                      paymentMethod === "upi"
                        ? "border-orange-600 bg-orange-50/50 text-orange-900 font-bold shadow-sm"
                        : "border-slate-200 hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <QrCode className="h-5 w-5 text-orange-600" />
                    <span>Instant UPI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                      paymentMethod === "card"
                        ? "border-orange-600 bg-orange-50/50 text-orange-900 font-bold shadow-sm"
                        : "border-slate-200 hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <span>Credit / Debit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                      paymentMethod === "cod"
                        ? "border-orange-600 bg-orange-50/50 text-orange-900 font-bold shadow-sm"
                        : "border-slate-200 hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <Banknote className="h-5 w-5 text-emerald-600" />
                    <span>Cash on Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                      paymentMethod === "netbanking"
                        ? "border-orange-600 bg-orange-50/50 text-orange-900 font-bold shadow-sm"
                        : "border-slate-200 hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <Building className="h-5 w-5 text-purple-600" />
                    <span>Net Banking / EMI</span>
                  </button>
                </div>
              </div>

              {/* Order Bill Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cart.length} devices):</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Festive Promo Discount:</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Express Bluedart Delivery:</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span className="text-orange-600 text-base">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting || cart.length === 0}
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-2xl py-4 font-bold text-sm shadow-lg shadow-orange-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99]"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Confirming Order & Generating 45-Pt Report...
                  </>
                ) : (
                  <>
                    <span>Confirm Order (Pay ₹{totalAmount.toLocaleString("en-IN")})</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Interactive Modal: Preview Sent Flipkart/Cashify HTML Email */}
      {showEmailPreview && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md" onClick={() => setShowEmailPreview(false)} />
          <div className="relative z-30 w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Mail className="h-4 w-4 text-orange-400" />
                <span>Email Dispatched to: {placedOrder?.customerEmail}</span>
              </div>
              <button
                onClick={() => setShowEmailPreview(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-slate-100">
              {emailHtml ? (
                <div
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: emailHtml }}
                />
              ) : (
                <p className="text-center py-10 text-slate-500 text-xs">Generating rendered email preview...</p>
              )}
            </div>
            <div className="p-3 bg-white border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
              >
                <Printer className="h-3.5 w-3.5" /> Print Invoice
              </button>
              <button
                onClick={() => setShowEmailPreview(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
