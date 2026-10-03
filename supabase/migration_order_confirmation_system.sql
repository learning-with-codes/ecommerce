-- =========================================================================
-- Migration: Production Order Confirmation Email & Multi-Order System
-- Run this in Supabase SQL Editor (Dashboard -> SQL Editor)
-- =========================================================================

-- 1. Extend public.orders table with idempotency & email tracking fields
ALTER TABLE IF EXISTS public.orders 
  ADD COLUMN IF NOT EXISTS idempotency_key TEXT,
  ADD COLUMN IF NOT EXISTS email_status TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS email_error TEXT;

-- 2. Add Unique constraint on idempotency_key for duplicate request protection
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'orders_idempotency_key_key'
  ) THEN
    ALTER TABLE public.orders ADD CONSTRAINT orders_idempotency_key_key UNIQUE (idempotency_key);
  END IF;
END $$;

-- 3. Add constraint for email_status values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'orders_email_status_check'
  ) THEN
    ALTER TABLE public.orders ADD CONSTRAINT orders_email_status_check 
      CHECK (email_status IN ('pending', 'sent', 'failed'));
  END IF;
END $$;

-- 4. Create Normalized order_items Table (Relational items breakdown)
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL,
  product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  price NUMERIC(12, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  condition TEXT,
  warranty TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Add Performance Indexes
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_email_status ON public.orders(email_status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_number ON public.order_items(order_number);

-- 6. Enable Row Level Security (RLS) on order_items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 7. Policies for order_items
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their order items' AND tablename = 'order_items'
  ) THEN
    CREATE POLICY "Users can view their order items" ON public.order_items
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.orders
          WHERE orders.id = order_items.order_id
          AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can insert order items during checkout' AND tablename = 'order_items'
  ) THEN
    CREATE POLICY "Anyone can insert order items during checkout" ON public.order_items
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;
