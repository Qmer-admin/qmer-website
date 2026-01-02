import { products, siteConfig } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function OrweymPage() {
  return (
    <main className="min-h-screen bg-[#FDFCF8]">
      
      {/* HEADER ALANI */}
      <div className="relative py-24 bg-stone-900 text-white overflow-hidden">
        {/* Arka Plan Görseli */}
        <div className="absolute inset-0 opacity-20 bg-[url('/mediterranean-bg.jpg')] bg-cover bg-center"></div>
        {/* İçerik */}
        <div className="relative z-10 container mx-auto px-4 text-center">
            <span className="text-emerald-400 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">
                Shop Online
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-6">
                The Collection
            </h1>
            <p className="text-stone-400 font-light max-w-lg mx-auto text-sm md:text-base leading-relaxed">
                Discover our range of premium skincare products, formulated with organic Mediterranean ingredients for visible results.
            </p>
        </div>
      </div>

      {/* ARAÇ ÇUBUĞU (Sticky Filter Bar) */}
      {/* Aşağı kaydırırken üstte sabit kalır (sticky) */}
      <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-20 z-40 shadow-sm transition-all">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Showing {products.length} Products
            </p>
            
            <div className="flex items-center gap-6">
                {/* Filtre Butonu (Görsel) */}
                <button className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider hover:text-emerald-700 transition-colors group">
                    <span>Filter</span>
                    <svg className="w-4 h-4 text-stone-400 group-hover:text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </button>
                
                <div className="h-4 w-px bg-stone-300 hidden sm:block"></div>
                
                {/* Sıralama Butonu (Görsel) */}
                <button className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider hover:text-emerald-700 transition-colors group">
                    <span>Sort by</span>
                    <svg className="w-4 h-4 text-stone-400 group-hover:text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>
        </div>
      </div>

      {/* ÜRÜN LİSTESİ (GRID) */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* AMAZON MAĞAZA YÖNLENDİRMESİ (CTA) */}
      {/* Burası müşteriyi ikna edemezsek Amazon'a gönderdiğimiz güven alanı */}
      <div className="bg-emerald-900 text-white py-20 text-center px-4 relative overflow-hidden">
        {/* Arka plan süslemesi */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-30"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif mb-6">Experience the Full Range</h2>
            <p className="text-emerald-100/80 mb-10 font-light leading-relaxed">
                Prefer to shop on a platform you already know? <br className="hidden md:block"/>
                Visit our official Amazon store for fast shipping and verified reviews.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5">
                {/* İletişim Butonu */}
                <Link 
                    href="/contact" 
                    className="inline-block border border-white/20 hover:bg-white hover:text-emerald-900 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                >
                    Contact Support
                </Link>
                
                {/* Amazon Butonu */}
                <a 
                    href={siteConfig.amazonSellerUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-emerald-950 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-all duration-300 shadow-xl shadow-emerald-900/50"
                >
                    <span>Visit Amazon Store</span>
                    <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
            </div>
        </div>
      </div>

    </main>
  );
}