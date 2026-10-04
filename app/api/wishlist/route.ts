import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PRODUCTS } from "@/data/retechData";
import { Product } from "@/types/retech";

const serverWishlistStore = new Map<string, Product[]>();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ success: true, items: [] });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("wishlist_items")
      .select("product_id")
      .eq("user_id", userId);

    if (!error && data && data.length > 0) {
      const items: Product[] = [];
      for (const row of data) {
        const prod = PRODUCTS.find((p) => p.id === row.product_id);
        if (prod) items.push(prod);
      }
      serverWishlistStore.set(userId, items);
      return NextResponse.json({ success: true, items });
    }
  } catch (err) {
    console.warn("[API /api/wishlist GET] Supabase read fallback:", err);
  }

  const cached = serverWishlistStore.get(userId) || [];
  return NextResponse.json({ success: true, items: cached });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, items } = body as { userId: string; items: Product[] };

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication userId required to save wishlist" },
        { status: 400 }
      );
    }

    const validItems: Product[] = Array.isArray(items) ? items : [];
    serverWishlistStore.set(userId, validItems);

    try {
      const supabase = await createClient();
      await supabase.from("wishlist_items").delete().eq("user_id", userId);

      if (validItems.length > 0) {
        const rows = validItems.map((item) => ({
          user_id: userId,
          product_id: item.id,
        }));
        await supabase.from("wishlist_items").insert(rows);
      }
    } catch (err) {
      console.warn("[API /api/wishlist POST] Supabase write fallback:", err);
    }

    return NextResponse.json({ success: true, count: validItems.length });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to sync wishlist";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
