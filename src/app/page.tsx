'use client';

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
]
export default function Home() {
  return (
    <main className="bg-light text-dark font-sans">
      <Navbar />

      {/* Hero Section */}
  <section
        className="relative w-full min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/mediterranean-bg.jpg')" }} // Görsel yolunu doğru ver
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* İçerik */}
        <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-4">
          <Image
            src="/orwey beyaz logo2.png" // Logo dosyan varsa buraya SVG ekle
            alt="ORWEY-M Logo"
            width={350}
            height={100}
            className="mb-2"
          />
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
        ORWEY-M 
          </h1>
        <p className="mt-6 text-lg md:text-2xl text-white font-medium drop-shadow">
        Rediscover your beauty with the natural power of the Mediterranean.
        </p>
          <a
            href="#products"
            className="mt-10 inline-block bg-white text-black font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition text-lg">
            Discover ORWEY-M
          </a>
        </div>
      </section>
      
      {/* Products / Brands Section */}
      <section id="products" className="py-20 bg-white text-center transition-all duration-500">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
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
                  <h2 className="text-xl text-black font-semibold mb-2">{product.name}</h2>
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

      {/* Footer Tanıtım Bölümü */}
      <div className="flex items-center justify-center h-[60vh] text-center px-4 bg-black text-white">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-primary">QMER LLC</h1>
          <p className="text-lg text-gray-300">Welcome to our website</p>
        </div>
      </div>
    </main>
  )
}