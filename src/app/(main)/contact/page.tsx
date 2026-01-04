// src/app/(main)/contact/page.tsx

'use client'; // 1. State kullanacağımız için bu şart
import { useState } from 'react';
import { siteConfig } from '@/lib/data';

export default function ContactPage() {
  // 2. Form verilerini ve gönderim durumunu tutan state'ler
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'Product Inquiry',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // 3. Inputlara yazı yazıldığında çalışacak fonksiyon
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 4. Gönder butonuna basıldığında çalışacak fonksiyon
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', subject: 'Product Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFCF8]">
      
      {/* HEADER ALANI (DOKUNULMADI) */}
      <div className="relative py-24 bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/mediterranean-bg.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
            <span className="text-emerald-400 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">
                Customer Care
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
                Get in Touch
            </h1>
            <p className="mt-4 text-stone-400 font-light max-w-lg mx-auto">
                Have questions about our products or your order? We are here to help you on your journey to natural beauty.
            </p>
        </div>
      </div>

      {/* İLETİŞİM FORMU VE BİLGİLER */}
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* SOL TARAF: İLETİŞİM BİLGİLERİ (DOKUNULMADI) */}
            <div className="space-y-12">
                <div>
                    <h2 className="text-3xl font-serif text-gray-900 mb-6">Contact Information</h2>
                    <div className="w-12 h-1 bg-emerald-800 mb-8"></div>
                    <p className="text-stone-600 font-light leading-relaxed">
                        Our team is available Monday through Friday, 9am to 5pm EST. 
                        We typically respond to all inquiries within 24 hours.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Email Kartı */}
                    <div className="p-6 bg-white border border-stone-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <h3 className="font-serif text-lg text-gray-900 mb-1">Email Us</h3>
                        <a href={`mailto:${siteConfig.email}`} className="text-sm text-stone-500 hover:text-emerald-700 transition-colors">
                            {siteConfig.email}
                        </a>
                    </div>

                    {/* Adres Kartı */}
                    <div className="p-6 bg-white border border-stone-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-800">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <h3 className="font-serif text-lg text-gray-900 mb-1">Location</h3>
                        <p className="text-sm text-stone-500">
                            Delaware, USA
                        </p>
                    </div>
                </div>

                {/* SSS Bölümü */}
                <div className="pt-8 border-t border-stone-200">
                    <h3 className="font-serif text-xl text-gray-900 mb-4">Frequently Asked</h3>
                    <div className="space-y-4">
                        <details className="group cursor-pointer">
                            <summary className="flex justify-between items-center font-medium text-stone-700 list-none">
                                <span>Do you ship internationally?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-stone-500 mt-3 group-open:animate-fadeIn text-sm leading-relaxed">
                                Yes, we ship globally via Amazon Fulfillment to ensure the fastest delivery times.
                            </p>
                        </details>
                        <div className="h-px bg-stone-100"></div>
                        <details className="group cursor-pointer">
                            <summary className="flex justify-between items-center font-medium text-stone-700 list-none">
                                <span>Are your products organic?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-stone-500 mt-3 group-open:animate-fadeIn text-sm leading-relaxed">
                                Absolutely. We use 100% organic, steam-distilled ingredients sourced directly from the Mediterranean region.
                            </p>
                        </details>
                    </div>
                </div>
            </div>

            {/* SAĞ TARAF: FORM (MANTIK EKLENDİ) */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100">
                <h3 className="text-2xl font-serif text-gray-900 mb-6">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-xs font-bold text-stone-500 uppercase tracking-wider">First Name</label>
                            <input required type="text" id="firstName" value={formData.firstName} onChange={handleChange} className="w-full border-b border-stone-200 focus:border-emerald-600 outline-none py-2 transition-colors bg-transparent placeholder-stone-300" placeholder="Jane" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-xs font-bold text-stone-500 uppercase tracking-wider">Last Name</label>
                            <input required type="text" id="lastName" value={formData.lastName} onChange={handleChange} className="w-full border-b border-stone-200 focus:border-emerald-600 outline-none py-2 transition-colors bg-transparent placeholder-stone-300" placeholder="Doe" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold text-stone-500 uppercase tracking-wider">Email Address</label>
                        <input required type="email" id="email" value={formData.email} onChange={handleChange} className="w-full border-b border-stone-200 focus:border-emerald-600 outline-none py-2 transition-colors bg-transparent placeholder-stone-300" placeholder="jane@example.com" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="subject" className="text-xs font-bold text-stone-500 uppercase tracking-wider">Subject</label>
                        <select id="subject" value={formData.subject} onChange={handleChange} className="w-full border-b border-stone-200 focus:border-emerald-600 outline-none py-2 transition-colors bg-transparent text-stone-600">
                            <option>Product Inquiry</option>
                            <option>Order Status</option>
                            <option>Wholesale / Partnership</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-bold text-stone-500 uppercase tracking-wider">Message</label>
                        <textarea required id="message" value={formData.message} onChange={handleChange} rows={4} className="w-full border border-stone-200 rounded-lg p-3 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-all bg-stone-50 placeholder-stone-300 resize-none" placeholder="How can we help you today?"></textarea>
                    </div>

                    {/* BUTON DURUMU (Loading/Success kontrolü eklendi) */}
                    <button 
                        type="submit" 
                        disabled={status === 'loading' || status === 'success'}
                        className={`w-full font-bold uppercase tracking-widest text-xs py-4 rounded-lg transition-colors shadow-lg ${
                            status === 'success' ? 'bg-emerald-600 text-white' : 
                            status === 'loading' ? 'bg-stone-400 text-white cursor-wait' : 
                            'bg-stone-900 text-white hover:bg-emerald-900'
                        }`}
                    >
                        {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                    </button>
                    
                    {/* GERİ BİLDİRİM MESAJLARI (Tasarım bozulmadan alta eklendi) */}
                    {status === 'success' && (
                        <p className="text-center text-emerald-600 text-sm font-medium mt-4 bg-emerald-50 py-2 rounded animate-fadeIn">
                            Received! We will get back to you shortly.
                        </p>
                    )}
                    {status === 'error' && (
                        <p className="text-center text-red-500 text-sm font-medium mt-4 animate-fadeIn">
                            Something went wrong. Please try again.
                        </p>
                    )}

                    <p className="text-xs text-center text-stone-400 mt-4">
                        This site is protected by reCAPTCHA and the Google Privacy Policy apply.
                    </p>
                </form>
            </div>
        </div>
      </div>
    </main>
  );
}