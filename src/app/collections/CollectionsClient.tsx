// src/app/collections/CollectionsClient.tsx
"use client";

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types'; // Types dosyasından import ettiğine emin ol

// Kategoriler
const CATEGORIES = ["All", "Serums", "Oils", "Cleansers", "Sets"];

interface CollectionsClientProps {
  products: Product[];
}

export default function CollectionsClient({ products }: CollectionsClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  // isFilterOpen state'ini mobile menü için tutabilirsin, şimdilik basit tutalım

  // --- MANTIK: FİLTRELEME & SIRALAMA ---
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Kategori Filtresi
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Sıralama
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        // isNew olanlar önce, sonra oluşturulma tarihine göre yeniler
        result.sort((a, b) => {
            if (a.isNew === b.isNew) {
                // Eğer ikisi de yeniyse veya eskiyse tarihe bak
                return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            }
            return a.isNew ? -1 : 1;
        });
        break;
    }

    return result;
  }, [activeCategory, sortOption, products]);

  return (
    <main className="min-h-screen bg-[#FDFCF8]">
      
      {/* --- HEADER --- */}
      <div className="relative pt-32 pb-20 bg-[#1a1c1a] text-white overflow-hidden">
         <div className="absolute inset-0 bg-[url('/mediterranean-bg.jpg')] bg-cover bg-center opacity-40"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1a] via-transparent to-black/30"></div>
         
         <div className="relative z-10 container mx-auto px-6 text-center">
            <span className="text-emerald-400/80 font-bold tracking-[0.4em] text-[9px] uppercase mb-6 block animate-fadeIn">
                Premium Skincare
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight mb-6 text-[#FDFCF8] animate-slideUp">
                The Collection
            </h1>
            <p className="text-stone-300 max-w-xl mx-auto font-light text-lg leading-relaxed animate-slideUp delay-100">
                Discover our range of organic, scientifically formulated skincare solutions designed for the modern routine.
            </p>
         </div>
      </div>

      {/* --- FILTER BAR --- */}
      <div className="border-b border-stone-200/60 bg-white/80 backdrop-blur-xl sticky top-[0px] z-40 shadow-sm transition-all">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* KATEGORİLER (Sol) */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all whitespace-nowrap ${
                            activeCategory === cat 
                            ? "bg-emerald-900 text-white shadow-md" 
                            : "bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* SIRALAMA (Sağ) */}
            <div className="flex items-center gap-3 w-full md:w-auto">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest hidden md:block">Sort By:</span>
                <div className="relative w-full md:w-48">
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="w-full appearance-none bg-stone-50 border border-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-sm focus:outline-none focus:border-emerald-800 cursor-pointer"
                    >
                        <option value="newest">Newest Arrivals</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                    {/* Custom Arrow Icon */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </div>

        </div>
      </div>

      {/* --- ÜRÜN LİSTESİ --- */}
       <div className="container mx-auto px-6 py-20 min-h-[400px]">
           {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 animate-fadeIn">
                   {filteredProducts.map((product) => (
                       <ProductCard key={product.id} product={product} />
                   ))}
               </div>
           ) : (
               <div className="text-center py-20">
                   <p className="text-stone-500 text-lg">No products found in this category.</p>
                   <button 
                        onClick={() => setActiveCategory("All")}
                        className="mt-4 text-emerald-800 font-bold border-b border-emerald-800 pb-1 hover:text-emerald-900"
                   >
                       View all products
                   </button>
               </div>
           )}
       </div>

       {/* --- FOOTER CTA --- */}
       <div className="bg-[#1C3A25] text-white py-24 text-center px-6 relative overflow-hidden">
           <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="font-serif text-3xl md:text-5xl mb-6">Unsure where to start?</h2>
                <p className="text-emerald-100/80 mb-10 text-lg font-light">Take our 30-second skin analysis quiz to find your perfect routine.</p>
                <button className="bg-white text-emerald-900 px-10 py-4 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-emerald-50 transition-colors shadow-lg">
                    Take the Quiz (Coming Soon)
                </button>
           </div>
       </div>

    </main>
  );
}