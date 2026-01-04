// src/app/admin/products/new/page.tsx
"use client";

import { createProduct } from "@/actions/product-actions";
import Link from "next/link";
import { useState } from "react";
import ImageUploader from "@/components/ImageUploader"; // <--- Import ettik

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  
  // Resimlerin listesini tutacak state
  const [images, setImages] = useState<string[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-3xl font-serif text-gray-900">Add New Product</h1>
           <p className="text-stone-500 text-sm mt-1">Fill in the details to create a new product.</p>
        </div>
        <Link href="/admin" className="text-stone-500 hover:text-stone-900 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           Back to List
        </Link>
      </div>

      <form action={createProduct} className="bg-white p-8 border border-stone-200 shadow-sm rounded-sm space-y-8">
        
        {/* --- 1. Temel Bilgiler --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Product Name</label>
                <input name="name" type="text" required value={name} onChange={handleNameChange} className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none transition-colors" placeholder="e.g. Regenerating Serum" />
            </div>
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Slug (URL)</label>
                <input name="slug" type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-stone-100 border border-stone-200 p-3 rounded-sm text-stone-600 font-mono text-sm focus:border-emerald-800 outline-none" />
            </div>
        </div>

        {/* --- 2. Kategori ve Fiyat --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Category</label>
                <select name="category" className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none cursor-pointer">
                    <option value="Serums">Serums</option>
                    <option value="Oils">Oils</option>
                    <option value="Cleansers">Cleansers</option>
                    <option value="Sets">Sets</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Price</label>
                <input name="price" type="number" step="0.01" required className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none" placeholder="0.00" />
            </div>
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Currency</label>
                <select name="currency" className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none cursor-pointer">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                </select>
            </div>
        </div>

        {/* --- 3. Açıklamalar --- */}
        <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Short Description</label>
            <textarea name="shortDescription" rows={2} required className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none resize-none" placeholder="Brief summary (max 150 chars)"></textarea>
        </div>

        <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Full Description</label>
            <textarea name="description" rows={5} required className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none" placeholder="Detailed product information..."></textarea>
        </div>

        {/* --- 4. GÖRSELLER VE ÖZELLİKLER (GÜNCELLENDİ) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SOL TARAF: RESİM YÜKLEME ALANI */}
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Product Images</label>
                
                {/* Yeni Component'imiz Burada */}
                <ImageUploader onImagesChange={setImages} />

                {/* GİZLİ INPUT: Server Action'a veriyi taşıyan köprü */}
                {/* Resim yollarını 'alt satıra' bölerek string haline getirip gönderiyoruz */}
                <input type="hidden" name="images" value={images.join('\n')} />
            </div>

            {/* SAĞ TARAF: ÖZELLİKLER */}
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Features</label>
                <p className="text-[10px] text-stone-400 mb-2">One feature per line.</p>
                <textarea 
                    name="features" 
                    rows={12} // Resim alanı büyüdüğü için bunu da uzattık
                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none"
                    placeholder="Vegan&#10;Cruelty Free&#10;Dermatologist Tested"
                ></textarea>
            </div>
        </div>

        {/* --- 5. Durum ve Linkler --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-t border-stone-100 pt-6">
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Amazon Link</label>
                <input name="amazonLink" type="url" required className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none" placeholder="https://amazon.com/..." />
            </div>
            
            <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input name="stock" type="checkbox" defaultChecked className="w-5 h-5 text-emerald-900 border-stone-300 rounded focus:ring-emerald-900" />
                    <span className="text-sm font-bold text-stone-700 group-hover:text-emerald-800">In Stock</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input name="isNew" type="checkbox" className="w-5 h-5 text-emerald-900 border-stone-300 rounded focus:ring-emerald-900" />
                    <span className="text-sm font-bold text-stone-700 group-hover:text-emerald-800">Mark as New</span>
                </label>
            </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
            <button type="submit" className="w-full bg-emerald-900 text-white font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-emerald-800 transition-all shadow-lg">
                Create Product
            </button>
        </div>
      </form>
    </div>
  );
}