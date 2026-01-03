import { MetadataRoute } from 'next';
import { userAgent } from 'next/server';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*', // Tüm botlara izin ver
            allow: '/', // Sitenin her yerini tarayabilirsin
            disallow: '/api/', // Ama API rotalarına girme 
        },
        sitemap: 'https://qmer.us/sitemap.xml', // Haritamız burası
    };
}