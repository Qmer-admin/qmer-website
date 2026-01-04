// src/app/sitemap.ts

import { MetadataRoute } from "next";
import { prisma } from "@/lib/db"; // Statik data yerine DB bağlantısı

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseURL = 'https://qmer.us';

    // 1. Statik sayfalar
    const routes = [
        '',
        '/about',
        '/collections',
        '/contact',
        '/privacy', // Varsa eklenmeli
        '/terms',   // Varsa eklenmeli
    ].map((route) => ({
        url: `${baseURL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Dinamik Ürün Sayfaları (DB'den Çekilen)
    // Sadece slug ve update tarihini çekiyoruz (Query Optimization)
    const products = await prisma.product.findMany({
        select: {
            slug: true,
            updatedAt: true,
        },
    });

    const productRoutes = products.map((product) => ({
        url: `${baseURL}/collections/${product.slug}`,
        lastModified: product.updatedAt, // Google için gerçek içerik tarihi
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Hepsini birleştirip döndürüyoruz
    return [...routes, ...productRoutes];
}