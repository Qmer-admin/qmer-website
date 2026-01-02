import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 flex flex-col h-full">
      {/* RESİM ALANI */}
      <div className="relative w-full h-80 bg-[#FAFAF8] group-hover:bg-white transition-colors duration-500 overflow-hidden flex items-center justify-center">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-emerald-900 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-full z-10">
            New Arrival
          </span>
        )}
      </div>

      {/* İÇERİK ALANI */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">Orwey-M Series</span>
        </div>
        <h3 className="text-xl font-serif text-gray-900 mb-3 leading-tight group-hover:text-emerald-800 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-8 line-clamp-2 leading-relaxed font-light">
          {product.shortDescription}
        </p>

        {/* Fiyat ve Buton */}
        <div className="mt-auto flex items-center justify-between gap-4 pt-6 border-t border-stone-100">
          <div className="flex flex-col">
             <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Price</span>
             <span className="text-xl font-serif text-gray-900">
                {product.currency === 'USD' ? '$' : '€'}{product.price}
             </span>
          </div>
          
          <Link 
            href={product.amazonLink}
            target="_blank"
            className="flex-1 bg-stone-900 hover:bg-emerald-900 text-white text-[11px] font-bold uppercase tracking-[0.15em] py-4 px-4 rounded-lg text-center transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-stone-200"
          >
            Buy on Amazon
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;