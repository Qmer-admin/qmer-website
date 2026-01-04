// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Diğer mevcut ayarların... */
  
  // next/image bileşeninin dış kaynaklı resimleri yükleyebilmesi için gereklidir.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Geliştirme aşamasında tüm kaynaklara izin verir. Prodüksiyonda buraya sadece resim sunucunuzu (örn: 'res.cloudinary.com') yazmalısınız.
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Limiti 10MB'a çıkardık
    },
  },

  eslint: {
    // Build sırasında ESLint hatalarını yoksay (Production build'inin kesilmemesi için)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;