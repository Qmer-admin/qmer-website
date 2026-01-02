import { siteConfig } from '@/lib/data';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white py-16 mt-auto border-t border-emerald-900/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* 1. Kolon: Marka */}
            <div className="md:col-span-1 space-y-4">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-serif font-bold tracking-wider text-white">QMER</h2>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500">Global Cosmetics</span>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed font-light">
                    {siteConfig.description}
                </p>
            </div>

            {/* 2. Kolon: Linkler */}
            <div>
                 <h4 className="font-serif font-medium mb-6 text-white text-lg">Explore</h4>
                 <ul className="space-y-3 text-sm text-stone-400">
                    <li><Link href="/orweym" className="hover:text-emerald-400 transition-colors">Collection</Link></li>
                    <li><Link href="/about" className="hover:text-emerald-400 transition-colors">Our Story</Link></li>
                    <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
                 </ul>
            </div>

            {/* 3. Kolon: Amazon Linki (YENİ EKLENDİ) */}
            <div>
                <h4 className="font-serif font-medium mb-6 text-white text-lg">Shop Online</h4>
                <ul className="space-y-3 text-sm text-stone-400">
                    <li>
                        <a 
                            href={siteConfig.amazonSellerUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition-colors group"
                        >
                            <span className="group-hover:text-[#FF9900] transition-colors">Amazon US Store</span>
                            <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                    </li>
                    <li className="text-xs text-stone-500 pt-2">
                        Global shipping available via Amazon Fulfillment.
                    </li>
                </ul>
            </div>

            {/* 4. Kolon: İletişim */}
            <div>
                <h4 className="font-serif font-medium mb-6 text-white text-lg">Contact</h4>
                 <p className="text-stone-400 text-sm mb-2">{siteConfig.email}</p>
                 <p className="text-stone-500 text-xs">Delaware, USA</p>
            </div>
        </div>

        {/* Alt Telif */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600">
          <p>&copy; {new Date().getFullYear()} {siteConfig.company}. All rights reserved.</p>
          <div className="flex gap-4">
              <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;