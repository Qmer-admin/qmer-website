// src/app/(main)/page.tsx

import { prisma } from '@/lib/db'; // Statik data yerine Singleton Prisma
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

// Sayfanın her 3600 saniyede (1 saat) bir sunucuda yeniden oluşturulmasını sağlar.
// Bu sayede yeni eklenen ürünler build almadan siteye yansır.
export const revalidate = 3600;

// Database işlemi olduğu için component async olmak zorunda
export default async function Home() {
  
  // --- MANTIK KATMANI (SERVER SIDE) ---
  let displayProducts: Product[] = [];
  
  try {
    // 1. Adım: "isNew" olarak işaretlenmiş, stokta olan ürünleri çek
    let rawProducts = await prisma.product.findMany({
      where: { 
        isNew: true,
        stock: true 
      },
      take: 3,
      orderBy: { createdAt: 'desc' }
    });

    // 2. Adım (Fallback): Eğer hiç yeni ürün yoksa, en son eklenen 3 ürünü çek
    if (rawProducts.length === 0) {
      rawProducts = await prisma.product.findMany({
        where: { stock: true },
        take: 3,
        orderBy: { createdAt: 'desc' }
      });
    }

    // 3. Adım: Type Casting (Prisma -> UI)
    displayProducts = rawProducts.map((p) => ({
      ...p,
      price: Number(p.price),
      currency: p.currency as "USD" | "EUR"
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Hata durumunda displayProducts boş dizi olarak kalır, site çökmez.
  }

  return (
    <div className="bg-[#FDFCF8]">
      
      {/* --- HERO ALANI --- */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
         
         {/* 1. KATMAN: Arka Plan */}
         <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-stone-900 z-0" /> 
            <Image 
                src="/mediterranean-bg.jpg" 
                alt="Mediterranean Coast" 
                fill
                className="object-cover opacity-80" 
                priority
            />
         </div>

         {/* 2. KATMAN: Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCF8] via-[#FDFCF8]/40 to-black/30 z-10"></div>
         
         {/* 3. KATMAN: İÇERİK */}
         <div className="container mx-auto px-4 text-center max-w-4xl relative z-20 pt-32 animate-fadeIn">
            
            <span className="inline-block py-1.5 px-5 rounded-full border border-stone-800/10 bg-white/80 backdrop-blur-md text-stone-900 font-bold tracking-[0.2em] text-[10px] uppercase mb-8 shadow-lg">
                Scientific & Organic
            </span>
            
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-gray-900 mb-6 leading-[1.1] drop-shadow-sm">
               Nature’s Secret, <br/>
               <span className="italic text-emerald-900 font-medium">Refined.</span>
            </h1>
            
            <p className="text-stone-700 text-lg md:text-2xl mb-10 leading-relaxed max-w-2xl mx-auto font-light">
               Experience the pure touch of the Mediterranean. Engineered for visible results.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5">
                <Link href="/collections" className="bg-emerald-900 text-white px-10 py-4 rounded-sm font-semibold text-xs uppercase tracking-widest hover:bg-emerald-800 transition-all duration-300 shadow-xl shadow-emerald-900/20 transform hover:-translate-y-1">
                    Discover Collection
                </Link>
                <Link href="/about" className="bg-white text-stone-900 border border-stone-200 px-10 py-4 rounded-sm font-semibold text-xs uppercase tracking-widest hover:bg-stone-50 transition-all duration-300 shadow-sm hover:shadow-md">
                    Our Story
                </Link>
            </div>
         </div>
      </section>

      {/* --- NEW ARRIVALS (DB Connected) --- */}
      <section className="container mx-auto px-6 pb-32 pt-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-stone-200 pb-6">
            <div className="text-center md:text-left">
                <span className="text-emerald-800 font-bold tracking-[0.2em] text-[10px] uppercase mb-3 block">
                    Fresh from the Lab
                </span>
                <h3 className="text-3xl md:text-5xl font-serif text-gray-900">
                    New Arrivals
                </h3>
            </div>
            
            <Link href="/collections" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-emerald-800 transition-colors">
              View Full Collection
              <span className="block w-6 h-px bg-stone-300 group-hover:bg-emerald-800 transition-colors"></span>
            </Link>
        </div>
        
        {/* Ürün Listesi */}
        {displayProducts.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
             {displayProducts.map((product) => (
               <ProductCard key={product.id} product={product} />
             ))}
           </div>
        ) : (
           /* Veritabanı boşsa veya hata varsa fallback UI */
           <div className="text-center py-20 text-stone-500">
             <p>No products currently available.</p>
           </div>
        )}
      </section>
      
      {/* --- GÜVEN BANDI --- */}
      <section className="bg-[#1C1C1C] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('/mediterranean-bg.jpg')] bg-cover bg-fixed"></div>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10 divide-y md:divide-y-0 md:divide-x divide-stone-800">
            <div className="p-6">
                <div className="text-emerald-400 mb-6 flex justify-center">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <h4 className="font-serif text-2xl mb-3 text-[#FDFCF8]">100% Organic</h4>
                <p className="text-stone-400 text-sm font-light leading-relaxed">Sourced directly from certified Mediterranean farms with zero pesticides.</p>
            </div>
            <div className="p-6">
                <div className="text-emerald-400 mb-6 flex justify-center">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <h4 className="font-serif text-2xl mb-3 text-[#FDFCF8]">Cruelty Free</h4>
                <p className="text-stone-400 text-sm font-light leading-relaxed">We respect nature. Never tested on animals, ethically produced.</p>
            </div>
            <div className="p-6">
                <div className="text-emerald-400 mb-6 flex justify-center">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h4 className="font-serif text-2xl mb-3 text-[#FDFCF8]">Science Backed</h4>
                <p className="text-stone-400 text-sm font-light leading-relaxed">Formulated by chemists and dermatologists for maximum efficacy.</p>
            </div>
        </div>
      </section>
    </div>
  );
}