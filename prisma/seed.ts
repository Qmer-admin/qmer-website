import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // 1. Önce tabloyu temizle
  await prisma.product.deleteMany();
  console.log('🧹 Eski veriler temizlendi...');

  // 2. Gerçek verileri ekle
  await prisma.product.createMany({
    data: [
      {
        slug: "aha-bha-exfoliating-serum",
        name: "AHA + BHA Exfoliating Serum",
        category: "Serums",
        shortDescription: "Radiance & Renewal for smoother skin.",
        description: "A powerful blend for gentle exfoliation, revealing brighter and smoother skin. Perfect for your nightly routine to unclog pores and improve texture.",
        price: 5.99,
        currency: "USD",
        amazonLink: "https://www.amazon.com/dp/B0F6V7D91G",
        images: ["/images/products/aha-serum.png"],
        features: ["Exfoliating", "Brightening", "Night Care"],
        stock: true,
        isNew: true
      },
      {
        slug: "vitamin-c-brightening-serum",
        name: "Vitamin C Brightening Serum",
        category: "Serums",
        shortDescription: "Glow & Protect with high-potency Vitamin C.",
        description: "Revitalize your skin with high-potency Vitamin C. Fights free radicals, boosts collagen production, and fades dark spots for a radiant complexion.",
        price: 7.99,
        currency: "USD",
        amazonLink: "https://www.amazon.com/dp/B0F67F4JC8",
        images: ["/images/products/vitamin-c.jpg"],
        features: ["Anti-Aging", "Antioxidant", "Daily Use"],
        stock: true,
        isNew: true
      },
      {
        slug: "rosemary-essential-oil",
        name: "Rosemary Essential Oil",
        category: "Oils",
        shortDescription: "100% Organic growth & strength formula.",
        description: "100% Organic Rosemary oil. Known for supporting hair growth, scalp health, and strengthening hair follicles from root to tip.",
        price: 7.99,
        currency: "USD",
        amazonLink: "https://www.amazon.com/dp/B0F6VCJTCY",
        images: ["/images/products/rosemary.jpg"],
        features: ["Organic", "Hair Growth", "Scalp Care"],
        stock: true,
        isNew: true
      }
    ],
  });

  console.log('✅ Veritabanı başarıyla tohumlandı (Real Data)!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

  // deploy fix trigger