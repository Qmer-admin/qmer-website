// src/components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group bg-white rounded-sm overflow-hidden border border-stone-200 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 flex flex-col h-full relative">
      
      {/* 1. STOK KONTROLÜ (Stok yoksa soluklaştır) */}
      {!product.stock && (
        <div className="absolute inset-0 bg-white/60 z-20 pointer-events-none flex items-center justify-center">
             <span className="bg-stone-800 text-white text-xs font-bold px-4 py-2 uppercase tracking-widest">Out of Stock</span>
        </div>
      )}

      {/* 2. RESİM ALANI (sizes eklendi) */}
      <div className="relative w-full aspect-[4/5] bg-[#FAFAF8] group-hover:bg-white transition-colors duration-500 overflow-hidden flex items-center justify-center">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Performans için kritik
          className="object-cover md:object-contain p-4 md:p-8 group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-[#2C5F2D] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
            New
          </span>
        )}
      </div>

      {/* 3. İÇERİK ALANI */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="mb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Orwey-M Series</span>
        </div>
        
        {/* Link sarmalaması (Karta tıklayınca gitmesi için başlığı linkledim) */}
        <Link href={`/collections/${product.slug}`} className="block">
            <h3 className="text-xl font-serif text-gray-900 mb-3 leading-snug group-hover:text-emerald-800 transition-colors">
            {product.name}
            </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed font-light">
          {product.shortDescription}
        </p>

        {/* Features (Opsiyonel: Kartta yer varsa gösterilebilir) */}
        {/* <div className="flex gap-2 mb-4 flex-wrap">
             {product.features.slice(0, 2).map((feat, i) => (
                 <span key={i} className="text-[9px] bg-stone-100 text-stone-600 px-2 py-1 uppercase tracking-wider">{feat}</span>
             ))}
        </div> */}

        {/* Fiyat ve Buton */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-6 border-t border-stone-100">
          <div className="flex flex-col">
             <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Price</span>
             <span className="text-xl font-serif text-gray-900 font-medium">
                {product.currency === 'USD' ? '$' : '€'}{product.price.toFixed(2)}
             </span>
          </div>
          
          {product.amazonLink && (
            <Link 
              href={product.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-stone-900 hover:bg-[#2C5F2D] text-white text-[11px] font-bold uppercase tracking-[0.15em] py-3.5 px-4 rounded-sm text-center transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Buy on Amazon
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;