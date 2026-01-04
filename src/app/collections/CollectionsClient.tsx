// src/app/collections/CollectionsClient.tsx
"use client"; 

import React, { useState, useMemo } from 'react';
import { siteConfig } from '@/lib/data'; 
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types'; 

// Kategorileri ilerde veritabanından çekeceğiz ama şimdilik burada kalsın.
const CATEGORIES = ["All", "Serums", "Oils", "Cleansers", "Sets"];

interface CollectionsClientProps {
  products: Product[];
}

// İsim değişti: OrweymClient -> CollectionsClient
export default function CollectionsClient({ products }: CollectionsClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products]; 

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    switch (sortOption) {
      case "price-asc": 
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc": 
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest": 
      default:
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
    }

    return result;
  }, [activeCategory, sortOption, products]);

  return (
    <main className="min-h-screen bg-[#FDFCF8]">
      {/* Header başlıklarını da biraz daha genel yapabilirsin veya marka bazlı dinamikleşebilir */}
      <div className="relative pt-32 pb-20 bg-[#1a1c1a] text-white overflow-hidden">
         {/* ... (Header kodların aynı kalabilir, sadece yazıları kontrol et) ... */}
         <div className="relative z-10 container mx-auto px-6 text-center">
            <span className="text-emerald-400/80 font-bold tracking-[0.4em] text-[9px] uppercase mb-6 block">
                Premium Skincare
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight mb-6 text-[#FDFCF8]">
                The Collection
            </h1>
         </div>
      </div>

      {/* ... (Geri kalan kodlar mantık olarak aynı, sadece component adı değişti) ... */}
      
      {/* --- FILTER BAR & LISTS AYNI KALSIN --- */}
      <div className="border-b border-stone-200/60 bg-white/80 backdrop-blur-xl sticky top-[70px] z-40 shadow-sm transition-all">
         {/* ... Kod içeriği ... */}
           {/* Önemli not: Kodun geri kalanını aynen koru */}
           <div className="container mx-auto px-6 py-4">
             {/* ... */}
           </div>
      </div>

       <div className="container mx-auto px-6 py-20 min-h-[400px]">
           {/* ... Ürün listeleme logic'i ... */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 animate-fadeIn">
            {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
       </div>

       {/* Footer CTA */}
       <div className="bg-[#1C3A25] text-white py-24 text-center px-6 relative overflow-hidden">
           {/* ... */}
       </div>

    </main>
  );
}