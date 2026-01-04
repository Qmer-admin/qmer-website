// src/app/(admin)/admin/products/new/page.tsx

import React from 'react';
import Link from "next/link";
import CreateForm from "./CreateForm";

export default function NewProductPage() {
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

      <CreateForm />
    </div>
  );
}