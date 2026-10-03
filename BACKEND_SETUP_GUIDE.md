# ReTech E-Commerce: Supabase & Vercel Backend Integration Manual

> Complete step-by-step documentation for connecting this project to your personal **Supabase PostgreSQL database** and deploying to **Vercel** with full e-commerce backend functionality.

---

## 1. Architecture & Tech Stack

- **Frontend Framework**: Next.js 15+ (App Router) + React 19 + TypeScript + Tailwind CSS
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS) & Supabase SSR Client
- **Hosting & CI/CD**: Vercel (Edge network, Serverless API functions)
- **State & Storage**: Hybrid persistence (Supabase PostgreSQL synced with local browser cache fallback)

---

## 2. Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New Project**.
3. Choose your Organization.
4. Set a **Project Name** (e.g. `retech-store`).
5. Generate and securely save a **Database Password**.
6. Choose the **Region** closest to your target users (e.g. `ap-south-1` Mumbai or `ap-southeast-1` Singapore).
7. Click **Create new project** and wait 1–2 minutes for PostgreSQL to provision.

---

## 3. Step 2: Get Connection Keys from Supabase

1. In your Supabase Dashboard, click the **Settings** gear icon at the bottom of the left sidebar.
2. Navigate to **API** (or **Data API**).
3. Copy the following credentials:
   - **Project URL** (Format: `https://<your-project-id>.supabase.co`)
   - **anon / publishable API Key** (Starts with `sb_publishable_...` or JWT `eyJ...`)

---

## 4. Step 3: Run Database Schema & Migrations

A production schema is provided in `supabase/schema.sql`.

1. Go to the Supabase Dashboard and click **SQL Editor** in the left menu.
2. Click **+ New query**.
3. Open `supabase/schema.sql` in this project, copy the entire file contents, and paste it into the SQL Editor.
4. Click **Run** (or press `Ctrl` + `Enter`).

### What this script creates:
- **`profiles`**: User metadata, phone, shipping addresses.
- **`categories`**: Electronics categories (Smartphones, Laptops, Audio, Tablets, etc.).
- **`products`**: Refurbished gadgets with prices, discounts, 45-point diagnostic score, and stock.
- **`orders`**: Full e-commerce orders, items JSON, tracking numbers, and payment status.
- **`cart_items`**: Persistent shopping cart per user.
- **`wishlist_items`**: User wishlist items.
- **`sell_requests`**: Doorstep device buyback valuations & cashout bookings.
- **`reviews`**: Verified customer ratings.
- **Row Level Security (RLS)**: Public read for products/categories/reviews; authenticated CRUD for orders/cart/wishlist/valuations.
- **Initial Seed Data**: Pre-populates all products so your catalog works immediately!

---

## 5. Step 4: Configure Supabase Auth Providers & Redirects

1. Go to **Authentication** -> **Providers** -> **Email**:
   - Ensure **Enable Email provider** is **ON**.
   - *(Recommended for fast testing)*: Turn **Confirm email** to **OFF** so test users can sign in immediately without waiting for confirmation emails.
2. Go to **Authentication** -> **URL Configuration**:
   - Set **Site URL** to your production Vercel URL (e.g. `https://retech-store.vercel.app`).
   - In **Redirect URLs**, add:
     - `https://your-project.vercel.app/**`
     - `http://localhost:3000/**`

---

## 6. Step 5: Local Environment Setup

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-or-publishable-key>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-anon-or-publishable-key>
```

Run locally:
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to verify:
1. Click **Login** in the navbar and register an account.
2. Once logged in, notice your profile initial replaces the Login button.
3. Add a refurbished iPhone or MacBook to your cart.
4. Click **Proceed to Checkout**, enter address, select payment (UPI / COD / Card), and place order.
5. Check your Supabase **Table Editor** -> `orders` table to see the saved order!

---

## 7. Step 6: Deploying to Vercel

1. Push your project to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete retech ecommerce with supabase backend"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. Go to [https://vercel.com](https://vercel.com) and log in.
3. Click **Add New...** -> **Project**.
4. Select your GitHub repository.
5. In the configuration screen:
   - **Framework Preset**: Next.js (automatically detected).
   - **Root Directory**: `./`
6. Expand **Environment Variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://<your-project-id>.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `<your-anon-or-publishable-key>`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: `<your-anon-or-publishable-key>`
7. Click **Deploy**.
8. Wait ~60 seconds for the build to finish.
9. Copy your live Vercel domain (e.g. `https://retech-store.vercel.app`).
10. Return to Supabase -> **Authentication** -> **URL Configuration** and ensure your live Vercel URL is listed under **Redirect URLs**.

---

## 8. Backend Code Structure Reference

- `lib/supabase/client.ts`: Browser client for client-side Auth and realtime queries.
- `lib/supabase/server.ts`: Server client for Next.js App Router API Routes.
- `lib/supabase/proxy.ts`: Session middleware configured to exempt `/api/*` routes.
- `lib/services/ordersService.ts`: Order creation and fetching with automatic fallback.
- `lib/services/valuationsService.ts`: Doorstep device sell valuation bookings.
- `app/api/products/route.ts`: Catalog API with category, search, and sorting.
- `app/api/orders/route.ts`: Checkout submission and user order retrieval.
- `app/api/valuations/route.ts`: Device sell valuation API.
- `supabase/schema.sql`: Complete PostgreSQL DDL with RLS and initial seeds.

---

## 9. Common Questions & Troubleshooting

- **Q: Why are orders appearing even if Supabase keys aren't added yet?**  
  *A: The codebase uses a resilient hybrid service pattern. If Supabase is unreachable or not yet configured, orders and carts are saved in local storage so the checkout flow never crashes. Once valid Supabase keys and tables are active, it syncs seamlessly with PostgreSQL.*

- **Q: Can I use both old JWT anon keys and new Supabase publishable keys?**  
  *A: Yes! The client and server configuration (`lib/supabase/client.ts` and `lib/supabase/server.ts`) inspects both `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.*
