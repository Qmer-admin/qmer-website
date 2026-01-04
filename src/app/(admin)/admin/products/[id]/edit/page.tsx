// src/app/admin/products/[id]/edit/page.tsx

import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditForm from "./EditForm"; // <--- Yeni formu import et

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditPageProps) {
  const { id } = await params;

  // Veriyi çek
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    return notFound();
  }

  // Formu render et
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-3xl font-serif text-gray-900">Edit Product</h1>
           <p className="text-stone-500 text-sm mt-1">Update details for <span className="font-bold">{product.name}</span></p>
        </div>
        <Link href="/admin" className="text-stone-500 hover:text-stone-900 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           Back to List
        </Link>
      </div>

      <EditForm product={product} />
    </div>
  );
}