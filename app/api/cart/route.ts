import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PRODUCTS } from "@/data/retechData";
import { CartItem } from "@/types/retech";

// In-memory persistent fallback map per user for development and resilient sync
const serverCartStore = new Map<string, CartItem[]>();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ success: true, items: [] });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("cart_items")
      .select("product_id, quantity")
      .eq("user_id", userId);

    if (!error && data && data.length > 0) {
      const items: CartItem[] = [];
      for (const row of data) {
        const prod = PRODUCTS.find((p) => p.id === row.product_id);
        if (prod) {
          items.push({
            product: prod,
            quantity: Number(row.quantity) || 1,
          });
        }
      }
      serverCartStore.set(userId, items);
      return NextResponse.json({ success: true, items });
    }
  } catch (err) {
    console.warn("[API /api/cart GET] Supabase read fallback:", err);
  }

  // Return server store cache
  const cached = serverCartStore.get(userId) || [];
  return NextResponse.json({ success: true, items: cached });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, items } = body as { userId: string; items: CartItem[] };

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Authentication userId required to save cart" },
        { status: 400 }
      );
    }

    const validItems: CartItem[] = Array.isArray(items) ? items : [];
    serverCartStore.set(userId, validItems);

    try {
      const supabase = await createClient();
      // Remove existing rows for user
      await supabase.from("cart_items").delete().eq("user_id", userId);

      // Insert new rows
      if (validItems.length > 0) {
        const rows = validItems.map((item) => ({
          user_id: userId,
          product_id: item.product.id,
          quantity: item.quantity,
          updated_at: new Date().toISOString(),
        }));
        await supabase.from("cart_items").insert(rows);
      }
    } catch (err) {
      console.warn("[API /api/cart POST] Supabase write fallback:", err);
    }

    return NextResponse.json({ success: true, count: validItems.length });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to sync cart";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ success: false, error: "Missing userId" }, { status: 400 });
  }

  serverCartStore.delete(userId);

  try {
    const supabase = await createClient();
    await supabase.from("cart_items").delete().eq("user_id", userId);
  } catch {
    // ignore
  }

  return NextResponse.json({ success: true, message: "Cart cleared" });
}
