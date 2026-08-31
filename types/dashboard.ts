export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  role?: string;
  created_at?: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  created_at: string;
  total_amount: number;
  status: "pending" | "processing" | "delivered" | "cancelled" | "completed";
}