import {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Tv,
  Wrench,
  RefreshCw,
  Headphones,
  BatteryCharging,
  Zap
} from 'lucide-react';
import {
  CategoryItem,
  HeroSlideItem,
  BrandItem,
  SellDeviceItem,
  RefurbishedPhoneItem,
  RepairServiceItem,
  TestimonialItem
} from '@/types/retech';

export const CITIES: string[] = [
  'Kolkata', 'Delhi NCR', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad', 'Jaipur', 'Chandigarh'
];

export const CATEGORIES: CategoryItem[] = [
  { id: 'sell-phone', label: 'Sell Mobile', icon: Smartphone, badge: 'Max Value' },
  { id: 'buy-refurbished', label: 'Refurbished Store', icon: RefreshCw, badge: 'Up to 70% Off' },
  { id: 'sell-laptop', label: 'Sell Laptop', icon: Laptop },
  { id: 'repair', label: 'Repair Gadget', icon: Wrench, badge: 'Doorstep' },
  { id: 'sell-tablet', label: 'Sell Tablet', icon: Tablet },
  { id: 'smartwatch', label: 'Sell Smartwatch', icon: Watch },
  { id: 'audio', label: 'Audio Devices', icon: Headphones },
  { id: 'tv', label: 'Sell Smart TV', icon: Tv }
];

export const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 1,
    title: 'Turn Your Old Tech Into Instant Bank Balance',
    subtitle: 'Free door-to-door device inspection and instant UPI payout within minutes.',
    badge: '⚡ Instant ReTech Valuation',
    ctaText: 'Calculate Device Value',
    ctaAction: 'sell',
    bgColor: 'bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    icon: '📱'
  },
  {
    id: 2,
    title: 'Certified ReTech Flagships & iPhones',
    subtitle: 'Rigorous 32-point hardware check, 6 months standard warranty, and zero-risk return.',
    badge: '🏷️ Extra Cashback on UPI & Cards',
    ctaText: 'Browse Store',
    ctaAction: 'buy',
    bgColor: 'bg-gradient-to-r from-slate-900 via-purple-950 to-slate-950',
    buttonColor: 'bg-purple-600 hover:bg-purple-500 text-white',
    icon: '✨'
  },
  {
    id: 3,
    title: 'Precision Doorstep Hardware Repair',
    subtitle: 'OEM grade screen & battery replacement at your place in under 30 minutes.',
    badge: '🔧 Verified ReTech Engineers',
    ctaText: 'Check Repair Price',
    ctaAction: 'repair',
    bgColor: 'bg-gradient-to-r from-slate-950 via-violet-950 to-slate-900',
    buttonColor: 'bg-violet-600 hover:bg-violet-500 text-white',
    icon: '🛠️'
  }
];

export const BRANDS: BrandItem[] = [
  { id: 'apple', name: 'Apple', logo: '', popular: true },
  { id: 'samsung', name: 'Samsung', logo: 'S', popular: true },
  { id: 'oneplus', name: 'OnePlus', logo: '1+', popular: true },
  { id: 'xiaomi', name: 'Xiaomi', logo: 'mi', popular: true },
  { id: 'google', name: 'Google Pixel', logo: 'G', popular: true },
  { id: 'vivo', name: 'Vivo', logo: 'V', popular: false },
  { id: 'realme', name: 'Realme', logo: 'R', popular: false }
];

export const SELL_DEVICES: SellDeviceItem[] = [
  { id: 'ip15pro', brand: 'apple', name: 'iPhone 15 Pro Max', basePrice: 78500, variants: ['256GB', '512GB', '1TB'], img: '📱' },
  { id: 'ip14', brand: 'apple', name: 'iPhone 14', basePrice: 38200, variants: ['128GB', '256GB', '512GB'], img: '📱' },
  { id: 'ip13', brand: 'apple', name: 'iPhone 13', basePrice: 29500, variants: ['128GB', '256GB'], img: '📱' },
  { id: 's23u', brand: 'samsung', name: 'Galaxy S23 Ultra 5G', basePrice: 52000, variants: ['256GB', '512GB'], img: '📱' },
  { id: 'op11', brand: 'oneplus', name: 'OnePlus 11 5G', basePrice: 28900, variants: ['128GB', '256GB'], img: '📱' },
  { id: 'px7', brand: 'google', name: 'Google Pixel 7 5G', basePrice: 22600, variants: ['128GB', '256GB'], img: '📱' }
];

