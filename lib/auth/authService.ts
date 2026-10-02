"use client";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { AuthUser } from "@/types/retech";

export { isSupabaseConfigured };

const LOCAL_STORAGE_USER_KEY = "retech_auth_user";

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        return {
          id: user.id,
          email: user.email,
          name:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "Valued Customer",
          phone: user.user_metadata?.phone || user.phone,
          avatar: user.user_metadata?.avatar_url,
        };
      }
    } catch (err) {
      console.warn("Failed to get Supabase user:", err);
    }
  }

  // Fallback to local storage session if demo user was logged in
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
  }

  return null;
}

export async function loginWithEmail(
  email: string,
  pass: string
): Promise<{ user: AuthUser | null; error?: string }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        const u: AuthUser = {
          id: data.user.id,
          email: data.user.email,
          name:
            data.user.user_metadata?.full_name ||
            data.user.email?.split("@")[0] ||
            "Valued Customer",
          phone: data.user.user_metadata?.phone,
          avatar: data.user.user_metadata?.avatar_url,
        };
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(u));
        }
        return { user: u };
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to sign in";
      return { user: null, error: message };
    }
  }

  // Seamless fallback if Supabase credentials are pending
  const fallbackUser: AuthUser = {
    id: `usr_${Date.now()}`,
    email,
    name: email.split("@")[0] || "Valued Customer",
    phone: "+91 98765 43210",
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(fallbackUser));
  }
  return { user: fallbackUser };
}

export async function signUpWithEmail(
  email: string,
  pass: string,
  name?: string,
  phone?: string
): Promise<{ user: AuthUser | null; error?: string }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            full_name: name,
            phone: phone,
          },
        },
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        const u: AuthUser = {
          id: data.user.id,
          email: data.user.email,
          name: name || data.user.email?.split("@")[0] || "Valued Customer",
          phone: phone,
        };
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(u));
        }
        return { user: u };
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to register";
      return { user: null, error: message };
    }
  }

  // Seamless fallback if Supabase credentials are pending
  const fallbackUser: AuthUser = {
    id: `usr_${Date.now()}`,
    email,
    name: name || email.split("@")[0] || "Valued Customer",
    phone: phone || "+91 98765 43210",
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(fallbackUser));
  }
  return { user: fallbackUser };
}

export async function loginWithGoogle(): Promise<{ error?: string }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
        },
      });
      if (error) return { error: error.message };
      return {};
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Google sign in error";
      return { error: message };
    }
  }

  // Fallback demo Google user
  const googleDemoUser: AuthUser = {
    id: `goog_${Date.now()}`,
    email: "user.google@gmail.com",
    name: "Google Account User",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(googleDemoUser));
  }
  return {};
}

export async function logoutUser(): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Supabase sign out error:", err);
    }
  }
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }
}
