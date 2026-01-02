import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-[#FDFCF8]">
      
      {/* HERO ALANI */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
         
         {/* 1. KATMAN: Arka Plan Resmi */}
         <div className="absolute inset-0 z-0">
            <Image 
                src="/mediterranean-bg.jpg" 
                alt="Mediterranean Coast" 
                fill
                className="object-cover" // Resim net kalsın
                priority
            />
         </div>

         {/* 2. KATMAN: SİSLİ GEÇİŞ (Gradient Overlay) - SİHİR BURADA */}
         {/* Resmin üzerine alttan yukarı doğru bir perde çekiyoruz. 
             Yazıların olduğu yer (#FDFCF8) düz renk, yukarı çıktıkça şeffaflaşıyor. */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCF8] via-[#FDFCF8]/80 to-black/10 z-0"></div>
         
         {/* 3. KATMAN: İÇERİK */}
         <div className="container mx-auto px-4 text-center max-w-4xl relative z-10 pt-32">
            
            {/* Üst Rozet */}
            <span className="inline-block py-1.5 px-5 rounded-full border border-stone-800/10 bg-white/50 backdrop-blur-md text-stone-800 font-bold tracking-[0.2em] text-[10px] uppercase mb-8 shadow-sm">
                Scientific & Organic
            </span>
            
            {/* Başlık - Artık Koyu Renk Çok Net Okunacak */}
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-gray-900 mb-6 leading-[1.1] drop-shadow-sm">
               Nature’s Secret, <br/>
               <span className="italic text-emerald-800 font-medium">Refined.</span>
            </h1>
            
            <p className="text-stone-600 text-lg md:text-2xl mb-10 leading-relaxed max-w-2xl mx-auto font-light">
               Experience the pure touch of the Mediterranean. Engineered for visible results.
            </p>
            
            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row justify-center gap-5">
                <Link href="/orweym" className="bg-emerald-900 text-white px-10 py-4 rounded-full font-semibold text-xs uppercase tracking-widest hover:bg-emerald-800 transition-all duration-300 shadow-xl shadow-emerald-900/20 transform hover:-translate-y-1">
                    Discover Collection
                </Link>
                <Link href="/about" className="bg-white text-stone-900 border border-stone-200 px-10 py-4 rounded-full font-semibold text-xs uppercase tracking-widest hover:bg-stone-50 transition-all duration-300 shadow-sm hover:shadow-md">
                    Our Story
                </Link>
            </div>
         </div>
      </section>

      {/* BESTSELLERS ALANI */}
      {/* Hero'nun bittiği yer ile burası aynı renk (#FDFCF8) olduğu için kesik çizgi yok */}
      <section className="container mx-auto px-4 pb-32 pt-10">
        <div className="flex flex-col items-center mb-20 text-center">
            <span className="text-emerald-700 font-bold tracking-[0.2em] text-[10px] uppercase mb-4">
                Selected For You
            </span>
            <h3 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
                The Collection
            </h3>
            <p className="max-w-xl text-stone-500 font-light leading-relaxed">
                Discover our most loved formulas, crafted with potent botanicals and clinical actives.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* GÜVEN BANDI */}
      <section className="bg-stone-900 text-white py-24 relative overflow-hidden">
        {/* Arka plan süsü */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/mediterranean-bg.jpg')] bg-cover bg-fixed"></div>
        
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10 divide-y md:divide-y-0 md:divide-x divide-stone-700">
            <div className="p-4">
                <div className="text-emerald-400 mb-4 flex justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <h4 className="font-serif text-2xl mb-2">100% Organic</h4>
                <p className="text-stone-400 text-sm font-light">Sourced directly from Mediterranean farms.</p>
            </div>
            <div className="p-4">
                <div className="text-emerald-400 mb-4 flex justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <h4 className="font-serif text-2xl mb-2">Cruelty Free</h4>
                <p className="text-stone-400 text-sm font-light">Never tested on animals, ethically made.</p>
            </div>
            <div className="p-4">
                <div className="text-emerald-400 mb-4 flex justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <h4 className="font-serif text-2xl mb-2">Science Backed</h4>
                <p className="text-stone-400 text-sm font-light">Formulated by dermatologists for efficacy.</p>
            </div>
        </div>
      </section>
    </div>
  );
}