import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  // Öne çıkan ilk 2 ürünü gösterelim
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image w/ Overlay */}
        <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/mediterranean-bg.jpg')" }} 
        >
            <div className="absolute inset-0 bg-black/40" /> {/* Karartma */}
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Nature’s Secret, <br />
            <span className="text-primary italic">Refined.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100 font-light">
            Premium skincare inspired by the Mediterranean, engineered for results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
                href="/orweym" 
                className="px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-full font-semibold transition text-lg"
            >
                Discover Collection
            </Link>
            <Link 
                href="/about" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-semibold transition text-lg"
            >
                Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Bestsellers</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}