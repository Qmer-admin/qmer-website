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
      // TypeScript için geçici casting, birazdan types dosyası ile kalıcı çözeceğiz
      const userRole = (auth?.user as any)?.role;

      // Eğer kullanıcı /admin sayfasına gitmeye çalışıyorsa
      if (isOnAdmin) {
        // Sadece giriş yapmış VE rolü ADMIN olanlar girebilir
        if (isLoggedIn && userRole === 'ADMIN') return true;
        return false; // Yetkisiz erişim, login sayfasına yönlendir
      }
      
      return true; // Diğer sayfalar herkese açık
    },
  },
  providers: [], // Middleware tarafında provider'lar boş kalabilir
} satisfies NextAuthConfig