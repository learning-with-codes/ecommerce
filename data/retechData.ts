import { HeroSlide, CategoryItem, Product, ReviewItem } from "@/types/retech";

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    badge: "Big ReTech Electronics Festival",
    title: "Upgrade to Flagship Power.",
    highlight: "Pay 40% Less.",
    description: "Certified Refurbished iPhone 15 Pro, Galaxy S24 Ultra & M3 MacBooks with 45-point diagnostic reports, 1-year replacement warranty & doorstep trial.",
    ctaText: "Shop Refurbished Fest",
    ctaSecondaryText: "Instant Sell Valuation",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1000&auto=format&fit=crop&q=80",
    deviceTag: "Apple iPhone 15 Pro Max 256GB (Superb Grade)",
    price: "₹94,999",
    originalPrice: "₹1,34,900",
    discountTag: "Save 30% Today",
    bgColor: "from-orange-950 via-slate-900 to-slate-950",
    accentBadge: "100% Tested OEM Battery"
  },
  {
    id: "slide-2",
    badge: "Mega Exchange & Sell Bonus",
    title: "Old Laptop or Phone?",
    highlight: "Instant ₹ Cashout.",
    description: "Doorstep evaluation in 10 minutes flat. Best valuation in India with zero deduction for battery cycles and instant UPI payout before technician leaves.",
    ctaText: "Check Sell Price",
    ctaSecondaryText: "How Selling Works",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000&auto=format&fit=crop&q=80",
    deviceTag: "MacBook Air M2 16GB / 512GB",
    price: "₹82,499",
    originalPrice: "₹1,19,900",
    discountTag: "₹37,400 Off Retail",
    bgColor: "from-amber-950 via-slate-900 to-slate-950",
    accentBadge: "Doorstep Pickup in 25+ Cities"
  },
  {
    id: "slide-3",
    badge: "Audiophile & Gaming Carnival",
    title: "Sony ANC & PS5 Slim.",
    highlight: "Unbeatable Deals.",
    description: "Immersive noise cancellation and next-gen gaming gear. Factory sanitized, repackaged with original accessories, and covered by 6-month swap warranty.",
    ctaText: "Explore Audio & Gaming",
    ctaSecondaryText: "Browse All Deals",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80",
    deviceTag: "Sony WH-1000XM5 Wireless Noise Cancelling",
    price: "₹21,999",
    originalPrice: "₹34,990",
    discountTag: "Flat 37% Discount",
    bgColor: "from-stone-950 via-orange-950/70 to-slate-950",
    accentBadge: "Studio Audio Certified"
  }
];

export const CATEGORIES: CategoryItem[] = [
  { id: "smartphones", name: "Smartphones", count: "140+ Items", tag: "Flagships & Budgets", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80" },
  { id: "laptops", name: "Laptops & MacBooks", count: "85+ Items", tag: "M3, OLED & Ultrabooks", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80" },
  { id: "tablets", name: "iPads & Tablets", count: "45+ Items", tag: "Stylus & Retina Screens", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80" },
  { id: "audio", name: "Headphones & Earbuds", count: "90+ Items", tag: "Active Noise Cancelling", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" },
  { id: "wearables", name: "Smartwatches", count: "60+ Items", tag: "Fitness & Cellular", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80" },
  { id: "gaming", name: "Gaming Consoles", count: "30+ Items", tag: "PS5, Xbox & Handhelds", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80" }
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Apple iPhone 15 Pro Max (256GB)",
    brand: "Apple",
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
    price: 94999,
    originalPrice: 134900,
    discount: 30,
    rating: 4.9,
    reviewsCount: 428,
    condition: "Refurbished - Like New",
    warranty: "1 Year ReTech Warranty",
    badge: "Top Seller",
    testedPoints: 45
  },
  {
    id: "p2",
    name: "MacBook Air 15\" M3 (16GB / 512GB)",
    brand: "Apple",
    category: "laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
    price: 82499,
    originalPrice: 119900,
    discount: 31,
    rating: 4.9,
    reviewsCount: 182,
    condition: "Open Box",
    warranty: "Official Brand Warranty",
    badge: "Almost New",
    testedPoints: 45
  },
  {
    id: "p3",
    name: "Samsung Galaxy S24 Ultra (512GB Titanium)",
    brand: "Samsung",
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80",
    price: 89999,
    originalPrice: 139999,
    discount: 35,
    rating: 4.8,
    reviewsCount: 310,
    condition: "Refurbished - Like New",
    warranty: "1 Year ReTech Warranty",
    badge: "Hot Deal",
    testedPoints: 45
  },
  {
    id: "p4",
    name: "Sony WH-1000XM5 Wireless ANC",
    brand: "Sony",
    category: "audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    price: 21999,
    originalPrice: 34990,
    discount: 37,
    rating: 4.9,
    reviewsCount: 640,
    condition: "Refurbished - Good",
    warranty: "6 Month Warranty",
    badge: "Best Sound",
    testedPoints: 32
  },
  {
    id: "p5",
    name: "Apple iPad Pro 11\" M2 (Wi-Fi 128GB)",
    brand: "Apple",
    category: "tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80",
    price: 54999,
    originalPrice: 81900,
    discount: 32,
    rating: 4.7,
    reviewsCount: 195,
    condition: "Refurbished - Like New",
    warranty: "1 Year ReTech Warranty",
    badge: "Creator Choice",
    testedPoints: 45
  },
  {
    id: "p6",
    name: "Dell XPS 13 Plus (Core i7, 16GB, 1TB)",
    brand: "Dell",
    category: "laptops",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80",
    price: 79999,
    originalPrice: 145000,
    discount: 44,
    rating: 4.6,
    reviewsCount: 88,
    condition: "Refurbished - Good",
    warranty: "6 Month Warranty",
    badge: "Super Value",
    testedPoints: 45
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    name: "Subham Banerjee",
    role: "Verified Techie",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "Bought an iPhone 15 Pro Max in 'Like New' condition. Battery health was 99% and not a single scratch on body. Amazing service!",
    verified: true,
    product: "Apple iPhone 15 Pro Max"
  },
  {
    id: "r2",
    name: "Ritika Sharma",
    role: "Software Developer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "Sold my old M1 MacBook through instant pickup and got ₹48,000 credited within 10 minutes of inspection at my doorstep.",
    verified: true,
    product: "Device Sell Flow"
  },
  {
    id: "r3",
    name: "Arunav Sen",
    role: "Digital Artist",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "Best platform for verified refurbished gear. The 45-point test report included inside the box gives immense confidence.",
    verified: true,
    product: "iPad Pro M2"
  }
];