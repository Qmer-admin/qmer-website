// örnek: src/app/about/page.tsx
import Navbar from '@/components/Navbar';

export default function AboutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center text-white">
       <Navbar />
       <div className="p-8">
      <h1 className="text-3xl font-bold">About Us</h1>
      <p className="mt-4 text-lg">This is the official QMER LLC website.</p>
    </div>
    <section id="about" className="w-full bg-white text-black py-20 px-6">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
    <div className="w-full md:w-1/2">
      <img
        src="/aipic1.png" // örnek görselin adını değiştir
        alt="Mediterranean Beauty"
        className="rounded-lg shadow-md"
      />
    </div>
    <div className="w-full md:w-1/2 text-center md:text-left">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">Inspired by the Mediterranean</h2>
      <p className="text-gray-700 text-lg">
        ORWEY‑M blends ancient botanical traditions of the Mediterranean with modern skincare science. Our mission is to bring natural beauty to life with purity and effectiveness.
      </p>
    </div>
  </div>
</section>
    </main>    
  );
}
