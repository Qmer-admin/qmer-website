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

      // Eğer kullanıcı /admin sayfasına gitmeye çalışıyorsa
      if (isOnAdmin) {
        if (isLoggedIn) return true; // Giriş yapmışsa izin ver
        return false; // Yapmamışsa login sayfasına at
      }
      
      return true; // Diğer sayfalar herkese açık
    },
  },
  providers: [], // Middleware tarafında provider'lar boş kalabilir
} satisfies NextAuthConfig