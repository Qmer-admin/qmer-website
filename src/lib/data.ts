// src/lib/data.ts
import { Product } from '@/types';

export const siteConfig = {
  name: "ORWEY-M",
  company: "QMER LLC",
  description: "Premium Mediterranean Skincare. Scientifically formulated, naturally inspired.",
  email: "info@qmer.us",
  amazonSellerUrl: "https://www.amazon.com/s?me=A20KP52EFBFZL9"
};

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collection", href: "/orweym" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const products: Product[] = [
  {
    id: "aha-bha-serum",
    category: "Serums",
    name: "AHA + BHA Exfoliating Serum",
    slug: "aha-bha-exfoliating-serum",
    shortDescription: "Radiance & Renewal for smoother skin.",
    description: "A powerful blend for gentle exfoliation, revealing brighter and smoother skin. Perfect for your nightly routine to unclog pores and improve texture.",        
    price: 5.99,
    currency: "USD",
    amazonLink: "https://www.amazon.com/dp/B0F6V7D91G",
    images: ["/images/products/aha-serum.png"], // Güncellendi
    features: ["Exfoliating", "Brightening", "Night Care"],
    stock: true,
    isNew: true
  },
  {
    id: "vitamin-c-serum",
    category: "Serums",
    name: "Vitamin C Brightening Serum",
    slug: "vitamin-c-brightening-serum",
    shortDescription: "Glow & Protect with high-potency Vitamin C.",
    description: "Revitalize your skin with high-potency Vitamin C. Fights free radicals, boosts collagen production, and fades dark spots for a radiant complexion.",
    price: 7.99,
    currency: "USD",
    amazonLink: "https://www.amazon.com/dp/B0F67F4JC8",
    images: ["/images/products/vitamin-c.jpg"], // Güncellendi
    features: ["Anti-Aging", "Antioxidant", "Daily Use"],
    stock: true,
    isNew: true
  },
  {
    id: "rosemary-oil",
    category: "Oils",
    name: "Rosemary Essential Oil",
    slug: "rosemary-essential-oil",
    shortDescription: "100% Organic growth & strength formula.",
    description: "100% Organic Rosemary oil. Known for supporting hair growth, scalp health, and strengthening hair follicles from root to tip.",
    price: 7.99,
    currency: "USD",
    amazonLink: "https://www.amazon.com/dp/B0F6VCJTCY",
    images: ["/images/products/rosemary.jpg"], // Güncellendi
    features: ["Organic", "Hair Growth", "Scalp Care"],
    stock: true,
    isNew: true
  }
];