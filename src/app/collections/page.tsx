// src/app/collections/page.tsx

import { prisma } from '@/lib/db';
import CollectionsClient from './CollectionsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Collection | QMER Skincare',
  description: 'Explore our range of premium, organic, and scientifically backed skincare products.',
};

export default async function CollectionsPage() {
  
  // 1. Veritabanından Tüm Ürünleri Çek
  const rawProducts = await prisma.product.findMany({
    where: {
        stock: true // Sadece stokta olanları listelemek istersen
    },
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