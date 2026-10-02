-- =========================================================================
-- ReTech E-Commerce Platform - Complete Production Database Schema
-- Supabase PostgreSQL Architecture with RLS and Seed Catalog Data
-- =========================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. User Profiles Table (Mirrors Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  shipping_address JSONB DEFAULT '{}'::jsonb,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'diagnostic_agent')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  count TEXT NOT NULL,
  tag TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Products Table (Refurbished & Certified Hardware)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  image TEXT NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  original_price NUMERIC(12, 2) NOT NULL,
  discount NUMERIC(5, 2) DEFAULT 0,
  rating NUMERIC(3, 2) DEFAULT 4.9,
  reviews_count INTEGER DEFAULT 0,
  condition TEXT NOT NULL,
  warranty TEXT NOT NULL,
  badge TEXT,
  tested_points INTEGER DEFAULT 45,
  in_stock BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC(12, 2) NOT NULL,
  discount_amount NUMERIC(12, 2) DEFAULT 0,
  shipping_fee NUMERIC(12, 2) DEFAULT 0,
  total_amount NUMERIC(12, 2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('upi', 'card', 'cod', 'netbanking')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  order_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (order_status IN ('confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled')),
  tracking_number TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Persistent Shopping Cart Table
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, product_id)
);

-- 7. Persistent Wishlist Table
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, product_id)
);

-- 8. Doorstep Device Sell & Valuation Bookings Table
CREATE TABLE IF NOT EXISTS public.sell_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  device_category TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  variant TEXT,
  body_condition TEXT NOT NULL,
  screen_condition TEXT NOT NULL,
  estimated_cash NUMERIC(12, 2) NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  pickup_address TEXT NOT NULL,
  pickup_date TEXT NOT NULL,
  pickup_time_slot TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'diagnostic_assigned', 'inspection_passed', 'payout_completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. Customer Reviews & Ratings Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Verified Buyer',
  avatar TEXT,
  rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  verified BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sell_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Categories & Products & Reviews: Open Public Read
CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);

-- Profiles Policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert/update their own profile" ON public.profiles FOR ALL USING (auth.uid() = id);

-- Cart Policies
CREATE POLICY "Users can manage their own cart" ON public.cart_items FOR ALL USING (auth.uid() = user_id);

-- Wishlist Policies
CREATE POLICY "Users can manage their own wishlist" ON public.wishlist_items FOR ALL USING (auth.uid() = user_id);

-- Orders Policies
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Anyone can create an order" ON public.orders FOR INSERT WITH CHECK (true);

-- Sell Requests Policies
CREATE POLICY "Users can view their own sell requests" ON public.sell_requests FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Anyone can book a sell request" ON public.sell_requests FOR INSERT WITH CHECK (true);

-- =========================================================================
-- INITIAL SEED CATALOG DATA
-- =========================================================================

INSERT INTO public.categories (id, name, count, tag, image) VALUES
  ('smartphones', 'Smartphones', '140+ Items', 'Flagships & Budgets', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80'),
  ('laptops', 'Laptops & MacBooks', '85+ Items', 'M3, OLED & Ultrabooks', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80'),
  ('tablets', 'iPads & Tablets', '45+ Items', 'Stylus & Retina Screens', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80'),
  ('audio', 'Headphones & Earbuds', '90+ Items', 'Active Noise Cancelling', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'),
  ('wearables', 'Smartwatches', '60+ Items', 'Fitness & Cellular', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'),
  ('gaming', 'Gaming Consoles', '30+ Items', 'PS5, Xbox & Handhelds', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, brand, category, image, price, original_price, discount, rating, reviews_count, condition, warranty, badge, tested_points) VALUES
  ('p1', 'Apple iPhone 15 Pro Max (256GB)', 'Apple', 'smartphones', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80', 94999, 134900, 30, 4.9, 428, 'Refurbished - Like New', '1 Year ReTech Warranty', 'Top Seller', 45),
  ('p2', 'MacBook Air 15" M3 (16GB / 512GB)', 'Apple', 'laptops', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80', 82499, 119900, 31, 4.9, 182, 'Open Box', 'Official Brand Warranty', 'Almost New', 45),
  ('p3', 'Samsung Galaxy S24 Ultra (512GB Titanium)', 'Samsung', 'smartphones', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80', 89999, 129999, 31, 4.8, 290, 'Refurbished - Superb', '1 Year ReTech Warranty', 'AI Flagship', 45),
  ('p4', 'Sony WH-1000XM5 Wireless Headphones', 'Sony', 'audio', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80', 21999, 34990, 37, 4.9, 510, 'Certified Refurbished', '6 Months ReTech Warranty', 'Audiophile Pick', 32),
  ('p5', 'Apple iPad Air M2 11" (128GB Wi-Fi)', 'Apple', 'tablets', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80', 44999, 59900, 25, 4.8, 144, 'Open Box', '10 Months Brand Warranty', 'Great Value', 40),
  ('p6', 'Apple Watch Series 9 GPS 45mm', 'Apple', 'wearables', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80', 26999, 44900, 40, 4.7, 98, 'Refurbished - Like New', '1 Year ReTech Warranty', '40% Off', 36),
  ('p7', 'Sony PlayStation 5 Slim (Disc Edition)', 'Sony', 'gaming', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80', 39999, 54990, 27, 4.9, 320, 'Open Box', '1 Year Warranty', 'Gamer Special', 38),
  ('p8', 'Dell XPS 13 Plus Core i7 13th Gen (1TB)', 'Dell', 'laptops', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80', 79999, 142000, 44, 4.7, 86, 'Refurbished - Superb', '1 Year ReTech Warranty', '44% Discount', 45)
ON CONFLICT (id) DO NOTHING;
