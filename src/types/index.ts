// src/types/index.ts
export interface Product {
  id: string;
  category: string;
  name: string;
  slug: string; // URL dostu isim
  shortDescription: string;
  description: string; // Detay sayfası için
  price: number;
  currency: 'USD' | 'EUR';
  amazonLink: string;
  images: string[]; // Array yapısında
  features: string[];
  stock: boolean;
  isNew?: boolean;
}