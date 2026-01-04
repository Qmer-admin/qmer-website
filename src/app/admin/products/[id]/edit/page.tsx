// src/app/admin/products/[id]/edit/page.tsx

import { prisma } from "@/lib/db";
import { updateProduct } from "@/actions/product-actions";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({ params }: EditPageProps) {
  const { id } = await params;

  // Düzenlenecek ürünü çek
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    return notFound();
  }

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

      <form action={updateProduct} className="bg-white p-8 border border-stone-200 shadow-sm rounded-sm space-y-8">
        
        {/* ID'yi gizli olarak gönderiyoruz ki hangi ürünü güncelleyeceğini bilsin */}
        <input type="hidden" name="id" value={product.id} />

        {/* 1. Temel Bilgiler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Product Name</label>
                <input 
                    name="name" 
                    type="text" 
                    required 
                    defaultValue={product.name}
                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none transition-colors"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Slug (URL)</label>
                <input 
                    name="slug" 
                    type="text" 
                    required 
                    defaultValue={product.slug}
                    className="w-full bg-stone-100 border border-stone-200 p-3 rounded-sm text-stone-600 font-mono text-sm focus:border-emerald-800 outline-none"
                />
            </div>
        </div>

        {/* 2. Kategori ve Fiyat */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Category</label>
                <select name="category" defaultValue={product.category} className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none cursor-pointer">
                    <option value="Serums">Serums</option>
                    <option value="Oils">Oils</option>
                    <option value="Cleansers">Cleansers</option>
                    <option value="Sets">Sets</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Price</label>
                <input 
                    name="price" 
                    type="number" 
                    step="0.01" 
                    required 
                    defaultValue={Number(product.price)}
                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Currency</label>
                <select name="currency" defaultValue={product.currency} className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none cursor-pointer">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                </select>
            </div>
        </div>

        {/* 3. Açıklamalar */}
        <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Short Description</label>
            <textarea 
                name="shortDescription" 
                rows={2} 
                required 
                defaultValue={product.shortDescription}
                className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none resize-none"
            ></textarea>
        </div>

        <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Full Description</label>
            <textarea 
                name="description" 
                rows={5} 
                required 
                defaultValue={product.description}
                className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none"
            ></textarea>
        </div>

        {/* 4. Listeler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Image Paths</label>
                <p className="text-[10px] text-stone-400 mb-2">One path per line.</p>
                <textarea 
                    name="images" 
                    rows={4} 
                    // Array'i string'e çevirip alt alta gösteriyoruz
                    defaultValue={product.images.join('\n')}
                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none font-mono text-xs"
                ></textarea>
            </div>
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Features</label>
                <p className="text-[10px] text-stone-400 mb-2">One feature per line.</p>
                <textarea 
                    name="features" 
                    rows={4} 
                    defaultValue={product.features.join('\n')}
                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none"
                ></textarea>
            </div>
        </div>

        {/* 5. Durum ve Linkler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-t border-stone-100 pt-6">
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Amazon Link</label>
                <input 
                    name="amazonLink" 
                    type="url" 
                    required 
                    defaultValue={product.amazonLink}
                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none"
                />
            </div>
            
            <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input name="stock" type="checkbox" defaultChecked={product.stock} className="w-5 h-5 text-emerald-900 border-stone-300 rounded focus:ring-emerald-900" />
                    <span className="text-sm font-bold text-stone-700 group-hover:text-emerald-800">In Stock</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                    <input name="isNew" type="checkbox" defaultChecked={product.isNew} className="w-5 h-5 text-emerald-900 border-stone-300 rounded focus:ring-emerald-900" />
                    <span className="text-sm font-bold text-stone-700 group-hover:text-emerald-800">Mark as New</span>
                </label>
            </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex gap-4">
            <button 
                type="submit" 
                className="flex-1 bg-emerald-900 text-white font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-emerald-800 transition-all shadow-lg"
            >
                Update Product
            </button>
        </div>

      </form>
    </div>
  );
}