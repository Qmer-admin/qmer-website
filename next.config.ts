// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Diğer mevcut ayarların... */
  
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Limiti 10MB'a çıkardık
    },
  },
};

export default nextConfig;