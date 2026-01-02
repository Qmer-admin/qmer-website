import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function OrweymPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-center mb-12">The Collection</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}