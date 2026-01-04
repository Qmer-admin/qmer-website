// src/app/(main)/collections/[slug]/page.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db'; // Data yerine DB
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Sayfanın belirli aralıklarla (1 saat) güncellenmesini sağlar (ISR)
export const revalidate = 3600;

// Bu fonksiyon, build zamanında hangi slug'ların statik olarak oluşturulacağını belirler.
// Bu sayede kullanıcılar sayfaya girdiğinde veritabanı sorgusu beklemez, hazır HTML sunulur.
export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true }, // Sadece slug'ları çekerek performansı koruyoruz
  });

  return products.map((product) => ({
    slug: product.slug,
  }));
}

// 1. METADATA (DB Bağlantılı ve Optimize Edilmiş)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Sadece meta tagler için gerekli veriyi çekiyoruz (Performans)
  const product = await prisma.product.findUnique({
    where: { slug },
    select: {
      name: true,
      shortDescription: true
    }
  });

  if (!product) {
    return { title: 'Product Not Found | QMER' };
  }

  return {
    title: `${product.name} | QMER Premium Skincare`,
    description: product.shortDescription,
  };
}

// 2. ANA COMPONENT
export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  // DB'den ürünü çek
  const rawProduct = await prisma.product.findUnique({
    where: { slug }
  });

  // Ürün yoksa 404
  if (!rawProduct) {
    notFound();
  }

  // Type Casting (Prisma -> UI)
  const product = {
    ...rawProduct,
    price: Number(rawProduct.price),
    currency: rawProduct.currency as "USD" | "EUR"
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Breadcrumb - Linkler güncellendi (/collections) */}
        <nav className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-800 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-emerald-800 transition-colors">Collection</Link>
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
              
              {/* Image array kontrolü */}
              {product.images && product.images.length > 0 ? (
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover md:object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
                    No Image Available
                </div>
              )}
            </div>
          </div>

          {/* --- SAĞ TARAF: DETAY ALANI --- */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            <span className="text-emerald-700 font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block">
              QMER Signature Series
            </span>

            <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>

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

            <div className="prose prose-stone prose-sm md:prose-base mb-10 text-gray-600 font-light leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Features (Array Kontrolü ile) */}
            <div className="mb-10">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {product.features && product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-700 font-light">
                    <svg className="w-4 h-4 text-[#2C5F2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {product.amazonLink && (
                <Link 
                  href={product.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#1C3A25] hover:bg-[#2C5F2D] text-white text-sm font-bold uppercase tracking-[0.15em] py-5 px-8 rounded-sm text-center transition-all duration-300 shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-3"
                >
                  Buy on Amazon
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </Link>
              )}
              
              <Link 
                href="/contact"
                className="px-8 py-5 border border-stone-200 text-stone-600 font-bold uppercase tracking-widest text-xs hover:bg-stone-50 hover:text-stone-900 transition-colors rounded-sm flex items-center justify-center"
              >
                Ask a Question
              </Link>
            </div>

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