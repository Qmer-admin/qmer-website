import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gray-900 text-white pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">About QMER LLC</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Görsel */}
            <div className="w-full md:w-1/2 relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                    src="/aipic1.png" 
                    alt="Mediterranean Beauty" 
                    fill 
                    className="object-cover"
                />
            </div>
            
            {/* Metin */}
            <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Inspired by the Mediterranean</h2>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                    <p>
                        ORWEY‑M blends ancient botanical traditions of the Mediterranean with modern skincare science. 
                    </p>
                    <p>
                        Founded under <strong>QMER LLC</strong>, our mission is to bring natural beauty to life with purity and effectiveness. 
                        We believe in transparency, high-quality ingredients, and sustainable practices.
                    </p>
                    <p>
                        Whether it&apos;s our exfoliating serums or organic essential oils, every drop is crafted to provide a premium experience for our customers across the globe.
                    </p>
                </div>
            </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}