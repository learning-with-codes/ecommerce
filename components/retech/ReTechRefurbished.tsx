import { Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  discount: string;
  price: string;
  originalPrice: string;
  rating: number;
  image: string;
  isCertified: boolean;
}

const refurbishedProducts: Product[] = [
  {
    id: "1",
    name: "Samsung Galaxy S24 Ultra 5G - Refurbished",
    discount: "£350 OFF",
    price: "£699.00",
    originalPrice: "£1,049.00",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=500&auto=format&fit=crop",
    isCertified: true,
  },
  {
    id: "2",
    name: "Apple MacBook Air (M3 Chip 13.3 Inch)",
    discount: "£280 OFF",
    price: "£819.00",
    originalPrice: "£1,099.00",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500&auto=format&fit=crop",
    isCertified: true,
  },
  {
    id: "3",
    name: "Apple iPhone 15 Pro Max - Pristine",
    discount: "£220 OFF",
    price: "£779.00",
    originalPrice: "£999.00",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=500&auto=format&fit=crop",
    isCertified: true,
  },
  {
    id: "4",
    name: "Apple MacBook Pro 14 Inch (M-Series)",
    discount: "£450 OFF",
    price: "£1,449.00",
    originalPrice: "£1,899.00",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=500&auto=format&fit=crop",
    isCertified: true,
  },
];

export default function ReTechRefurbished() {
  return (
    <section id="refurbished-section" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900">
              Buy Refurbished Devices
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              70-point quality check & 12 months comprehensive warranty
            </p>
          </div>
          <a href="#" className="text-xs font-bold text-teal-600 hover:text-teal-700">
            View All &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {refurbishedProducts.map((p) => (
            <div
              key={p.id}
              className="border border-neutral-200/80 rounded-2xl p-4 bg-white hover:shadow-lg transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-square w-full rounded-xl bg-neutral-50 overflow-hidden flex items-center justify-center p-4">
                  {p.isCertified && (
                    <span className="absolute top-2.5 left-2.5 bg-neutral-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                      RETECH CERTIFIED
                    </span>
                  )}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full object-contain group-hover:scale-105 transition duration-300"
                  />
                </div>

                <span className="inline-block mt-3 text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                  {p.discount}
                </span>

                <h3 className="text-sm font-bold text-neutral-900 mt-1.5 line-clamp-2">
                  {p.name}
                </h3>

                <div className="flex items-center gap-1 mt-2">
                  <span className="text-[11px] font-bold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    {p.rating} <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  </span>
                  <span className="text-[11px] text-neutral-400">Best Price Guarantee</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-baseline justify-between">
                <div>
                  <span className="text-base font-black text-neutral-900">{p.price}</span>
                  <span className="text-xs text-neutral-400 line-through ml-1.5 font-medium">
                    {p.originalPrice}
                  </span>
                </div>
                <button className="text-xs bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-1.5 rounded-lg transition">
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}