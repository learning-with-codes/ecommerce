'use client';

import React, { useState } from 'react';
import { Wrench } from 'lucide-react';
import { REPAIR_SERVICES } from '@/data/retechData';

export default function RepairEstimator() {
  const [selectedService, setSelectedService] = useState<string>('screen');
  const [booked, setBooked] = useState<boolean>(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <span className="text-xs font-bold bg-violet-50 text-violet-700 px-3 py-1 rounded-full border border-violet-200">
          Doorstep Tech Service
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">ReTech Express Repair</h1>
        <p className="text-xs text-slate-500 mt-1">Fixed transparent pricing with genuine grade parts and 6-month warranty.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700">Phone Brand</label>
            <select className="w-full mt-1 p-3 rounded-xl border border-slate-200 text-sm bg-slate-50">
              <option>Apple</option>
              <option>Samsung</option>
              <option>OnePlus</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700">Model</label>
            <select className="w-full mt-1 p-3 rounded-xl border border-slate-200 text-sm bg-slate-50">
              <option>iPhone 14</option>
              <option>iPhone 13</option>
              <option>Galaxy S23</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 mb-2 block">Choose Issue</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REPAIR_SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  onClick={() => setSelectedService(srv.id)}
                  className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition ${
                    selectedService === srv.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">{srv.name}</p>
                      <p className="text-[10px] text-slate-400">{srv.warranty} warranty</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-indigo-700">{srv.price}</span>
                </div>
              );
            })}
          </div>
        </div>

        {booked ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-800">
            Engineer booked! Our technician will reach your location within 30 minutes.
          </div>
        ) : (
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Estimated Cost:</p>
              <p className="text-xl font-black text-slate-900">₹2,499</p>
            </div>
            <button
              type="button"
              onClick={() => setBooked(true)}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2"
            >
              <Wrench className="w-4 h-4" />
              <span>Book Engineer</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}