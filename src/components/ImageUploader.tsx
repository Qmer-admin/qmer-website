// src/components/ImageUploader.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/actions/upload-actions';

interface ImageUploaderProps {
  onImagesChange: (urls: string[]) => void;
  defaultImages?: string[]; // Düzenleme sayfasında var olan resimler için
}

export default function ImageUploader({ onImagesChange, defaultImages = [] }: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>(defaultImages);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError("");

    // Tek tek yükle (Çoklu seçim olsa bile)
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);

      const result = await uploadImage(formData);

      if (result.success && result.url) {
        newUrls.push(result.url);
      } else {
        setError("Some images failed to upload.");
      }
    }

    // State'i güncelle ve üst bileşene (Form'a) bildir
    const updatedImages = [...images, ...newUrls];
    setImages(updatedImages);
    onImagesChange(updatedImages); // Form verisine yansıması için
    
    setIsUploading(false);
    // Input'u temizle ki aynı dosyayı tekrar seçebilelim
    e.target.value = "";
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      
      {/* Yükleme Alanı */}
      <div className="border-2 border-dashed border-stone-300 rounded-sm p-6 text-center hover:bg-stone-50 transition-colors relative">
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        <div className="flex flex-col items-center gap-2">
            {isUploading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-900"></div>
            ) : (
                <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            )}
            <p className="text-sm font-bold text-stone-600 uppercase tracking-wide">
                {isUploading ? "Uploading..." : "Click or Drag images here"}
            </p>
            <p className="text-[10px] text-stone-400">JPG, PNG, WEBP supported</p>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

      {/* Önizleme Alanı */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group aspect-square bg-stone-100 rounded border border-stone-200 overflow-hidden">
              <Image 
                src={url} 
                alt="Product" 
                fill 
                className="object-cover" 
              />
              {/* Silme Butonu */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-white/90 text-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}