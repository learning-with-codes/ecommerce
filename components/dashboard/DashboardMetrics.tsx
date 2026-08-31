import { ShoppingBag, CreditCard, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardMetricsProps {
  totalOrders: number;
  totalSpent: number;
  memberTier: string;
}

export default function DashboardMetrics({
  totalOrders,
  totalSpent,
  memberTier,
}: DashboardMetricsProps) {
  const metrics = [
    {
      title: "Orders Placed",
      value: totalOrders,
      icon: ShoppingBag,
      note: "Lifetime purchases",
    },
    {
      title: "Total Spent",
      value: `$${totalSpent.toFixed(2)}`,
      icon: CreditCard,
      note: "Completed transactions",
    },
    {
      title: "Account Tier",
      value: memberTier,
      icon: Award,
      note: "Standard privileges",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {metrics.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="border-neutral-100 rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  {item.title}
                </span>
                <div className="p-2 rounded-xl bg-neutral-50 text-neutral-800 border border-neutral-100">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold tracking-tight text-neutral-900">
                  {item.value}
                </p>
                <p className="text-xs text-neutral-500 mt-1 font-medium">
                  {item.note}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}