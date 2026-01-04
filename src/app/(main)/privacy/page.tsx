// src/app/(main)/privacy/page.tsx

import React from 'react';
import { siteConfig } from '@/lib/data';

export const metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${siteConfig.name}`,
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FDFCF8] py-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-stone-500 mb-12 text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-stone prose-lg max-w-none text-stone-700 font-light leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">1. Introduction</h2>
            <p>
              Welcome to <strong>{siteConfig.name}</strong> (operated by {siteConfig.company}). We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">2. Information We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website and products.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>To register you as a new customer.</li>
              <li>To process and deliver your order via our partners (e.g., Amazon Fulfillment).</li>
              <li>To manage our relationship with you.</li>
              <li>To improve our website, products/services, marketing and customer relationships.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. 
              In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 mb-4">5. Contact Details</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <p className="mt-4 font-medium text-gray-900">
              {siteConfig.company}<br/>
              Email: <a href={`mailto:${siteConfig.email}`} className="text-emerald-700 hover:underline">{siteConfig.email}</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}