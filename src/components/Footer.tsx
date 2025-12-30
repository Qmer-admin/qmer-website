import { siteConfig } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
                <h3 className="text-xl font-bold mb-4">{siteConfig.company}</h3>
                <p className="text-gray-400 text-sm max-w-xs">{siteConfig.description}</p>
            </div>
            <div>
                 <h4 className="font-semibold mb-4 text-gray-300">Quick Links</h4>
                 <ul className="space-y-2 text-sm text-gray-500">
                    <li><a href="/orweym" className="hover:text-primary">Our Collection</a></li>
                    <li><a href="/about" className="hover:text-primary">About Us</a></li>
                    <li><a href="/contact" className="hover:text-primary">Contact</a></li>
                 </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4 text-gray-300">Contact</h4>
                 <p className="text-gray-500 text-sm">{siteConfig.email}</p>
                 <p className="text-gray-500 text-sm">Delaware, USA</p>
            </div>
        </div>
        <div className="pt-8 border-t border-gray-900 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} {siteConfig.company}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}