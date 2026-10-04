import { CartItem, Product } from "@/types/retech";

/**
 * Service to manage authenticated User-Specific Cart & Wishlist persistence.
 *
 * Rules:
 * 1. Logged-in user:
 *    - Cart and Wishlist are permanently stored in the backend (Supabase / server API)
 *      under their specific user ID.
 *    - Persists across page refreshes, browser re-openings, and multiple sessions.
 * 2. Non-logged-in (Guest) user:
 *    - Items stay strictly in-memory during the current session.
 *    - Page reload / refresh immediately clears the cart and wishlist back to empty ([]).
 */

const USER_CART_PREFIX = "retech_user_cart_";
const USER_WISHLIST_PREFIX = "retech_user_wishlist_";

export async function fetchUserCart(userId: string): Promise<CartItem[]> {
  if (!userId) return [];

  // Check user-specific local backup first for instant load
  let cachedItems: CartItem[] = [];
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(`${USER_CART_PREFIX}${userId}`);
      if (stored) cachedItems = JSON.parse(stored);
    } catch {
      // ignore
    }
  }

  try {
    const res = await fetch(`/api/cart?userId=${encodeURIComponent(userId)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        // Cache for this user
        if (typeof window !== "undefined") {
          localStorage.setItem(`${USER_CART_PREFIX}${userId}`, JSON.stringify(data.items));
        }
        return data.items;
      }
    }
  } catch (err) {
    console.warn("[cartWishlistService] Backend cart fetch error, using user cache:", err);
  }

  return cachedItems;
}

export async function syncUserCart(userId: string, items: CartItem[]): Promise<void> {
  if (!userId) return;

  // 1. Immediately update user-specific persistent cache
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(`${USER_CART_PREFIX}${userId}`, JSON.stringify(items));
    } catch {
      // ignore
    }
  }

  // 2. Persist to backend server API & Supabase
  try {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, items }),
    });
  } catch (err) {
    console.warn("[cartWishlistService] Backend cart sync warning:", err);
  }
}

export async function fetchUserWishlist(userId: string): Promise<Product[]> {
  if (!userId) return [];

  let cachedItems: Product[] = [];
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(`${USER_WISHLIST_PREFIX}${userId}`);
      if (stored) cachedItems = JSON.parse(stored);
    } catch {
      // ignore
    }
  }

  try {
    const res = await fetch(`/api/wishlist?userId=${encodeURIComponent(userId)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        if (typeof window !== "undefined") {
          localStorage.setItem(`${USER_WISHLIST_PREFIX}${userId}`, JSON.stringify(data.items));
        }
        return data.items;
      }
    }
  } catch (err) {
    console.warn("[cartWishlistService] Backend wishlist fetch error, using user cache:", err);
  }

  return cachedItems;
}

export async function syncUserWishlist(userId: string, items: Product[]): Promise<void> {
  if (!userId) return;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(`${USER_WISHLIST_PREFIX}${userId}`, JSON.stringify(items));
    } catch {
      // ignore
    }
  }

  try {
    await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, items }),
    });
  } catch (err) {
    console.warn("[cartWishlistService] Backend wishlist sync warning:", err);
  }
}

/**
 * Removes any generic unauthenticated cart keys from storage so guests always
 * start with an empty cart on page load/refresh.
 */
export function purgeGuestStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("retech_cart");
    localStorage.removeItem("retech_guest_cart");
    localStorage.removeItem("retech_wishlist");
    localStorage.removeItem("retech_guest_wishlist");
    sessionStorage.removeItem("retech_cart");
  } catch {
    // ignore
  }
}
