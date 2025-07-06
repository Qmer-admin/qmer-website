// örnek: src/app/about/page.tsx
import Navbar from '@/components/Navbar';
export default function AboutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center text-white">
     <Navbar />
      <h1 className="text-3xl font-bold">Contact</h1>
    </main>
    
  );
}
