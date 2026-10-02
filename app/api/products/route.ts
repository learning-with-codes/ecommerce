import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PRODUCTS } from "@/data/retechData";
import { Product } from "@/types/retech";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase();
  const sort = searchParams.get("sort");

  try {
    const supabase = await createClient();
    let query = supabase.from("products").select("*");

    if (category && category !== "all") {
      query = query.eq("category", category);
    }
    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      const products: Product[] = data.map((d: Record<string, unknown>) => ({
        id: String(d.id),
        name: String(d.name),
        brand: String(d.brand),
        category: String(d.category),
        image: String(d.image),
        price: Number(d.price),
        originalPrice: Number(d.original_price),
        discount: Number(d.discount || 0),
        rating: Number(d.rating || 4.9),
        reviewsCount: Number(d.reviews_count || 0),
        condition: String(d.condition),
        warranty: String(d.warranty),
        badge: d.badge ? String(d.badge) : undefined,
        testedPoints: Number(d.tested_points || 45),
      }));

      if (sort === "price_asc") products.sort((a, b) => a.price - b.price);
      if (sort === "price_desc") products.sort((a, b) => b.price - a.price);
      if (sort === "rating") products.sort((a, b) => b.rating - a.rating);

      return NextResponse.json({ success: true, count: products.length, products });
    }
  } catch (err) {
    console.warn("Falling back to local static catalog:", err);
  }

  // Fallback to static catalog
  let filtered = [...PRODUCTS];
  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search)
    );
  }
  if (sort === "price_asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

  return NextResponse.json({ success: true, count: filtered.length, products: filtered });
}
