export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFCF8]">
      
      {/* Header - Daha Modern */}
      <div className="relative py-32 bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/mediterranean-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
            <span className="text-emerald-400 font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Our Heritage</span>
            <h1 className="text-5xl md:text-6xl font-serif font-medium tracking-tight">The Story of QMER</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Metin Sol */}
            <div className="space-y-6">
                <h2 className="text-3xl font-serif text-gray-900">Inspired by the<br/>Ancient Mediterranean.</h2>
                <div className="w-12 h-1 bg-emerald-800"></div>
                <div className="text-stone-600 leading-relaxed font-light space-y-4 text-lg">
                    <p>
                        It started with a simple question: <em>Can we bottle the essence of nature without losing its power?</em>
                    </p>
                    <p>
                        ORWEY‑M blends ancient botanical traditions of the Mediterranean with modern skincare science. Founded under <strong>QMER LLC</strong>, our mission is to bring natural beauty to life with purity and effectiveness.
                    </p>
                    <p>
                        We believe in transparency, high-quality ingredients, and sustainable practices that honor both your skin and the earth.
                    </p>
                </div>
            </div>

            {/* Görsel Sağ (Placeholder Renk) */}
            <div className="relative aspect-[4/5] bg-stone-200 rounded-lg overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                 {/* Buraya ileride about-image.jpg koyabilirsin */}
                 <div className="absolute inset-0 flex items-center justify-center text-stone-400 font-serif italic text-2xl">
                    Image: Nature & Science
                 </div>
            </div>
        </div>
      </div>
    </main>
  );
}