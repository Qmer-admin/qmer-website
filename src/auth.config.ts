// src/auth.config.ts

import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      
      // Admin sayfasına girmeye çalışıyorsa
      if (isOnAdmin) {
        // Sadece giriş yapmış olması YETERLİ (Rol kontrolünü Layout'ta yapacağız)
        if (isLoggedIn) return true;
        return false; // Giriş yapmamışsa login'e at
      }
      
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig