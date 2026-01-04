// src/app/(main)/terms/page.tsx

import React from 'react';
import { siteConfig } from '@/lib/data';

export const metadata = {
  title: 'Terms of Service',
  description: `Terms and Conditions for ${siteConfig.name}`,
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FDFCF8] py-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">Terms of Service</h1>
        <p className="text-stone-500 mb-12 text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-stone prose-lg max-w-none text-stone-700 font-light leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and <strong>{siteConfig.company}</strong> ("we," "us" or "our"), 
              concerning your access to and use of the <strong>{siteConfig.name}</strong> website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">2. Products and Services</h2>
            <p>
              We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.
            </p>
            <p className="mt-4 bg-stone-100 p-4 border-l-4 border-emerald-700 italic text-sm">
              <strong>Medical Disclaimer:</strong> The products and information found on this website are not intended to replace professional medical advice or treatment. Our products are not intended to diagnose, treat, cure, or prevent any disease. Always consult your physician or other qualified health provider before using any new skincare product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">3. Purchases and Payment</h2>
            <p>
              We accept payments through secure third-party payment processors or via our Amazon Store integration. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">4. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">5. Contact Us</h2>
            <p>
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            </p>
            <p className="mt-4 font-medium text-gray-900">
              Email: <a href={`mailto:${siteConfig.email}`} className="text-emerald-700 hover:underline">{siteConfig.email}</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}