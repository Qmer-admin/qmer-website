'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks, siteConfig } from '@/lib/data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/95 backdrop-blur-sm text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
             {/* Logo isminde boşluk olmamasına dikkat et, public'teki dosya adını kontrol et */}
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-gray-700 group-hover:border-primary transition-colors">
              <Image 
                src="/Qmer Logo.jpg" 
                alt="QMER Logo" 
                fill 
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold tracking-wider group-hover:text-primary transition-colors">
              {siteConfig.company}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-gray-300 hover:text-primary text-sm font-medium transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
            <Link 
                href="/orweym" 
                className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition shadow-lg shadow-blue-900/20"
            >
                Shop Now
            </Link>
          </div>

          {/* Mobile Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-900 rounded-md"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}