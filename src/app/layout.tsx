import './globals.css';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'QMER LLC',
  description: 'Official Website of QMER LLC – Innovative Brands Worldwide',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
    {children}
    </body>  
    </html>
  );
}