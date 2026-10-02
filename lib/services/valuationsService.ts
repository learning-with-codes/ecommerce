import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { SellRequest } from "@/types/retech";

const LOCAL_STORAGE_SELL_REQUESTS_KEY = "retech_user_sell_requests";

export async function createSellRequest(
  input: Omit<SellRequest, "id" | "requestNumber" | "createdAt" | "status">
): Promise<{ request: SellRequest | null; error?: string }> {
  const requestNumber = `VAL-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date().toISOString();

  const newRequest: SellRequest = {
    ...input,
    id: `val_${Date.now()}`,
    requestNumber,
    status: "scheduled",
    createdAt: now,
  };

  // 1. Attempt Supabase insert
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("sell_requests")
        .insert({
          request_number: requestNumber,
          user_id: newRequest.userId || null,
          device_category: newRequest.deviceCategory,
          brand: newRequest.brand,
          model: newRequest.model,
          variant: newRequest.variant,
          body_condition: newRequest.bodyCondition,
          screen_condition: newRequest.screenCondition,
          estimated_cash: newRequest.estimatedCash,
          customer_name: newRequest.customerName,
          customer_phone: newRequest.customerPhone,
          pickup_address: newRequest.pickupAddress,
          pickup_date: newRequest.pickupDate,
          pickup_time_slot: newRequest.pickupTimeSlot,
          status: newRequest.status,
        })
        .select()
        .single();

      if (!error && data) {
        newRequest.id = data.id;
      }
    } catch (err) {
      console.warn("Supabase sell_requests not ready, stored locally:", err);
    }
  }

  // 2. Always persist locally
  if (typeof window !== "undefined") {
    try {
      const existing = localStorage.getItem(LOCAL_STORAGE_SELL_REQUESTS_KEY);
      const list: SellRequest[] = existing ? JSON.parse(existing) : [];
      list.unshift(newRequest);
      localStorage.setItem(LOCAL_STORAGE_SELL_REQUESTS_KEY, JSON.stringify(list));
    } catch {
      // ignore
    }
  }

  return { request: newRequest };
}

export async function getSellRequests(userId?: string): Promise<SellRequest[]> {
  const localRequests: SellRequest[] = [];
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SELL_REQUESTS_KEY);
      if (saved) {
        localRequests.push(...JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }

  if (isSupabaseConfigured() && userId) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("sell_requests")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const remoteList: SellRequest[] = data.map((d: Record<string, unknown>) => ({
          id: String(d.id),
          requestNumber: String(d.request_number),
          userId: d.user_id ? String(d.user_id) : undefined,
          deviceCategory: String(d.device_category),
          brand: String(d.brand),
          model: String(d.model),
          variant: d.variant ? String(d.variant) : undefined,
          bodyCondition: String(d.body_condition),
          screenCondition: String(d.screen_condition),
          estimatedCash: Number(d.estimated_cash),
          customerName: String(d.customer_name),
          customerPhone: String(d.customer_phone),
          pickupAddress: String(d.pickup_address),
          pickupDate: String(d.pickup_date),
          pickupTimeSlot: String(d.pickup_time_slot),
          status: d.status as SellRequest["status"],
          createdAt: String(d.created_at),
        }));

        const setIds = new Set(remoteList.map((r) => r.requestNumber));
        return [
          ...remoteList,
          ...localRequests.filter((l) => !setIds.has(l.requestNumber)),
        ];
      }
    } catch (err) {
      console.warn("Error fetching sell requests from Supabase:", err);
    }
  }

  return localRequests;
}
