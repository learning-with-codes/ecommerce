export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  condition: string;
  warranty: string;
  badge?: string;
  testedPoints: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  verified: boolean;
  product: string;
}

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  ctaText: string;
  ctaSecondaryText: string;
  image: string;
  deviceTag: string;
  price: string;
  originalPrice: string;
  discountTag: string;
  bgColor: string;
  accentBadge: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  count: string;
  tag: string;
  image: string;
}

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  phone?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  condition?: string;
  warranty?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: "upi" | "card" | "cod" | "netbanking";
  paymentStatus: "paid" | "pending" | "failed";
  orderStatus: "confirmed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";
  trackingNumber: string;
  createdAt: string;
}

export interface SellRequest {
  id: string;
  requestNumber: string;
  userId?: string;
  deviceCategory: string;
  brand: string;
  model: string;
  variant?: string;
  bodyCondition: string;
  screenCondition: string;
  estimatedCash: number;
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  pickupDate: string;
  pickupTimeSlot: string;
  status: "scheduled" | "diagnostic_assigned" | "inspection_passed" | "payout_completed" | "cancelled";
  createdAt: string;
}

