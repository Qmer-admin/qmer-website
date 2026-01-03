'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
  return (
    <>
      {/* 1. Google'ın Script Dosyasını Yükle */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-CGKYL01WP0"
        strategy="afterInteractive"
      />
      
      {/* 2. Konfigürasyon Ayarlarını Yap */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-CGKYL01WP0');
        `}
      </Script>
    </>
  );
}