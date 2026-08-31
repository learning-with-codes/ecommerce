"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-neutral-900">
              AURA<span className="text-neutral-400 font-light">STUDIO</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 text-sm font-medium text-neutral-600">
            <Link href="#collections" className="hover:text-black transition-colors">
              Collections
            </Link>
            <Link href="#featured" className="hover:text-black transition-colors">
              Featured
            </Link>
            <Link href="#about" className="hover:text-black transition-colors">
              About
            </Link>
            <Link href="#journal" className="hover:text-black transition-colors">
              Journal
            </Link>
          </nav>

          {/* Right Section: Actions & Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Quick Action Icons */}
            <div className="flex items-center space-x-4 pr-4 border-r border-neutral-200">
              <button
                className="text-neutral-600 hover:text-black transition-colors p-1"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                className="text-neutral-600 hover:text-black transition-colors p-1"
                aria-label="Favorites"
              >
                <Heart className="w-5 h-5" />
              </button>
              <button
                className="relative text-neutral-600 hover:text-black transition-colors p-1"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-neutral-700 hover:text-black px-3 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="text-sm font-medium bg-neutral-900 text-white px-4 py-2 rounded-xl hover:bg-neutral-800 transition-all shadow-sm active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex md:hidden items-center space-x-3">
            <button className="relative text-neutral-600 p-2" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-700 p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-100 px-6 pt-4 pb-6 space-y-4">
          <div className="space-y-2">
            <Link
              href="#collections"
              className="block py-2 text-base font-medium text-neutral-800 hover:text-black"
            >
              Collections
            </Link>
            <Link
              href="#featured"
              className="block py-2 text-base font-medium text-neutral-800 hover:text-black"
            >
              Featured
            </Link>
            <Link
              href="#about"
              className="block py-2 text-base font-medium text-neutral-800 hover:text-black"
            >
              About
            </Link>
            <Link
              href="#journal"
              className="block py-2 text-base font-medium text-neutral-800 hover:text-black"
            >
              Journal
            </Link>
          </div>

          {/* Mobile Auth Actions */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2.5">
            <Link
              href="/login"
              className="w-full text-center py-2.5 text-sm font-medium text-neutral-800 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="w-full text-center py-2.5 text-sm font-medium bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}