import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';

export default function OrweymPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-32 pb-12 text-center bg-white px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">The ORWEY-M Collection</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
            Experience the fusion of nature and science. Every product is designed to enhance your natural beauty.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}