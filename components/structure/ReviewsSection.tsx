"use client";

import React from "react";
import { Star } from "lucide-react";
import { REVIEWS } from "@/data/retechData";

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest">
            Verified Indian Buyers
          </span>
          <h2 className="text-3xl font-black text-slate-950">Trusted by 50,000+ Customers</h2>
          <p className="text-sm text-slate-500">Read verified reviews from customers who bought and sold electronics with ReTech.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div key={review.id} className="p-6 rounded-3xl border border-slate-200/80 bg-slate-50/50 space-y-4 hover:border-orange-200 transition">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-slate-200 border-2 border-orange-500/20">
                  <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{review.name}</p>
                  <p className="text-[11px] text-slate-400">{review.role} • {review.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}