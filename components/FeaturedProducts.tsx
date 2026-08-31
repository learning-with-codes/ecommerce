import { Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Aura Pro Wireless Headphones",
    category: "Audio",
    price: "$349.00",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Minimalist Chrono Watch",
    category: "Timepieces",
    price: "$280.00",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "MagSafe Charging Pad",
    category: "Accessories",
    price: "$89.00",
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Leather Laptop Folio",
    category: "Carry",
    price: "$145.00",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
  },
];

export default function FeaturedProducts() {
  return (
    <section id="featured" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              Selected Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-1">
              Curated Essentials
            </h2>
          </div>
          <a
            href="#"
            className="mt-4 md:mt-0 text-sm font-semibold text-neutral-900 hover:text-neutral-600 transition"
          >
            Explore all products &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />
                <button
                  className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-neutral-900 hover:text-white"
                  aria-label="Add to cart"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <p className="text-xs text-neutral-400">{product.category}</p>
                  <h3 className="text-sm font-semibold text-neutral-900 mt-1">
                    {product.name}
                  </h3>
                </div>
                <p className="text-sm font-medium text-neutral-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}