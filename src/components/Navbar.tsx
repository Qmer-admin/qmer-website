'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '@/lib/data';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                <Image 
                  src="/qmer-logo.jpg" 
                  alt="Qmer Logo" 
                  fill 
                  className="object-cover" 
                />
            </div>
            <div className="flex flex-col">
                <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-tighter group-hover:text-emerald-700 transition-colors">
                QMER
                </h1>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans">
                Global Cosmetics
                </span>
            </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-black transition-colors uppercase tracking-wide text-xs">
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="hidden md:block">
            <Link href="/orweym" className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
            Shop Now
            </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 h-screen z-40">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-gray-900 font-medium py-4 border-b border-gray-50 text-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;