"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Heart,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Zap,
  BatteryCharging,
  Award,
  Check,
  FileCheck,
  ChevronRight,
  MapPin,
  Flame,
} from "lucide-react";
import { Product, ProductVariant, ProductColor } from "@/types/retech";

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (p: Product, quantity?: number) => void;
  onBuyNow: (p: Product, quantity?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
}

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}: ProductDetailsModalProps) {
  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [currentOriginalPrice, setCurrentOriginalPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"diagnostics" | "specs" | "box" | "grading">("diagnostics");
  const [pincode, setPincode] = useState<string>("700001");
  const [pincodeChecked, setPincodeChecked] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Initialize or update state when product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.galleryImages?.[0] || product.image);
      const defaultVariant = product.variants?.[0];
      if (defaultVariant) {
        setSelectedStorage(defaultVariant.storage);
        setCurrentPrice(defaultVariant.price);
        setCurrentOriginalPrice(defaultVariant.originalPrice);
      } else {
        setSelectedStorage("");
        setCurrentPrice(product.price);
        setCurrentOriginalPrice(product.originalPrice);
      }

      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0].name);
      } else {
        setSelectedColor("");
      }
      setQuantity(1);
      setActiveTab("diagnostics");
    }
  }, [product]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  // Handle storage variant change
  const handleSelectVariant = (v: ProductVariant) => {
    setSelectedStorage(v.storage);
    setCurrentPrice(v.price);
    setCurrentOriginalPrice(v.originalPrice);
  };

  // Handle color change
  const handleSelectColor = (c: ProductColor) => {
    setSelectedColor(c.name);
    if (c.image) {
      setActiveImage(c.image);
    }
  };

  // Handle Share link
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Build product with selected variant options for cart/checkout
  const activeProductWithVariant: Product = {
    ...product,
    price: currentPrice,
    originalPrice: currentOriginalPrice,
    name: selectedStorage ? `${product.name} - ${selectedStorage}` : product.name,
    discount: Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100),
  };

  const allImages = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const savingsAmount = currentOriginalPrice - currentPrice;
  const discountPercent = Math.round((savingsAmount / currentOriginalPrice) * 100);

  // EMI Estimate
  const emiPerMonth = Math.round(currentPrice / 12);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Modal Card */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92vh] border border-slate-200/80 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/70 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-extrabold text-orange-600 uppercase tracking-wider">{product.brand}</span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-slate-500 capitalize">{product.category}</span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-bold text-slate-800 truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition relative"
              title="Share Product"
            >
              <Share2 className="h-4 w-4" />
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>
            <button
              onClick={() => onToggleWishlist(product)}
              className="p-2 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition"
              title="Save to Wishlist"
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition ml-1"
              aria-label="Close details"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Gallery & Certification (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Main Image Showcase */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/70 p-4 flex items-center justify-center group shadow-inner">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Badges on Image */}
              <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
                <span className="bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Flame className="h-3 w-3 fill-white" /> {discountPercent}% OFF
                </span>
                <span className="bg-slate-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow backdrop-blur">
                  {product.condition}
                </span>
              </div>

              <div className="absolute bottom-3.5 right-3.5 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> {product.testedPoints}-Point Inspected
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative h-16 w-16 rounded-2xl overflow-hidden bg-slate-50 border-2 transition p-1 flex-shrink-0 ${
                      activeImage === img
                        ? "border-orange-500 shadow-md scale-105"
                        : "border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality & Battery Health Card */}
            <div className="bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-slate-50 border border-orange-200/60 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5 text-orange-700">
                  <ShieldCheck className="h-4 w-4 text-orange-600" />
                  ReTech Certified Grade
                </span>
                <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md font-extrabold text-[11px]">
                  Flawless - Like New
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/80 border border-orange-100 rounded-xl p-2.5 space-y-1">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <BatteryCharging className="h-3.5 w-3.5 text-emerald-600" /> Battery Health
                  </span>
                  <p className="font-black text-slate-900 text-sm">
                    {product.batteryHealth || 98}% OEM Capacity
                  </p>
                </div>
                <div className="bg-white/80 border border-orange-100 rounded-xl p-2.5 space-y-1">
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-orange-600" /> Warranty
                  </span>
                  <p className="font-black text-slate-900 text-sm">
                    {product.warranty}
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                ✓ Inspected by ISO-certified technicians. 100% genuine OEM parts with DoD 5220.22-M military standard data sanitization certificate included.
              </p>
            </div>

            {/* Pincode & Delivery Checker */}
            <div className="border border-slate-200 rounded-2xl p-3.5 bg-slate-50/70 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-orange-600" />
                  Check Doorstep Delivery
                </span>
                <span className="text-[11px] text-emerald-600 font-extrabold">FREE Express</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                    setPincodeChecked(false);
                  }}
                  placeholder="Enter 6-digit PIN"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={() => setPincodeChecked(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition"
                >
                  Verify
                </button>
              </div>
              {pincodeChecked && (
                <div className="text-[11px] text-slate-600 space-y-1 bg-white p-2.5 rounded-xl border border-slate-200">
                  <p className="text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" /> Delivery by Tomorrow, 2:00 PM via Bluedart Air
                  </p>
                  <p className="text-slate-500">Cash on Delivery & Doorstep Trial Available</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Specs, Variants & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title, Brand & Ratings */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md text-xs font-extrabold flex items-center gap-1">
                  ★ {product.rating} <span className="font-normal text-slate-600">({product.reviewsCount} reviews)</span>
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> In Stock & Ready to Ship
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description ||
                  "Certified Refurbished device thoroughly tested across 45 hardware and software checkpoints. Includes original diagnostic report and 1-year replacement warranty."}
              </p>
            </div>

            {/* Price Box with Savings & Festive Coupon Banner */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-950">
                  ₹{currentPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-sm sm:text-base text-slate-400 line-through">
                  ₹{currentOriginalPrice.toLocaleString("en-IN")}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-lg">
                  Save ₹{savingsAmount.toLocaleString("en-IN")} ({discountPercent}% OFF)
                </span>
              </div>

              {/* No-Cost EMI & Bank Offer */}
              <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-700 gap-2">
                <span className="flex items-center gap-1.5 font-bold">
                  <Zap className="h-4 w-4 text-orange-600 fill-orange-500" />
                  No Cost EMI from <strong className="text-slate-900">₹{emiPerMonth.toLocaleString("en-IN")}/mo</strong>
                </span>
                <span className="bg-orange-100 text-orange-800 font-extrabold px-2 py-0.5 rounded text-[11px] self-start sm:self-auto">
                  Coupon: FESTIVE2500 for extra ₹2,500 OFF
                </span>
              </div>
            </div>

            {/* Storage Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Select Storage Capacity:</span>
                  <span className="text-orange-600 font-extrabold">{selectedStorage}</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {product.variants.map((v) => {
                    const isSelected = selectedStorage === v.storage;
                    return (
                      <button
                        key={v.storage}
                        onClick={() => handleSelectVariant(v)}
                        className={`py-2.5 px-3 rounded-xl border text-left transition ${
                          isSelected
                            ? "border-orange-600 bg-orange-50/50 shadow-sm ring-2 ring-orange-500/20"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <p className={`font-black text-xs sm:text-sm ${isSelected ? "text-orange-700" : "text-slate-900"}`}>
                          {v.storage}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          ₹{v.price.toLocaleString("en-IN")}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Color Finish:</span>
                  <span className="font-extrabold text-slate-900">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => handleSelectColor(c)}
                        title={c.name}
                        className={`h-9 w-9 rounded-full transition flex items-center justify-center ${
                          isSelected ? "ring-2 ring-offset-2 ring-orange-500 scale-110" : "hover:scale-105"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && (
                          <Check className="h-4 w-4 stroke-[3] text-white drop-shadow" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ReTech Trust Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <ShieldCheck className="h-5 w-5 text-orange-600 mx-auto" />
                <p className="font-bold text-slate-900 text-[11px]">1 Year Warranty</p>
                <p className="text-[10px] text-slate-500">Free Replacement</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <RotateCcw className="h-5 w-5 text-emerald-600 mx-auto" />
                <p className="font-bold text-slate-900 text-[11px]">7 Days Return</p>
                <p className="text-[10px] text-slate-500">No Questions Asked</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <Truck className="h-5 w-5 text-blue-600 mx-auto" />
                <p className="font-bold text-slate-900 text-[11px]">Express Shipping</p>
                <p className="text-[10px] text-slate-500">Delivered in 24-48 hrs</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <CheckCircle2 className="h-5 w-5 text-amber-600 mx-auto" />
                <p className="font-bold text-slate-900 text-[11px]">Pay on Delivery</p>
                <p className="text-[10px] text-slate-500">Inspect Before Paying</p>
              </div>
            </div>

            {/* Interactive Tabs for Diagnostics & Specifications */}
            <div className="space-y-3 pt-2">
              <div className="flex border-b border-slate-200 text-xs font-bold gap-4 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("diagnostics")}
                  className={`pb-2.5 border-b-2 transition whitespace-nowrap ${
                    activeTab === "diagnostics"
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  45-Point Diagnostic Report
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-2.5 border-b-2 transition whitespace-nowrap ${
                    activeTab === "specs"
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Technical Specifications
                </button>
                <button
                  onClick={() => setActiveTab("box")}
                  className={`pb-2.5 border-b-2 transition whitespace-nowrap ${
                    activeTab === "box"
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  What&apos;s In The Box
                </button>
                <button
                  onClick={() => setActiveTab("grading")}
                  className={`pb-2.5 border-b-2 transition whitespace-nowrap ${
                    activeTab === "grading"
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Condition Grading Guide
                </button>
              </div>

              {/* Tab 1: Diagnostic Report */}
              {activeTab === "diagnostics" && (
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-900 font-bold">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="h-4 w-4 text-emerald-600" /> ReTech Certified Lab Diagnostic Certificate #RT-{product.id.toUpperCase()}-940
                    </span>
                    <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                      100% PASSED
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {(product.diagnostics || [
                      { feature: "Display Touch & OLED", category: "Display", status: "PASSED", detail: "Multi-touch, TrueTone, 0 dead pixels" },
                      { feature: "Primary & Selfie Cameras", category: "Camera", status: "PASSED", detail: "Autofocus, Optical Stabilization calibrated" },
                      { feature: "Battery & Fast Charging", category: "Battery", status: "EXCELLENT", detail: "Holding 98% OEM design capacity" },
                      { feature: "Biometrics & Face ID", category: "Performance", status: "PASSED", detail: "Secure Enclave biometric scan responsive" },
                      { feature: "Speakers & Mics", category: "Audio", status: "PASSED", detail: "Clear acoustic response, noise reduction active" },
                      { feature: "5G & Wi-Fi Bands", category: "Connectivity", status: "PASSED", detail: "Carrier unlocked, all Indian 5G bands ready" },
                    ]).map((d, i) => (
                      <div key={i} className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-800 text-[11px]">{d.feature}</span>
                          <span className="bg-emerald-100 text-emerald-800 font-bold text-[9px] px-1.5 py-0.5 rounded">
                            {d.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500">{d.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Technical Specifications */}
              {activeTab === "specs" && (
                <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
                  {product.specs ? (
                    Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-slate-100 last:border-0 text-slate-700">
                        <span className="text-slate-400 font-medium w-1/3">{key}</span>
                        <span className="font-bold text-slate-900 w-2/3 text-right">{value}</span>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-400">Brand</span>
                        <span className="font-bold text-slate-900">{product.brand}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-400">Condition Grade</span>
                        <span className="font-bold text-slate-900">{product.condition}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-400">Warranty Term</span>
                        <span className="font-bold text-slate-900">{product.warranty}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: What's In The Box */}
              {activeTab === "box" && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <p className="font-extrabold text-slate-800">Included in this Certified Package:</p>
                  <ul className="space-y-1.5 text-slate-600">
                    {(product.boxContents || [
                      `Certified Refurbished ${product.name}`,
                      "Braided Fast Charge Cable",
                      "ReTech 45-Point Inspection Certificate",
                      "1-Year ReTech Warranty Card with Free Swap",
                      "Secure Eco-Friendly Packaging",
                    ]).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab 4: Grading Guide */}
              {activeTab === "grading" && (
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-orange-50/70 border border-orange-200/60 rounded-xl space-y-1">
                    <p className="font-black text-orange-950">Flawless (Like New) - Our Highest Grade</p>
                    <p className="text-slate-600 text-[11px]">
                      Zero visible scratches or dents. Screen is flawless OEM. Battery health guaranteed 90%+. Looks indistinguishable from a brand-new device.
                    </p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <p className="font-bold text-slate-900">Superb Grade</p>
                    <p className="text-slate-500 text-[11px]">
                      Screen in pristine condition. Minor faint scuffs on the outer frame barely visible from 8 inches away. 100% fully functional.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-slate-200 rounded-2xl bg-slate-50 p-1 self-stretch sm:self-auto justify-between sm:justify-start">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-9 w-9 rounded-xl flex items-center justify-center font-bold text-slate-600 hover:bg-white hover:shadow-sm transition"
                >
                  -
                </button>
                <span className="w-10 text-center font-black text-slate-900 text-sm">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-9 w-9 rounded-xl flex items-center justify-center font-bold text-slate-600 hover:bg-white hover:shadow-sm transition"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={() => {
                  onAddToCart(activeProductWithVariant, quantity);
                  onClose();
                }}
                className="flex-1 w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-3.5 px-5 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>

              {/* Buy Now Button (Triggers Direct Checkout) */}
              <button
                type="button"
                onClick={() => {
                  onBuyNow(activeProductWithVariant, quantity);
                  onClose();
                }}
                className="flex-1 w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-2xl py-3.5 px-5 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 hover:shadow-orange-600/40 transition hover:scale-[1.01]"
              >
                <Zap className="h-4 w-4 fill-white" /> Buy Now (Instant Checkout)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
