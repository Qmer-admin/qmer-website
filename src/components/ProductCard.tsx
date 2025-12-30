// src/components/ProductCard.tsx tamamını bununla değiştirebilirsin
// (Sadece fiyat kısmını "text-2xl font-extrabold text-black" yaptık)

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    image: string;
    amazonLink: string;
    price: string;
    tags?: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      {/* Resim Alanı */}
      <div className="relative w-full aspect-[4/5] bg-gray-50 p-8 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500"
        />
        {/* Etiketler */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.tags?.map(tag => (
                <span key={tag} className="bg-black/5 text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                    {tag}
                </span>
            ))}
        </div>
      </div>

      {/* İçerik */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
             <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                {product.name}
            </h3>
        </div>
        
        {/* FİYAT ALANI GÜNCELLEMESİ: Daha büyük ve net siyah */}
        <div className="text-2xl font-extrabold text-black mb-3">
            {product.price}
        </div>
       
        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {product.description}
        </p>

        <div className="mt-auto">
          <Link
            href={product.amazonLink}
            target="_blank"
            className="flex items-center justify-center gap-2 w-full bg-[#232F3E] text-white py-3 rounded-lg font-medium hover:bg-[#FF9900] hover:text-black transition-colors"
          >
            <span>Buy on Amazon US</span>
          </Link>
        </div>
      </div>
    </div>
  );
}