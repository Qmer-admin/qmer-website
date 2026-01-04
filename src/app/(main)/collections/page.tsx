// src/app/(main)/collections/page.tsx

import { prisma } from '@/lib/db';
import CollectionsClient from './CollectionsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Collection | QMER Skincare',
  description: 'Explore our range of premium, organic, and scientifically backed skincare products.',
};

// Sayfanın her saat başı güncellenmesini sağlar (ISR)
export const revalidate = 3600;

export default async function CollectionsPage() {
  
  // 1. Veritabanından Tüm Ürünleri Çek
  const rawProducts = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  // 2. Type Casting (Server -> Client Geçişi İçin)
  // Prisma Decimal -> Number çevrimi ve String -> Union Type
  const products = rawProducts.map((p) => ({
    ...p,
    price: Number(p.price),
    currency: p.currency as "USD" | "EUR"
  }));

  // 3. Client Component'e Teslim Et
  return <CollectionsClient products={products} />;
}