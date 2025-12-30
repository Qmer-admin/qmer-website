// src/lib/data.ts

export const siteConfig = {
  name: "ORWEY-M",
  company: "QMER LLC",
  description: "Premium Mediterranean Skincare. Scientifically formulated, naturally inspired.",
  email: "info@qmer.us", // Varsa mail adresin
  amazonSellerUrl: "https://www.amazon.com/s?me=A3..." // Varsa satıcı linkin
};

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collection", href: "/orweym" }, // Ürünler sayfası
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const products = [
  {
    id: 1,
    name: "AHA + BHA Exfoliating Serum",
    shortDesc: "Radiance & Renewal",
    description: "A powerful blend for gentle exfoliation, revealing brighter and smoother skin. Perfect for your nightly routine.",
    image: "/aha-serum.png", // Public klasöründeki tam isim
    amazonLink: "https://www.amazon.com/dp/B0F6V7D91G",
    price: "$5.99",
    tags: ["Exfoliating", "Brightening"],
    isNew: true,
  },
  {
    id: 2,
    name: "Vitamin C Brightening Serum",
    shortDesc: "Glow & Protect",
    description: "Revitalize your skin with high-potency Vitamin C. Fights free radicals and boosts collagen production.",
    image: "/vitamin-c.jpg",
    amazonLink: "https://www.amazon.com/dp/B0F67F4JC8",
    price: "$7.99",
    tags: ["Anti-Aging", "Vitamin C"],
    isNew: false,
  },
  {
    id: 3,
    name: "Rosemary Essential Oil",
    shortDesc: "Growth & Strength",
    description: "100% Organic Rosemary oil. Known for supporting hair growth and scalp health.",
    image: "/rosemary.jpg",
    amazonLink: "https://www.amazon.com/dp/B0F6VCJTCY",
    price: "$7.99",
    tags: ["Organic", "Hair Care"],
    isNew: false,
  },
];