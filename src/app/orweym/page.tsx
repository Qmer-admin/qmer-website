// app/orweym/page.tsx

import Navbar from '@/components/Navbar';
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "AHA + BHA Exfoliating Serum",
    description: "Gentle exfoliation for brighter, smoother skin.",
    image: "/aha-serum.png",
    amazonLink: "https://www.amazon.com/dp/B0F6V7D91G",
  },
  {
    id: 2,
    name: "Vitamin C Brightening Serum",
    description: "Revitalize your skin with pure Vitamin C.",
    image: "/vitamin-c.jpg",
    amazonLink: "https://www.amazon.com/dp/B0F67F4JC8",
  },
  {
    id: 3,
    name: "Rosemary Essential Oil",
    description: "Soothing botanical oil for skin & hair.",
    image: "/rosemary.jpg",
    amazonLink: "https://www.amazon.com/dp/B0F6VCJTCY",
  },
];

export default function OrweymPage() {
  return (
    <main className="relative min-h-screen text-black overflow-hidden">
      <Navbar />
      
  {/* Arka plan geçişi */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-lime-100 via-green-50 to-amber-100" />

      {/* İçerik */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">Our Products</h1>
        <div className="grid gap-y-14 gap-x-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="w-full aspect-[3/2] relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-700 text-sm">{product.description}</p>
                </div>
                <div className="mt-6">
                  <Link
                    href={product.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition"
                  >
                    Buy on Amazon
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
