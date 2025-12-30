import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/data';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-40 pb-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h1>
            <p className="text-gray-600 mb-8">
                Have questions about our products or want to partner with us?
            </p>
            
            <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 uppercase font-bold">Email Us</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-primary text-xl font-medium hover:underline">
                        {siteConfig.email}
                    </a>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 uppercase font-bold">Business Location</p>
                    <p className="text-gray-900 text-lg">Delaware, USA</p>
                </div>
            </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}