import { Clock, ArrowRight } from "lucide-react";

const stores = [
  {
    city: "KOLKATA",
    name: "Cashify Buy, Sell and Repair Mobile Store Bangur",
    address: "Gr Floor Shop-1, 135 Bangur Avenue, BL-A",
    timings: "10:00 AM - 09:00 PM",
  },
  {
    city: "KOLKATA",
    name: "Cashify Store Ganesh Chandra Avenue",
    address: "31, Ganesh Chandra Avenue, ground floor",
    timings: "12:00 PM - 06:00 PM",
  },
  {
    city: "KOLKATA",
    name: "Cashify Store Shyambazar Kolkata",
    address: "13 Bhupendra Bose Avenue, Kolkata",
    timings: "10:00 AM - 09:00 PM",
  },
  {
    city: "KOLKATA",
    name: "Cashify Store Saltlake Kolkata",
    address: "Room no-5, Ground Floor, EP Block, Saltlake",
    timings: "10:00 AM - 09:00 PM",
  },
];

export default function StoreLocator() {
  return (
    <section id="stores-section" className="py-14 bg-neutral-50 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900">
              Our Exclusive Stores
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              200+ Experience Centres with 4.5+ Star Ratings
            </p>
          </div>

          <div className="flex items-center gap-2 max-w-xs w-full">
            <input
              type="text"
              placeholder="Enter Pincode"
              className="px-3.5 py-2 bg-white border border-neutral-200 rounded-xl text-xs flex-1 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
            <button className="bg-teal-600 text-white p-2 rounded-xl text-xs font-bold hover:bg-teal-700 transition">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stores.map((s, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold text-teal-700 tracking-wider">
                  {s.city}
                </span>
                <h3 className="text-sm font-bold text-neutral-900 mt-1 line-clamp-2">
                  {s.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
                  {s.address}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100">
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-600 mb-3">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Timings: {s.timings}</span>
                </div>
                <a
                  href="#"
                  className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                >
                  View Details &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}