import {
  Smartphone,
  Laptop,
  Gamepad2,
  Camera,
  Watch,
  Wrench,
  RotateCcw,
  Tablet,
  Store,
  Headphones,
} from "lucide-react";

const retechServices = [
  { label: "Sell Phone", icon: Smartphone, href: "#sell-section" },
  { label: "Buy Gadgets", icon: Headphones, href: "#refurbished-section" },
  { label: "Buy Phone", icon: Smartphone, href: "#refurbished-section" },
  { label: "Buy MacBooks", icon: Laptop, href: "#refurbished-section" },
  { label: "Rent Consoles", icon: Gamepad2, href: "#" },
  { label: "Buy Cameras", icon: Camera, href: "#" },
  { label: "Express Repair", icon: Wrench, href: "#" },
  { label: "Nearby Stores", icon: Store, href: "#stores-section" },
  { label: "Smartwatches", icon: Watch, href: "#" },
  { label: "Eco Recycle", icon: RotateCcw, href: "#" },
  { label: "Buy Tablets", icon: Tablet, href: "#" },
];

export default function ReTechServices() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-black text-neutral-900 mb-8">
          Our Services
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6">
          {retechServices.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-teal-50/50 border border-transparent hover:border-teal-100 transition group"
              >
                <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-700 group-hover:bg-teal-600 group-hover:text-white transition shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="mt-2.5 text-xs font-semibold text-neutral-800 leading-tight">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}