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