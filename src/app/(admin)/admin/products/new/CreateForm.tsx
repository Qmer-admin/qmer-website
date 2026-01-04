// src/app/(admin)/admin/products/new/CreateForm.tsx
"use client";

import { createProduct } from "@/actions/product-actions";
import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";

export default function CreateForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
  };

  return (
    <form action={createProduct} className="bg-white p-8 border border-stone-200 shadow-sm rounded-sm space-y-8">
        
        {/* Temel Bilgiler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Product Name</label>
                <input name="name" type="text" required value={name} onChange={handleNameChange} placeholder="e.g. Revitalizing Night Cream" className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none transition-colors" />
            </div>
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Slug (URL)</label>
                <input name="slug" type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="e.g. revitalizing-night-cream" className="w-full bg-stone-100 border border-stone-200 p-3 rounded-sm text-stone-600 font-mono text-sm focus:border-emerald-800 outline-none" />
            </div>
        </div>

        {/* Kategori ve Fiyat */}
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
                <input name="price" type="number" step="0.01" required placeholder="0.00" className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none" />
            </div>
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Currency</label>
                <select name="currency" className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none cursor-pointer">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                </select>
            </div>
        </div>

        {/* Açıklamalar */}
        <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Short Description</label>
            <textarea name="shortDescription" rows={2} required placeholder="Brief summary for cards..." className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none resize-none"></textarea>
        </div>

        <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Full Description</label>
            <textarea name="description" rows={5} required placeholder="Detailed product information..." className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none"></textarea>
        </div>

        {/* GÖRSELLER VE ÖZELLİKLER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Product Images</label>
                
                {/* Yeni ürün olduğu için defaultImages boş */}
                <ImageUploader onImagesChange={setImages} defaultImages={[]} />
                
                <input type="hidden" name="images" value={images.join('\n')} />
            </div>

            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Features</label>
                <p className="text-[10px] text-stone-400 mb-2">One feature per line.</p>
                <textarea 
                    name="features" 
                    rows={12} 
                    placeholder="- Organic Ingredients&#10;- Cruelty Free&#10;- Dermatologist Tested"
                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none"
                ></textarea>
            </div>
        </div>

        {/* Durum ve Linkler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-t border-stone-100 pt-6">
            <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Amazon Link (Optional)</label>
                <input name="amazonLink" type="url" placeholder="https://amazon.com/..." className="w-full bg-stone-50 border border-stone-200 p-3 rounded-sm focus:border-emerald-800 outline-none" />
            </div>
            
            <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input name="stock" type="checkbox" defaultChecked={true} className="w-5 h-5 text-emerald-900 border-stone-300 rounded focus:ring-emerald-900" />
                    <span className="text-sm font-bold text-stone-700 group-hover:text-emerald-800">In Stock</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input name="isNew" type="checkbox" defaultChecked={true} className="w-5 h-5 text-emerald-900 border-stone-300 rounded focus:ring-emerald-900" />
                    <span className="text-sm font-bold text-stone-700 group-hover:text-emerald-800">Mark as New</span>
                </label>
            </div>
        </div>

        <div className="pt-4 flex gap-4">
            <button type="submit" className="flex-1 bg-emerald-900 text-white font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-emerald-800 transition-all shadow-lg">
                Create Product
            </button>
        </div>
    </form>
  );
}
