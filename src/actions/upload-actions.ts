// src/actions/upload-actions.ts
'use server';

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function uploadImage(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  const file = formData.get('file') as File;

  if (!file) {
    return { success: false, error: 'No file uploaded' };
  }

  // Dosya bir resim mi kontrolü (Basit güvenlik)
  if (!file.type.startsWith('image/')) {
    return { success: false, error: 'File is not an image' };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Dosya ismini güvenli hale getir ve benzersiz yap
  // Örn: "my photo.jpg" -> "1704355200-my-photo.jpg"
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-z0-9.]/gi, '-').toLowerCase();
  const filename = `${timestamp}-${safeName}`;
  
  // Kayıt yolu: public/uploads/products
  // Not: process.cwd() projenin kök dizinini verir
  const uploadDir = join(process.cwd(), 'public', 'uploads', 'products');
  const filePath = join(uploadDir, filename);
  
  // URL yolu (Veritabanına bu kaydedilecek)
  const publicPath = `/uploads/products/${filename}`;

  try {
    // Klasörün var olduğundan emin ol (Garanti olsun)
    await mkdir(uploadDir, { recursive: true });
    
    // Dosyayı diske yaz
    await writeFile(filePath, buffer);
    
    return { success: true, url: publicPath };
  } catch (error) {
    console.error('Upload Error:', error);
    return { success: false, error: 'Upload failed' };
  }
}