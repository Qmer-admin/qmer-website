// src/app/(main)/login/page.tsx

import React from 'react';
import LoginForm from '@/components/LoginForm';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your QMER account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF8] relative overflow-hidden">
      
      {/* Arka Plan Dekoru */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/mediterranean-bg.jpg')] bg-cover bg-center opacity-10 blur-sm"></div>
          <div className="absolute inset-0 bg-stone-900/5"></div>
      </div>

      {/* Üst Logo/Home Link 
          NOT: (main) layout'unda Navbar olduğu için bu logo Navbar ile birlikte görünecektir.
          Eğer sadece bu logoyu istiyorsanız, bu sayfayı (auth) grubuna taşımanız gerekir.
      */}
      <div className="absolute top-8 left-8 z-20">
         <Link href="/" className="text-2xl font-serif font-bold text-emerald-900 tracking-tighter hover:opacity-80 transition-opacity">
            QMER.
         </Link>
      </div>

      {/* Form Alanı */}
      <div className="relative z-10 w-full flex justify-center px-4">
        <LoginForm />
      </div>

    </div>
  );
}