export const REFURBISHED_PHONES: RefurbishedPhoneItem[] = [
  {
    id: 'ref-ip14-128',
    name: 'Apple iPhone 14 (Certified Pre-Owned)',
    storage: '128GB',
    color: 'Midnight Black',
    brand: 'apple',
    grade: 'Pristine',
    conditionTag: 'Like New (Zero Scratches)',
    price: 44999,
    originalPrice: 69900,
    rating: 4.8,
    reviewsCount: 428,
    features: ['32-Point Diagnostics Passed', 'Battery Health 88%+', '6 Months Warranty'],
    emoji: '📱'
  },
  {
    id: 'ref-s23-256',
    name: 'Samsung Galaxy S23 5G (Certified Pre-Owned)',
    storage: '256GB',
    color: 'Phantom Black',
    brand: 'samsung',
    grade: 'Pristine',
    conditionTag: 'Flawless Condition',
    price: 39999,
    originalPrice: 79999,
    rating: 4.7,
    reviewsCount: 312,
    features: ['Dynamic AMOLED 120Hz', 'Snapdragon 8 Gen 2', '6 Months Warranty'],
    emoji: '📱'
  },
  {
    id: 'ref-ip13-128',
    name: 'Apple iPhone 13 (Certified Pre-Owned)',
    storage: '128GB',
    color: 'Starlight White',
    brand: 'apple',
    grade: 'Standard',
    conditionTag: 'Minor Micro-Abrasions',
    price: 34999,
    originalPrice: 59900,
    rating: 4.9,
    reviewsCount: 1240,
    features: ['A15 Bionic Processing', 'Dual 12MP Cameras', '6 Months Warranty'],
    emoji: '📱'
  },
  {
    id: 'ref-op11-256',
    name: 'OnePlus 11 5G (Certified Pre-Owned)',
    storage: '256GB',
    color: 'Eternal Green',
    brand: 'oneplus',
    grade: 'Pristine',
    conditionTag: 'Factory Reset & Tested',
    price: 33499,
    originalPrice: 61999,
    rating: 4.6,
    reviewsCount: 198,
    features: ['Hasselblad Calibration', '100W Charging Support', '6 Months Warranty'],
    emoji: '📱'
  }
];

export const REPAIR_SERVICES: RepairServiceItem[] = [
  { id: 'screen', name: 'Screen Replacement', icon: Smartphone, price: '₹1,999 onwards', turnaround: '30 mins doorstep', warranty: '6 Months' },
  { id: 'battery', name: 'Battery Replacement', icon: BatteryCharging, price: '₹999 onwards', turnaround: '20 mins doorstep', warranty: '6 Months' },
  { id: 'camera', name: 'Camera Module Fix', icon: Wrench, price: '₹1,299 onwards', turnaround: 'Same Day', warranty: '3 Months' },
  { id: 'charging', name: 'Charging Port / Mic', icon: Zap, price: '₹699 onwards', turnaround: '25 mins doorstep', warranty: '3 Months' }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: 'Debojyoti Roy',
    city: 'Kolkata',
    rating: 5,
    text: 'Sold my iPhone 13 via ReTech. Executive came to Salt Lake within 2 hours, did a digital diagnostics check and UPI balance credit hoye geche immediately!',
    device: 'Sold iPhone 13 128GB'
  },
  {
    id: 2,
    name: 'Ananya Sen',
    city: 'Bengaluru',
    rating: 5,
    text: 'Ordered an S23 from ReTech refurbished store. Pristine condition with original charger and warranty certificate. Massive cost savings!',
    device: 'Bought Galaxy S23'
  }
];