import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Profile, Order } from "@/types/dashboard";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import UserProfileCard from "@/components/dashboard/UserProfileCard";
import OrderHistory from "@/components/dashboard/OrderHistory";
import LogoutButton from "@/components/logout-button";
import { LayoutGrid, ShoppingBag, CreditCard, Settings } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Verify Authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/login");
  }

  // 2. Fetch User Profile
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const profile: Profile = {
    id: user.id,
    email: user.email,
    full_name:
      profileData?.full_name ||
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      "Valued Member",
    created_at: user.created_at,
    role: profileData?.role || "Verified",
  };

  // 3. Fetch User Orders
  const { data: ordersData } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const orders: Order[] = ordersData || [];
  const totalSpent = orders.reduce((sum, ord) => sum + (Number(ord.total_amount) || 0), 0);

  return (
    <div className="min-h-screen bg-neutral-50/50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-neutral-100 hidden md:flex flex-col justify-between p-6">
        <div className="space-y-8">
          <Link href="/" className="text-xl font-black text-neutral-900 tracking-tight">
            AURA<span className="text-neutral-400 font-light">STUDIO</span>
          </Link>
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-neutral-900 text-white text-sm font-medium transition"
            >
              <LayoutGrid className="w-4 h-4" /> Overview
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-50 text-sm font-medium transition"
            >
              <ShoppingBag className="w-4 h-4" /> Orders
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-50 text-sm font-medium transition"
            >
              <CreditCard className="w-4 h-4" /> Payment Methods
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-600 hover:bg-neutral-50 text-sm font-medium transition"
            >
              <Settings className="w-4 h-4" /> Settings
            </a>
          </nav>
        </div>

        {/* Existing Logout Button from repository */}
        <div className="pt-4 border-t border-neutral-100">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-neutral-100 px-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-neutral-900">Dashboard</h1>
            <p className="text-xs text-neutral-400">
              Welcome back, {profile.full_name?.split(" ")[0]}
            </p>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold text-neutral-700 hover:text-black transition"
          >
            Back to Store &rarr;
          </Link>
        </header>

        <main className="p-8 space-y-8 max-w-7xl">
          <DashboardMetrics
            totalOrders={orders.length}
            totalSpent={totalSpent}
            memberTier={profile.role || "Gold"}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <UserProfileCard initialProfile={profile} />
            </div>
            <div className="lg:col-span-8">
              <OrderHistory orders={orders} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}