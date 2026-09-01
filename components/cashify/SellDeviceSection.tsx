import {
  Smartphone,
  Laptop,
  Tv,
  Tablet,
  Gamepad2,
  Watch,
  Speaker,
  MoreHorizontal,
} from "lucide-react";

const sellCategories = [
  { label: "Sell Phone", icon: Smartphone },
  { label: "Sell Laptop", icon: Laptop },
  { label: "Sell TV", icon: Tv },
  { label: "Sell Tablet", icon: Tablet },
  { label: "Sell Gaming Consoles", icon: Gamepad2 },
  { label: "Sell Smartwatch", icon: Watch },
  { label: "Sell Smart Speakers", icon: Speaker },
  { label: "Sell More", icon: MoreHorizontal },
];

export default function SellDeviceSection() {
  return (
    <section id="sell-section" className="py-12 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-black text-neutral-900 mb-8">
          Sell Your Old Device Now
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {sellCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-neutral-200/70 hover:border-teal-500 hover:shadow-md transition cursor-pointer flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="mt-3 text-xs font-bold text-neutral-800">
                  {cat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}