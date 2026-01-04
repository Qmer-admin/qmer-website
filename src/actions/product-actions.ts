// src/actions/product-actions.ts
'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- 1. CREATE (MEVCUT) ---
export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const price = parseFloat(formData.get("price") as string);
  const currency = formData.get("currency") as string;
  const stock = formData.get("stock") === "on"; 
  const isNew = formData.get("isNew") === "on";
  const shortDescription = formData.get("shortDescription") as string;
  const description = formData.get("description") as string;
  const amazonLink = formData.get("amazonLink") as string;
  
  const imagesRaw = formData.get("images") as string;
  const images = imagesRaw ? imagesRaw.split('\n').map(s => s.trim()).filter(s => s !== '') : [];

  const featuresRaw = formData.get("features") as string;
  const features = featuresRaw ? featuresRaw.split('\n').map(s => s.trim()).filter(s => s !== '') : [];

  try {
    await prisma.product.create({
      data: { name, slug, category, price, currency, stock, isNew, shortDescription, description, amazonLink, images, features },
    });
  } catch (error) {
    console.error("Create Error:", error);
    throw new Error("Failed to create product");
  }

  revalidatePath('/admin');
  revalidatePath('/collections');
  redirect('/admin');
}

// --- 2. DELETE (YENİ) ---
export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;

  try {
    await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Delete Error:", error);
    throw new Error("Failed to delete product");
  }

  revalidatePath('/admin');
  revalidatePath('/collections');
}

// --- 3. DUPLICATE (YENİ) ---
export async function duplicateProduct(formData: FormData) {
  const id = formData.get("id") as string;

  // Orijinal ürünü bul
  const original = await prisma.product.findUnique({ where: { id } });
  if (!original) throw new Error("Product not found");

  // Yeni Slug oluştur (Çakışmayı önlemek için sonuna random sayı ekle)
  const newSlug = `${original.slug}-copy-${Math.floor(Math.random() * 1000)}`;

  try {
    // Yeni ürünü oluştur
    const newProduct = await prisma.product.create({
      data: {
        ...original,
        id: undefined, // Yeni ID verilecek
        createdAt: undefined, // Yeni tarih verilecek
        updatedAt: undefined,
        name: `${original.name} (Copy)`,
        slug: newSlug,
        stock: false, // Kopyalanan ürün varsayılan olarak stok dışı olsun (güvenlik)
        isNew: false,
      },
    });

    // İşlem bitince, oluşan yeni ürünün düzenleme sayfasına git
    redirect(`/admin/products/${newProduct.id}/edit`);

  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
        throw error; // Redirect hatasını yutma (Next.js bug fix)
    }
    console.error("Duplicate Error:", error);
    throw new Error("Failed to duplicate product");
  }
}

// --- 4. UPDATE (YENİ) ---
export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  
  // Create ile aynı mantık, sadece 'update' kullanıyoruz
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const price = parseFloat(formData.get("price") as string);
  const currency = formData.get("currency") as string;
  const stock = formData.get("stock") === "on"; 
  const isNew = formData.get("isNew") === "on";
  const shortDescription = formData.get("shortDescription") as string;
  const description = formData.get("description") as string;
  const amazonLink = formData.get("amazonLink") as string;
  
  const imagesRaw = formData.get("images") as string;
  const images = imagesRaw ? imagesRaw.split('\n').map(s => s.trim()).filter(s => s !== '') : [];

  const featuresRaw = formData.get("features") as string;
  const features = featuresRaw ? featuresRaw.split('\n').map(s => s.trim()).filter(s => s !== '') : [];

  try {
    await prisma.product.update({
      where: { id },
      data: { name, slug, category, price, currency, stock, isNew, shortDescription, description, amazonLink, images, features },
    });
  } catch (error) {
    console.error("Update Error:", error);
    throw new Error("Failed to update product");
  }

  revalidatePath('/admin');
  revalidatePath('/collections');
  revalidatePath(`/collections/${slug}`); // Detay sayfasını da yenile
  redirect('/admin');
}