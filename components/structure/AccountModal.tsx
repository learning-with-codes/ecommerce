"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Package,
  RefreshCcw,
  User,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { AuthUser, Order, SellRequest } from "@/types/retech";
import { getOrders } from "@/lib/services/ordersService";
import { getSellRequests } from "@/lib/services/valuationsService";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onOpenShopping: () => void;
  initialTab?: "orders" | "sell_requests" | "profile";
}

export default function AccountModal({
  isOpen,
  onClose,
  currentUser,
  onOpenShopping,
  initialTab = "orders",
}: AccountModalProps) {
  const [activeTab, setActiveTab] = useState<"orders" | "sell_requests" | "profile">(initialTab);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sellRequests, setSellRequests] = useState<SellRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setLoading(true);
      Promise.all([
        getOrders(currentUser?.id),
        getSellRequests(currentUser?.id),
      ])
        .then(([ordList, sellList]) => {
          setOrders(ordList);
          setSellRequests(sellList);
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, currentUser, initialTab]);

  if (!isOpen) return null;

  const getOrderStatusBadge = (status: Order["orderStatus"]) => {
    switch (status) {
      case "delivered":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">Delivered</span>;
      case "out_for_delivery":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 animate-pulse">Out for Delivery</span>;
      case "shipped":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-800">Shipped</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800">Order Confirmed</span>;
    }
  };

  const getSellStatusBadge = (status: SellRequest["status"]) => {
    switch (status) {
      case "payout_completed":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">Payout Transferred</span>;
      case "inspection_passed":
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800">Diagnostic Passed</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-orange-100 text-orange-800">Executive Scheduled</span>;
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
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-sm flex items-center justify-center shadow-md shadow-orange-600/20">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 leading-tight">
                {currentUser?.name || "Customer Account"}
              </h3>
              <p className="text-xs text-slate-500">
                {currentUser?.email || "Member Dashboard"}
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-6 gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition ${
              activeTab === "orders"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Package className="h-4 w-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("sell_requests")}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition ${
              activeTab === "sell_requests"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <RefreshCcw className="h-4 w-4" />
            <span>Doorstep Valuations ({sellRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition ${
              activeTab === "profile"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Profile & Addresses</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {loading ? (
            <div className="text-center py-16 space-y-2 text-slate-400">
              <div className="h-6 w-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs">Fetching records...</p>
            </div>
          ) : activeTab === "orders" ? (
            /* Orders Tab */
            orders.length === 0 ? (
              <div className="text-center py-14 space-y-3">
                <div className="h-16 w-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="h-8 w-8 stroke-[1.8]" />
                </div>
                <h4 className="font-extrabold text-base text-slate-800">No Orders Placed Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Explore certified refurbished flagships with up to 40% discount, 1-year replacement warranty, and doorstep trial.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenShopping();
                  }}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-xs shadow-md transition"
                >
                  Browse Electronics
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-4 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-slate-900">{order.orderNumber}</span>
                          {getOrderStatusBadge(order.orderStatus)}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          <span>Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-base text-orange-600">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{order.paymentMethod} • {order.paymentStatus}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs">
                          <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900 truncate">{item.name}</p>
                            <p className="text-[10px] text-slate-500">Qty: {item.quantity} • {item.warranty || "1 Year Warranty"}</p>
                          </div>
                          <span className="font-extrabold text-slate-900">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-200/70 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                      <span className="flex items-center gap-1">
                        <Truck className="h-3.5 w-3.5 text-orange-600" />
                        <span>Tracking: <strong className="text-slate-800">{order.trackingNumber}</strong></span>
                      </span>
                      <span>Delivery: <strong>{order.shippingAddress.city}, {order.shippingAddress.state}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : activeTab === "sell_requests" ? (
            /* Sell Requests Tab */
            sellRequests.length === 0 ? (
              <div className="text-center py-14 space-y-3">
                <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <RefreshCcw className="h-8 w-8 stroke-[1.8]" />
                </div>
                <h4 className="font-extrabold text-base text-slate-800">No Sell Valuations Booked</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Have an old phone, tablet, or laptop? Get an instant diagnostic quote and same-day doorstep payout before technician leaves!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sellRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-3 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-slate-900">{req.brand} {req.model}</span>
                          {getSellStatusBadge(req.status)}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">Booking Ref: {req.requestNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Estimated Cashout</p>
                        <p className="font-black text-base text-emerald-600">₹{req.estimatedCash.toLocaleString("en-IN")}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      <div>
                        <span className="text-slate-400">Diagnostic Condition: </span>
                        <strong>{req.bodyCondition} • {req.screenCondition}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Pickup Schedule: </span>
                        <strong>{req.pickupDate} ({req.pickupTimeSlot})</strong>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-slate-400">Pickup Address: </span>
                        <strong>{req.pickupAddress}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Profile Tab */
            <div className="space-y-6">
              <div className="p-5 bg-orange-50/60 border border-orange-100 rounded-2xl flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-xl flex items-center justify-center shadow">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : <User className="h-8 w-8" />}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-base text-slate-900">{currentUser?.name || "ReTech Customer"}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{currentUser?.email || "No email on file"}</span>
                  </p>
                  {currentUser?.phone && (
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{currentUser.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <h5 className="font-extrabold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  <span>Primary Service Hub & Address</span>
                </h5>
                <p className="text-xs text-slate-600">
                  Kolkata, West Bengal (Pin: 700001) • Express 24-hr doorstep delivery & diagnostics active in your zone.
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>ReTech Buyer Protection Guarantee is active on all your orders and doorstep buybacks.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
