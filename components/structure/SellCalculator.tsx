'use client';

import React, { useState, useMemo } from 'react';
import { ChevronRight, ArrowRight, Truck } from 'lucide-react';
import { BRANDS, SELL_DEVICES } from '@/data/retechData';
import { SellDeviceItem, DeviceConditionState } from '@/types/retech';

interface SellCalculatorProps {
  selectedCity: string;
}

export default function SellCalculator({ selectedCity }: SellCalculatorProps) {
  const [sellStep, setSellStep] = useState<number>(1);
  const [sellBrand, setSellBrand] = useState<string>('apple');
  const [selectedDevice, setSelectedDevice] = useState<SellDeviceItem>(SELL_DEVICES[0]);
  const [selectedVariant, setSelectedVariant] = useState<string>('128GB');
  const [conditions, setConditions] = useState<DeviceConditionState>({
    powersOn: true,
    screenFlawless: true,
    bodyCondition: 'None',
    hasOriginalBoxCharger: true
  });
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const calculatedPrice = useMemo(() => {
    if (!selectedDevice) return 0;
    let price = selectedDevice.basePrice;
    if (selectedVariant === '256GB') price += 3500;
    if (selectedVariant === '512GB') price += 7000;
    if (selectedVariant === '1TB') price += 11000;

    if (!conditions.powersOn) price *= 0.35;
    if (!conditions.screenFlawless) price -= 4000;
    if (conditions.bodyCondition === 'Minor') price -= 1200;
    if (conditions.bodyCondition === 'Heavy') price -= 3000;
    if (conditions.hasOriginalBoxCharger) price += 1500;

    return Math.max(1500, Math.round(price / 100) * 100);
  }, [selectedDevice, selectedVariant, conditions]);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
      {/* Stepper Navigation */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200 mb-6 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold">
        {['1. Brand', '2. Model', '3. Storage', '4. Physical Check', '5. Cash Value'].map((title, i) => (
          <button
            type="button"
            key={i}
            onClick={() => (i + 1) < sellStep && setSellStep(i + 1)}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
              sellStep === (i + 1) ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      {sellStep === 1 && (
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Select Smartphone Brand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {BRANDS.map((b) => (
              <div
                key={b.id}
                onClick={() => {
                  setSellBrand(b.id);
                  const matched = SELL_DEVICES.find(d => d.brand === b.id) || SELL_DEVICES[0];
                  setSelectedDevice(matched);
                  setSellStep(2);
                }}
                className={`p-4 sm:p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-pointer transition ${
                  sellBrand === b.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-900 text-white font-black text-lg sm:text-xl flex items-center justify-center">
                  {b.logo}
                </div>
                <span className="font-bold text-xs sm:text-sm text-slate-900">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {sellStep === 2 && (
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Select Model</h2>
            <button type="button" onClick={() => setSellStep(1)} className="text-xs font-bold text-indigo-600 hover:underline">
              Change Brand
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {SELL_DEVICES.filter(d => d.brand === sellBrand).map((device) => (
              <div
                key={device.id}
                onClick={() => {
                  setSelectedDevice(device);
                  setSelectedVariant(device.variants[0]);
                  setSellStep(3);
                }}
                className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl">{device.img}</span>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900">{device.name}</h3>
                    <p className="text-[11px] sm:text-xs text-indigo-600 font-semibold">Up to ₹{device.basePrice.toLocaleString()}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {sellStep === 3 && (
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Choose Storage</h2>
            <button type="button" onClick={() => setSellStep(2)} className="text-xs font-bold text-indigo-600 hover:underline">
              Change Model
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {selectedDevice?.variants.map((v) => (
              <div
                key={v}
                onClick={() => {
                  setSelectedVariant(v);
                  setSellStep(4);
                }}
                className="p-5 rounded-2xl border-2 border-slate-200 hover:border-indigo-600 text-center cursor-pointer transition"
              >
                <p className="text-base sm:text-lg font-black text-slate-900">{v}</p>
                <span className="text-xs text-indigo-600 font-semibold mt-1 inline-block">Select</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {sellStep === 4 && (
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Hardware Diagnostics</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-bold text-xs sm:text-sm text-slate-900">Does the device switch on properly?</p>
                <p className="text-[11px] text-slate-400">Board starts and boots normally</p>
              </div>
              <div className="flex gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setConditions({ ...conditions, powersOn: true })}
                  className={`px-3.5 py-1 rounded-lg text-xs font-bold ${conditions.powersOn ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setConditions({ ...conditions, powersOn: false })}
                  className={`px-3.5 py-1 rounded-lg text-xs font-bold ${!conditions.powersOn ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-bold text-xs sm:text-sm text-slate-900">Is the front screen original and crack-free?</p>
                <p className="text-[11px] text-slate-400">No screen bleed or broken glass</p>
              </div>
              <div className="flex gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setConditions({ ...conditions, screenFlawless: true })}
                  className={`px-3.5 py-1 rounded-lg text-xs font-bold ${conditions.screenFlawless ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  Flawless
                </button>
                <button
                  type="button"
                  onClick={() => setConditions({ ...conditions, screenFlawless: false })}
                  className={`px-3.5 py-1 rounded-lg text-xs font-bold ${!conditions.screenFlawless ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  Defective
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-xs sm:text-sm text-slate-900">Original Box & Bill available?</p>
                <p className="text-[11px] text-slate-400">Adds an extra ₹1,500 bonus</p>
              </div>
              <input
                type="checkbox"
                checked={conditions.hasOriginalBoxCharger}
                onChange={(e) => setConditions({ ...conditions, hasOriginalBoxCharger: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setSellStep(5)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <span>View Guaranteed Value</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {sellStep === 5 && (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-5 sm:p-8 text-white flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-wider">ReTech Valuation</span>
              <h2 className="text-xl sm:text-2xl font-black mt-0.5">{selectedDevice?.name} ({selectedVariant})</h2>
              <p className="text-xs text-slate-400">Doorstep Location: {selectedCity}</p>
            </div>
            <div className="text-left sm:text-right border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
              <p className="text-xs text-indigo-300 font-semibold">Immediate Cash Payout</p>
              <p className="text-2xl sm:text-3xl font-black text-white">₹{calculatedPrice.toLocaleString()}</p>
            </div>
          </div>

          <div className="p-4 sm:p-8 space-y-4">
            {bookingConfirmed ? (
              <div className="bg-emerald-50 border border-emerald-200 p-5 sm:p-6 rounded-2xl text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl">✓</div>
                <h3 className="font-bold text-slate-900">Doorstep Pickup Scheduled!</h3>
                <p className="text-xs text-slate-600">ReTech agent will verify the phone and make an instant UPI transfer directly to you.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="Full Name" className="p-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none" />
                  <input type="tel" placeholder="Mobile Number" className="p-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none" />
                </div>
                <input type="text" placeholder="Pickup Address (House / Street / City)" className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none" />
                <button
                  type="button"
                  onClick={() => setBookingConfirmed(true)}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>Confirm Free Doorstep Inspection</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}