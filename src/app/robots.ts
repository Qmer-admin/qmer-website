import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*', // Tüm botlara izin ver
            allow: '/', // Sitenin her yerini tarayabilirsin
            disallow: ['/api/', '/admin/'], // API ve Admin paneline girme
        },
        sitemap: 'https://qmer.us/sitemap.xml', // Haritamız burası
    };
}