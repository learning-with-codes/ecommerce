'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import { User, Mail, Lock, Eye, EyeOff, Star } from 'lucide-react';

export default function AuthPageRoute() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Form states
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeTab === 'signin') {
      console.log('Signing In:', { email, password, rememberMe });
      // Yahan lib/supabase/client.ts ka signInWithPassword call kar sakte hain
    } else {
      console.log('Signing Up:', { fullName, email, password, confirmPassword });
      // Yahan lib/supabase/client.ts ka signUp call kar sakte hain
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      {/* ================= LEFT PANEL: TECH SHOWCASE & BRANDING ================= */}
      <section className="relative w-full lg:w-1/2 bg-[#1E2530] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden">
        {/* Top Header: Brand Name + 5-Star Social Proof */}
        <div className="flex items-start justify-between z-10">
          <div>
            <Link href="/" className="text-3xl sm:text-4xl font-semibold tracking-tight text-white font-serif">
              ReTech
            </Link>
          </div>

          {/* Social Proof Badge */}
          <div className="flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-slate-600/70 bg-[#252D3A]/60 backdrop-blur-md shadow-lg text-center p-2">
            <span className="text-2xl font-bold text-white leading-none">5</span>
            <div className="flex items-center gap-0.5 my-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 stroke-none" />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-300 font-medium leading-tight">
              Over 50,000<br />Happy Customers
            </span>
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="my-8 z-10 max-w-xl">
          <h1 className="text-2xl sm:text-4xl font-serif tracking-normal leading-snug text-slate-100">
            ReTech - Next-Gen Tech Delivered
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 font-light tracking-wide">
            Experience Unparalleled Quality and Style.
          </p>
        </div>

        {/* Product Showcase Image Frame */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-[#161B22] z-10">
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80"
            alt="ReTech Flagship Devices: Laptops, Smartphones, and Accessories"
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161B22]/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Background ambient lighting accent */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ================= RIGHT PANEL: AUTHENTICATION FORM ================= */}
      <section className="w-full lg:w-1/2 bg-white flex flex-col justify-between p-8 sm:p-14 lg:p-20">
        <div className="max-w-md w-full mx-auto my-auto">
          {/* Tab Navigation: Sign In | Sign Up */}
          <div className="flex items-center justify-center space-x-6 text-xl mb-8">
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              className={`pb-1.5 font-medium transition-all relative ${
                activeTab === 'signin'
                  ? 'text-slate-900 border-b-2 border-slate-900 font-semibold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Sign In
            </button>
            <span className="text-slate-300 font-light">|</span>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`pb-1.5 font-medium transition-all relative ${
                activeTab === 'signup'
                  ? 'text-slate-900 border-b-2 border-slate-900 font-semibold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Social Auth: Continue with Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-3 text-xs text-slate-500 font-normal">
              or with your email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  {activeTab === 'signin' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up) */}
            {activeTab === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me (Sign In) */}
            {activeTab === 'signin' && (
              <div className="flex items-center pt-1">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-slate-900 focus:ring-slate-800 border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-700 cursor-pointer select-none">
                  Remember me
                </label>
              </div>
            )}

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#0A1128] hover:bg-[#141E3C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
              >
                {activeTab === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
              </button>
            </div>
          </form>

          {/* Forgot Password */}
          {activeTab === 'signin' && (
            <div className="text-center mt-4">
              <a
                href="#forgot-password"
                className="text-xs font-normal text-slate-600 hover:text-slate-900 hover:underline transition-colors"
              >
                Forgot Password?
              </a>
            </div>
          )}

          {/* Switch Tab */}
          <div className="text-center mt-6 text-xs text-slate-600">
            {activeTab === 'signin' ? (
              <p>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className="font-semibold text-slate-900 underline hover:text-slate-700 ml-1"
                >
                  Create one here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className="font-semibold text-slate-900 underline hover:text-slate-700 ml-1"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
          <span>&copy; {new Date().getFullYear()} ReTech. All rights reserved.</span>
          <div className="flex space-x-3 mt-2 sm:mt-0">
            <Link href="#legal" className="hover:text-slate-600 transition-colors">Legal</Link>
            <span>|</span>
            <Link href="#links" className="hover:text-slate-600 transition-colors">Links</Link>
            <span>|</span>
            <Link href="#terms" className="hover:text-slate-600 transition-colors">Terms</Link>
          </div>
        </div>
      </section>
    </main>
  );
}