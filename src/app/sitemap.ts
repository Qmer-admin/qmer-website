import { MetadataRoute } from "next";
import { products } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseURL = 'https://qmer.us'; // DİKKAT: 'htpps' değil 'https' olmalı

    // 1. Statik sayfalar
    const routes = [
        '',
        '/about',
        '/orweym',
        '/contact',
    ].map((route) => ({
        url: `${baseURL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Dinamik Ürün Sayfaları (EKSİK OLAN KISIM BU)
    const productRoutes = products.map((product) => ({
        url: `${baseURL}/orweym/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Hepsini birleştirip döndürüyoruz
    return [...routes, ...productRoutes];
}