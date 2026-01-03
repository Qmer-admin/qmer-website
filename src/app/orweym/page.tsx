// src/app/orweym/page.tsx
"use client"; // <--- KRİTİK: State kullandığımız için Client Component olmalı

import React, { useState, useMemo } from 'react';
import { products, siteConfig } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types'; // Type importunu unutmayalım

// Kategorileri veriden dinamik çıkarmak yerine şimdilik elle yönetelim, daha kontrollü olur.
const CATEGORIES = ["All", "Serums", "Oils", "Cleansers", "Sets"];

export default function OrweymPage() {
  // --- STATE YÖNETİMİ ---
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest"); // newest, price-asc, price-desc
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobilde filtre menüsünü aç/kapa

  // --- FILTRELEME VE SIRALAMA MANTIĞI (SQL: WHERE & ORDER BY) ---
  const filteredProducts = useMemo(() => {
    let result = [...products]; // Orijinal diziyi bozmamak için kopyasını al

    // 1. Kategori Filtresi (WHERE category = 'X')
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Sıralama (ORDER BY)
    switch (sortOption) {
      case "price-asc": // Fiyat Artan
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc": // Fiyat Azalan
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest": // Yeniden Eskiye (isNew olanlar başa)
      default:
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
    }

    return result;
  }, [activeCategory, sortOption]);


  return (
    <main className="min-h-screen bg-[#FDFCF8]">
      
      {/* HEADER (Aynı) */}
      <div className="relative pt-32 pb-20 bg-[#1a1c1a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-800 via-stone-900 to-black"></div>
        <div className="relative z-10 container mx-auto px-6 text-center">
            <span className="text-emerald-400/80 font-bold tracking-[0.4em] text-[9px] uppercase mb-6 block">
                Premium Skincare
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight mb-6 text-[#FDFCF8]">
                The Collection
            </h1>
            <p className="text-stone-400 font-light max-w-lg mx-auto text-sm md:text-base leading-relaxed antialiased">
                Discover scientifically formulated treatments infused with the purest Mediterranean botanicals.
            </p>
        </div>
      </div>

      {/* --- FILTER & SORT BAR --- */}
      <div className="border-b border-stone-200/60 bg-white/80 backdrop-blur-xl sticky top-[70px] z-40 shadow-sm transition-all">
        <div className="container mx-auto px-6 py-4">
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Sol Taraf: Kategori Tabları (Desktop) */}
                <div className="hidden md:flex items-center gap-8">
                    {CATEGORIES.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-[11px] font-bold uppercase tracking-widest transition-all duration-300 relative py-2 
                                ${activeCategory === cat ? 'text-[#1C3A25]' : 'text-stone-400 hover:text-stone-600'}
                            `}
                        >
                            {cat}
                            {/* Aktif olanın altına çizgi çek */}
                            {activeCategory === cat && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1C3A25]"></span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Mobil Filtre Butonu */}
                <button 
                    className="md:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    Filters {activeCategory !== 'All' && `(${activeCategory})`}
                    <svg className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>

                {/* Sağ Taraf: Sıralama ve Sayaç */}
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest hidden sm:block">
                        Showing {filteredProducts.length} Products
                    </p>
                    
                    <div className="flex items-center gap-2 relative group">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Sort By:</span>
                        <select 
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="text-[11px] font-bold text-stone-800 uppercase tracking-widest bg-transparent border-none outline-none cursor-pointer focus:ring-0"
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Mobil Filtre Menüsü (Açılır/Kapanır) */}
            {isFilterOpen && (
                <div className="md:hidden pt-4 mt-4 border-t border-stone-100 flex flex-wrap gap-3 animate-fadeIn">
                     {CATEGORIES.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setIsFilterOpen(false); }}
                            className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-colors
                                ${activeCategory === cat 
                                    ? 'bg-[#1C3A25] text-white border-[#1C3A25]' 
                                    : 'bg-white text-stone-500 border-stone-200'}
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

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
            // Ürün Yoksa Gösterilecek Mesaj
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-lg font-serif text-stone-900 mb-2">No products found</h3>
                <p className="text-stone-500 text-sm max-w-md">
                    We couldn't find any products in the <span className="font-bold text-stone-800">"{activeCategory}"</span> category.
                </p>
                <button 
                    onClick={() => setActiveCategory('All')}
                    className="mt-6 text-[10px] font-bold uppercase tracking-widest text-[#1C3A25] underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                    View All Products
                </button>
            </div>
        )}
      </div>

      {/* AMAZON CTA (Aynı) */}
      <div className="bg-[#1C3A25] text-white py-24 text-center px-6 relative overflow-hidden">
          {/* ... aynı kodlar ... */}
             <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-8">Ready to transform your skin?</h2>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                    href={siteConfig.amazonSellerUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-white text-[#1C3A25] px-10 py-4 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-stone-100 transition-all duration-300 shadow-xl"
                >
                    Visit Amazon Store
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
            </div>
        </div>
      </div>

    </main>
  );
}