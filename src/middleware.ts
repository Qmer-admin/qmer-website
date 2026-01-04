// src/middleware.ts

import NextAuth from "next-auth"
import { authConfig } from "./auth.config" // Birazdan oluşturacağız

// Şimdilik sadece konfigürasyonu dışarıdan alacak şekilde hazırlıyoruz
export default NextAuth(authConfig).auth

export const config = {
  // Bu middleware hangi sayfalarda çalışsın?
  // api, _next/static, görseller hariç her yerde çalışsın
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}