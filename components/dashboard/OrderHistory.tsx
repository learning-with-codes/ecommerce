import { Order } from "@/types/dashboard";
import { Package, ExternalLink } from "lucide-react";

export default function OrderHistory({ orders }: { orders: Order[] }) {
  const getBadgeClass = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "processing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-neutral-50 text-neutral-600 border-neutral-200";
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center shadow-sm">
        <Package className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
        <p className="text-sm font-semibold text-neutral-800">No recent orders</p>
        <p className="text-xs text-neutral-400 mt-1">
          Your placed orders will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-neutral-900 text-base">Purchase History</h3>
          <p className="text-xs text-neutral-400 mt-0.5">Real-time status updates from Supabase</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-neutral-600">
          <thead className="bg-neutral-50/50 text-[11px] uppercase tracking-wider text-neutral-400 font-semibold border-b border-neutral-100">
            <tr>
              <th className="px-6 py-3.5">Order ID</th>
              <th className="px-6 py-3.5">Date</th>
              <th className="px-6 py-3.5">Total</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs">
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-neutral-50/60 transition">
                <td className="px-6 py-4 font-semibold text-neutral-900">
                  {ord.order_number || ord.id.slice(0, 8)}
                </td>
                <td className="px-6 py-4 text-neutral-500">
                  {new Date(ord.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 font-medium text-neutral-900">
                  ${Number(ord.total_amount || 0).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium border capitalize ${getBadgeClass(
                      ord.status
                    )}`}
                  >
                    {ord.status || "completed"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-neutral-500 hover:text-black transition">
                    <ExternalLink className="w-3.5 h-3.5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}