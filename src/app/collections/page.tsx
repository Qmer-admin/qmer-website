// src/app/collections/page.tsx
import { prisma } from '@/lib/db';
import CollectionsClient from './CollectionsClient';
import { Product } from '@/types'; // Type'ı import ettiğinden emin ol

export default async function CollectionsPage() {
  const rawProducts = await prisma.product.findMany({
    orderBy: {
      isNew: 'desc',
    },
  });

  // Veritabanı verisini Frontend tipine zorluyoruz (Casting)
  const products: Product[] = rawProducts.map((p) => ({
    ...p,
    price: Number(p.price),
    // KRİTİK NOKTA BURASI:
    // Gelen string'i zorla "USD" | "EUR" tipine çeviriyoruz (Type Assertion)
    currency: p.currency as "USD" | "EUR", 
  }));

  return <CollectionsClient products={products} />;
}