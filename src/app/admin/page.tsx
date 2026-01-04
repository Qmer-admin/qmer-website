// src/app/admin/page.tsx

import React from 'react';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import { deleteProduct, duplicateProduct } from '@/actions/product-actions';

export default async function AdminDashboard() {
  // Veritabanından ürünleri çek (En son eklenen en üstte)
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      {/* Başlık Alanı */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-900 mb-2">Product Management</h1>
          <p className="text-stone-500 text-sm">Manage your inventory, pricing and stock status.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-emerald-900 hover:bg-emerald-800 text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Add New Product
        </Link>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Total Products</h3>
            <p className="text-3xl font-serif text-emerald-900">{products.length}</p>
         </div>
         <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">In Stock</h3>
            <p className="text-3xl font-serif text-stone-800">{products.filter(p => p.stock).length}</p>
         </div>
         <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Out of Stock</h3>
            <p className="text-3xl font-serif text-red-800">{products.filter(p => !p.stock).length}</p>
         </div>
      </div>

      {/* Tablo */}
      <div className="bg-white border border-stone-200 rounded-sm shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-500 uppercase tracking-wider">
              <th className="p-4 w-20">Image</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-stone-50/50 transition-colors group">
                <td className="p-4">
                  <div className="w-12 h-12 relative bg-stone-100 rounded overflow-hidden border border-stone-200">
                    {product.images[0] && (
                        <Image 
                            src={product.images[0]} 
                            alt={product.name} 
                            fill 
                            className="object-cover"
                        />
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-bold text-stone-800 text-sm">{product.name}</p>
                  <p className="text-xs text-stone-400 font-mono">/{product.slug}</p>
                </td>
                <td className="p-4 text-sm font-medium text-stone-600">
                   {product.currency === 'USD' ? '$' : '€'}{Number(product.price).toFixed(2)}
                </td>
                <td className="p-4">
                    {product.stock ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800 border border-green-200">
                           In Stock
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                           Out of Stock
                        </span>
                    )}
                </td>                
<td className="p-4 text-right flex justify-end items-center gap-2">
    {/* 1. DUPLICATE BUTONU */}
    <form action={duplicateProduct}>
        <input type="hidden" name="id" value={product.id} />
        <button type="submit" className="text-stone-400 hover:text-blue-600 transition-colors p-1" title="Duplicate">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        </button>
    </form>

    {/* 2. EDIT BUTONU */}
    <Link href={`/admin/products/${product.id}/edit`} className="text-stone-400 hover:text-emerald-700 transition-colors p-1" title="Edit">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
    </Link>
    
    {/* 3. DELETE BUTONU */}
    <form action={deleteProduct}>
        <input type="hidden" name="id" value={product.id} />
        <button type="submit" className="text-stone-400 hover:text-red-700 transition-colors p-1" title="Delete">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
    </form>
</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {products.length === 0 && (
            <div className="p-12 text-center text-stone-400">
                <p>No products found. Start by adding one!</p>
            </div>
        )}
      </div>
    </div>
  );
}