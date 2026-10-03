import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Order } from "@/types/retech";

const LOCAL_STORAGE_ORDERS_KEY = "retech_user_orders";

export async function createOrder(
  orderInput: Omit<Order, "id" | "orderNumber" | "createdAt" | "orderStatus" | "trackingNumber">
): Promise<{ order: Order | null; error?: string }> {
  // Flipkart style unique order ID: OD + timestamp + 4 random digits
  const orderNumber = `OD${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;
  const trackingNumber = `BD${Date.now().toString().slice(-8)}${Math.floor(10 + Math.random() * 90)}IN`;
  const now = new Date().toISOString();

  const newOrder: Order = {
    ...orderInput,
    id: orderNumber,
    orderNumber,
    trackingNumber,
    orderStatus: "confirmed",
    createdAt: now,
  };

  // 1. Attempt Supabase persistent insert if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          user_id: newOrder.userId || null,
          customer_name: newOrder.customerName,
          customer_email: newOrder.customerEmail,
          customer_phone: newOrder.customerPhone,
          shipping_address: newOrder.shippingAddress,
          items: newOrder.items,
          subtotal: newOrder.subtotal,
          discount_amount: newOrder.discountAmount,
          shipping_fee: newOrder.shippingFee,
          total_amount: newOrder.totalAmount,
          payment_method: newOrder.paymentMethod,
          payment_status: newOrder.paymentStatus,
          order_status: newOrder.orderStatus,
          tracking_number: trackingNumber,
        })
        .select()
        .single();

      if (!error && data) {
        newOrder.id = data.id;
      }
    } catch (err) {
      console.warn("Supabase orders table not ready, using local order sync:", err);
    }
  }

  // 2. Always persist locally so user can immediately view their order in My Orders tab
  if (typeof window !== "undefined") {
    try {
      const existingStr = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      const list: Order[] = existingStr ? JSON.parse(existingStr) : [];
      list.unshift(newOrder);
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(list));
    } catch {
      // ignore
    }
  }

  return { order: newOrder };
}

export async function getOrders(userId?: string): Promise<Order[]> {
  const localOrders: Order[] = [];
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      if (saved) {
        localOrders.push(...JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }

  if (isSupabaseConfigured() && userId) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const remoteOrders: Order[] = data.map((d: Record<string, unknown>) => ({
          id: String(d.id),
          orderNumber: String(d.order_number),
          userId: d.user_id ? String(d.user_id) : undefined,
          customerName: String(d.customer_name),
          customerEmail: String(d.customer_email),
          customerPhone: String(d.customer_phone),
          shippingAddress: d.shipping_address as Order["shippingAddress"],
          items: d.items as Order["items"],
          subtotal: Number(d.subtotal),
          discountAmount: Number(d.discount_amount || 0),
          shippingFee: Number(d.shipping_fee || 0),
          totalAmount: Number(d.total_amount),
          paymentMethod: d.payment_method as Order["paymentMethod"],
          paymentStatus: d.payment_status as Order["paymentStatus"],
          orderStatus: d.order_status as Order["orderStatus"],
          trackingNumber: String(d.tracking_number),
          createdAt: String(d.created_at),
        }));

        // Merge deduplicated
        const ids = new Set(remoteOrders.map((o) => o.orderNumber));
        const merged = [
          ...remoteOrders,
          ...localOrders.filter((o) => !ids.has(o.orderNumber)),
        ];
        return merged;
      }
    } catch (err) {
      console.warn("Supabase orders query error, falling back to local list:", err);
    }
  }

  return localOrders;
}
