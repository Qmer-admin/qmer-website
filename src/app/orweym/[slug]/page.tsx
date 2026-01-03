// src/app/orweym/[slug]/page.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

// 1. DİNAMİK METADATA (SEO İÇİN)
// Her ürün sayfası için Google'da görünecek başlık ve açıklamayı otomatik oluşturur.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return { title: 'Product Not Found | ORWEY-M' };
  }

  return {
    title: `${product.name} | ORWEY-M Premium Skincare`,
    description: product.shortDescription,
  };
}

// 2. SAYFA BİLEŞENİ
export default function ProductPage({ params }: PageProps) {
  // URL'deki slug ile veriyi eşleştir
  const product = products.find((p) => p.slug === params.slug);

  // Ürün bulunamazsa 404 sayfasına at
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Breadcrumb (Navigasyon İzi) */}
        <nav className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-800 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/orweym" className="hover:text-emerald-800 transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-stone-800">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* --- SOL TARAF: GÖRSEL ALANI --- */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/5] bg-white rounded-sm border border-stone-100 overflow-hidden group">
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-[#2C5F2D] text-white text-xs font-bold px-3 py-1 uppercase tracking-widest z-10">
                  New Arrival
                </span>
              )}
              
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority // LCP (Largest Contentful Paint) optimizasyonu için
                className="object-cover md:object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* --- SAĞ TARAF: DETAY ALANI --- */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            {/* Ürün Serisi */}
            <span className="text-emerald-700 font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block">
              Orwey-M Signature Series
            </span>

            {/* Başlık */}
            <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Fiyat ve Stok */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-stone-200">
              <p className="text-3xl font-serif text-gray-900 font-medium">
                {product.currency === 'USD' ? '$' : '€'}{product.price.toFixed(2)}
              </p>
              
              {product.stock ? (
                <div className="flex items-center gap-2 text-[#2C5F2D] text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#2C5F2D] animate-pulse"></span>
                  In Stock
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Out of Stock
                </div>
              )}
            </div>

            {/* Açıklama */}
            <div className="prose prose-stone prose-sm md:prose-base mb-10 text-gray-600 font-light leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Özellikler (Features) */}
            <div className="mb-10">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-700 font-light">
                    <svg className="w-4 h-4 text-[#2C5F2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Aksiyon Butonları */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={product.amazonLink}
                target="_blank"
                className="flex-1 bg-[#1C3A25] hover:bg-[#2C5F2D] text-white text-sm font-bold uppercase tracking-[0.15em] py-5 px-8 rounded-sm text-center transition-all duration-300 shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3"
              >
                Buy on Amazon
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </Link>
              
              <Link 
                href="/contact"
                className="px-8 py-5 border border-stone-200 text-stone-600 font-bold uppercase tracking-widest text-xs hover:bg-stone-50 hover:text-stone-900 transition-colors rounded-sm flex items-center justify-center"
              >
                Ask a Question
              </Link>
            </div>

            {/* Güven Rozetleri (Statik) */}
            <div className="mt-12 pt-8 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase tracking-wider">
               <div className="flex flex-col items-center gap-2">
                 <span>Natural Ingredients</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <span>Cruelty Free</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <span>Fast Shipping</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}