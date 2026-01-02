'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '@/lib/data';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';
  const isTransparent = isHome && !isScrolled;

  // RENK AYARLARI
  // drop-shadow-lg yaptık: Yazının arkasına daha belirgin gölge
  const textColorClass = isTransparent 
    ? "text-white hover:text-emerald-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" 
    : "text-stone-900 hover:text-emerald-800";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
      isTransparent
        ? 'bg-transparent py-6 border-transparent' 
        : 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-stone-100'
    }`}>
      
      {/* GİZLİ KAHRAMAN: Okunabilirlik Gradienti (GÜÇLENDİRİLDİ) */}
      {/* from-black/70 yaptık: Üst tarafı daha karanlık ki beyaz yazı patlasın */}
      {isTransparent && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent -z-10 h-40 pointer-events-none transition-opacity duration-500"></div>
      )}

      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group relative z-50">
            <div className={`relative transition-all duration-500 rounded-full overflow-hidden border ${isTransparent ? 'border-white/50 shadow-lg' : 'border-stone-200'} ${isScrolled ? 'w-10 h-10' : 'w-14 h-14'}`}>
                <Image 
                  src="/qmer-logo.jpg" 
                  alt="Qmer Logo" 
                  fill 
                  className="object-cover" 
                />
            </div>
            <div className="flex flex-col">
                {/* Logo metni de daha kalın ve gölgeli */}
                <h1 className={`font-serif font-extrabold tracking-tighter transition-colors duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'} ${isTransparent ? 'text-white drop-shadow-md' : 'text-stone-900'}`}>
                QMER
                </h1>
                <span className={`text-[10px] uppercase tracking-[0.3em] font-sans font-bold transition-all duration-300 ${isScrolled ? 'opacity-0 h-0' : 'opacity-100'} ${isTransparent ? 'text-white/90 drop-shadow-sm' : 'text-gray-500'}`}>
                Global Cosmetics
                </span>
            </div>
        </Link>

        {/* DESKTOP MENU - GÜÇLENDİRİLDİ */}
        <div className="hidden md:flex items-center gap-14">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="relative group py-2"
            >
              {/* font-extrabold: İyice kalın */}
              {/* text-[15px]: Bir tık daha büyük */}
              <span className={`text-[15px] font-serif font-extrabold uppercase tracking-[0.15em] transition-colors duration-300 ${textColorClass}`}>
                {link.name}
              </span>
              
              <span className={`absolute bottom-0 left-0 w-0 h-[3px] transition-all duration-300 group-hover:w-full ${isTransparent ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-emerald-800'}`}></span>
            </Link>
          ))}
        </div>

        {/* CTA BUTONU */}
        <div className="hidden md:block">
            <Link 
                href="/orweym" 
                className={`px-9 py-3.5 rounded-full text-[12px] font-black uppercase tracking-widest transition-all duration-300 border shadow-xl ${
                    isTransparent
                    ? 'bg-white text-stone-900 border-white hover:bg-emerald-900 hover:text-white hover:border-emerald-900 hover:shadow-2xl'
                    : 'bg-stone-900 text-white border-stone-900 hover:bg-white hover:text-stone-900'
                }`}
            >
            Shop Now
            </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 z-50 relative transition-colors ${isTransparent && !isOpen ? 'text-white drop-shadow-lg' : 'text-stone-800'}`}>
           {isOpen ? (
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
           ) : (
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
           )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 bg-[#FDFCF8] z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          <div className="flex flex-col space-y-8 text-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-4xl font-serif font-bold text-stone-900 hover:text-emerald-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-12 h-px bg-stone-200 mx-auto my-8"></div>
            <Link 
                href="/orweym"
                onClick={() => setIsOpen(false)} 
                className="text-sm font-bold uppercase tracking-widest bg-stone-900 text-white px-10 py-4 rounded-full shadow-xl"
            >
                Shop Collection
            </Link>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;