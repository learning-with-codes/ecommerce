'use client';

import React from 'react';
import { X, MapPin, ShoppingCart } from 'lucide-react';
import { CITIES } from '@/data/retechData';
import { CartItem } from '@/types/retech';

interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export function CityModal({ isOpen, onClose, selectedCity, onSelectCity }: CityModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" />
            Select Operational City
          </h3>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {CITIES.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => { onSelectCity(c); onClose(); }}
              className={`p-3 rounded-xl text-left text-xs font-bold ${
                selectedCity === c ? 'bg-indigo-600 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, cart, onRemove, onCheckout }: CartDrawerProps) {
  if (!isOpen) return null;
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-900">ReTech Cart</h3>
          </div>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
              <div>
                <p className="font-bold text-xs text-slate-900">{item.name}</p>
                <p className="text-[11px] text-slate-400">Qty: {item.qty} • ₹{item.price.toLocaleString()}</p>
              </div>
              <button type="button" onClick={() => onRemove(item.id)} className="text-xs font-bold text-rose-500">
                Remove
              </button>
            </div>
          ))}
          {cart.length === 0 && <p className="text-center text-slate-400 text-xs py-10">Your cart is empty.</p>}
        </div>

        {cart.length > 0 && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between font-black text-slate-900">
              <span>Total:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <button
              type="button"
              onClick={onCheckout}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}