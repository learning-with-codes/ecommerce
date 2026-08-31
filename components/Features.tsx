import { Truck, ShieldCheck, RefreshCw, Award } from "lucide-react";

const valueProps = [
  {
    icon: Truck,
    title: "Complimentary Delivery",
    desc: "Free standard shipping on all orders over $150 worldwide.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Guarantee",
    desc: "Built to endure. We cover manufacturing defects for life.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Hassle-Free Returns",
    desc: "Experience it at home. Return without friction if unsatisfied.",
  },
  {
    icon: Award,
    title: "Eco-Conscious Build",
    desc: "100% recycled aluminum and zero-plastic packaging.",
  },
];

export default function Features() {
  return (
    <section className="py-20 border-b border-neutral-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-start space-y-3 p-4">
                <div className="p-3 bg-neutral-100 rounded-xl text-neutral-900">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-neutral-900 text-base">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}