import { LucideIcon } from 'lucide-react';

export interface CategoryItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export interface HeroSlideItem {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  ctaAction: 'sell' | 'buy' | 'repair';
  bgColor: string;
  buttonColor: string;
  icon: string;
}

export interface BrandItem {
  id: string;
  name: string;
  logo: string;
  popular: boolean;
}

export interface SellDeviceItem {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  variants: string[];
  img: string;
}

export interface RefurbishedPhoneItem {
  id: string;
  name: string;
  storage: string;
  color: string;
  brand: string;
  grade: 'Pristine' | 'Standard' | 'Fair';
  conditionTag: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  features: string[];
  emoji: string;
}

export interface RepairServiceItem {
  id: string;
  name: string;
  icon: LucideIcon;
  price: string;
  turnaround: string;
  warranty: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  city: string;
  rating: number;
  text: string;
  device: string;
}

export interface CartItem extends RefurbishedPhoneItem {
  qty: number;
}

export interface DeviceConditionState {
  powersOn: boolean;
  screenFlawless: boolean;
  bodyCondition: 'None' | 'Minor' | 'Heavy';
  hasOriginalBoxCharger: boolean;
}

export type ActiveTab = 'home' | 'sell' | 'buy' | 'repair';