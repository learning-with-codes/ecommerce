"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/logout-button";
import {
  LayoutGrid,
  ShoppingBag,
  CreditCard,
  Settings,
  Menu,
  X,
  Store,
  Bell,
} from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
  };
}

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid },
  { label: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { label: "Payment Methods", href: "/dashboard/billing", icon: CreditCard },
  { label: "Preferences", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardShell({ children, user }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-neutral-50/50 flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-100 sticky top-0 z-40">
        <Link href="/" className="text-xl font-black text-neutral-900 tracking-tight">
          AURA<span className="text-neutral-400 font-light">STUDIO</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-neutral-700 hover:text-black focus:outline-none"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-neutral-100 flex flex-col justify-between p-6 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:w-64 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* Brand Logo */}
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-black text-neutral-900 tracking-tight">
              AURA<span className="text-neutral-400 font-light">STUDIO</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-neutral-900 text-white shadow-sm"
                      : "text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions / Sign Out */}
        <div className="space-y-4 pt-4 border-t border-neutral-100">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition"
          >
            <Store className="w-4 h-4" />
            <span>Return to Store</span>
          </Link>

          <div className="pt-2">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Overlay for mobile drawer */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="hidden md:flex h-20 bg-white border-b border-neutral-100 px-8 items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-neutral-900">User Dashboard</h1>
            <p className="text-xs text-neutral-400">
              Welcome back, {user.name.split(" ")[0]}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              aria-label="Notifications"
              className="p-2 rounded-xl bg-neutral-50 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-100 transition"
            >
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 pl-2 border-l border-neutral-100">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-semibold text-neutral-900">{user.name}</p>
                <p className="text-[11px] text-neutral-400 truncate max-w-[140px]">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}