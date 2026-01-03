import Image from 'next/image';
import React from 'react';

export default function AboutPage() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#FAFAF9]"> {/* Hafif kırık beyaz/krem zemin */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* --- SOL TARAFTAKİ METİN ALANI --- */}
          <div className="w-full md:w-1/2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-serif text-gray-900 leading-[1.15]">
                Inspired by the <br />
                Ancient Mediterranean.
              </h1>
              {/* Yeşil Çizgi Dekoru */}
              <div className="w-12 h-1 bg-[#2C5F2D]"></div>
            </div>
            
            <p className="text-lg text-gray-600 italic font-medium font-serif">
              It started with a simple question: Can we bottle the essence of nature without losing its power?
            </p>
            
            <div className="text-gray-700 space-y-5 leading-relaxed text-base md:text-lg opacity-90">
              <p>
                ORWEY-M blends ancient botanical traditions of the Mediterranean with modern skincare science. Founded under QMER LLC, our mission is to bring natural beauty to life with purity and effectiveness.
              </p>
              <p>
                We believe in transparency, high-quality ingredients, and sustainable practices that honor both your skin and the earth.
              </p>
            </div>
          </div>

          {/* --- SAĞ TARAFTAKİ GÖRSEL ALANI --- */}
          <div className="w-full md:w-1/2 relative group">
             {/* Görsel Kutusu */}
             <div className="relative z-10 overflow-hidden rounded-sm shadow-2xl bg-gray-200 aspect-[4/5]">
               <Image 
                 src="/orwey-natural.png" 
                 alt="ORWEY-M Natural Skincare Collection" 
                 fill
                 className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
             </div>
             
             {/* Arkadaki Dekoratif Çerçeve (Derinlik katar) */}
             <div className="absolute top-5 -right-5 w-full h-full border-2 border-[#2C5F2D]/20 rounded-sm -z-0"></div>
          </div>

        </div>
      </div>
    </section>
  );
}