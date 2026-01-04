// src/app/(admin)/layout.tsx

import React from "react";
import Link from "next/link";
import { auth, signOut } from "@/auth"; 
import { redirect } from "next/navigation";
import "@/app/globals.css"; // Global stilleri dahil etmeyi unutmayın

// Logout işlemi için Server Action
async function handleSignOut() {
  "use server";
  await signOut();
}

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Güvenlik Katmanı
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 flex font-sans">
        
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-[#1a1c1a] text-stone-300 flex flex-col fixed h-full z-30 shadow-xl">
          {/* Logo Alanı */}
          <div className="h-20 flex items-center px-8 border-b border-stone-800 bg-[#141614]">
            <span className="text-2xl font-serif font-bold text-white tracking-tight">
              QMER. <span className="text-[10px] font-sans text-emerald-500 tracking-widest uppercase ml-1">Admin</span>
            </span>
          </div>

          {/* Menü Linkleri */}
          <nav className="flex-1 py-8 px-4 space-y-2">
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-4 py-3 rounded-md bg-emerald-900/30 text-emerald-400 border border-emerald-900/50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              <span className="text-sm font-bold tracking-wide">Products</span>
            </Link>
            
            <div className="px-4 py-3 text-stone-600 text-xs uppercase tracking-widest font-bold mt-6 mb-2">Coming Soon</div>
            
            <button disabled className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-stone-600 cursor-not-allowed">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
               <span className="text-sm">Orders</span>
            </button>
            
            <button disabled className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-stone-600 cursor-not-allowed">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               <span className="text-sm">Settings</span>
            </button>
          </nav>

          {/* Alt Kısım: Kullanıcı Profili */}
          <div className="p-4 border-t border-stone-800 bg-[#141614]">
              <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-xs font-bold text-white">
                      {session.user.name?.charAt(0) || "A"}
                  </div>
                  <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-bold text-white truncate">{session.user.name}</p>
                      <p className="text-[10px] text-stone-500 truncate">{session.user.email}</p>
                  </div>
              </div>
              
              <form action={handleSignOut}>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-stone-800 hover:bg-red-900/80 hover:text-white text-stone-400 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Sign Out
                  </button>
              </form>
          </div>
        </aside>

        {/* --- ANA İÇERİK ALANI --- */}
        <main className="flex-1 ml-64 p-8 animate-fadeIn">
           {children}
        </main>

      </body>
    </html>
  );
}
