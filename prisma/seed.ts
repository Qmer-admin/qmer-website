// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import { products } from '../src/lib/data' // data.ts dosyanın yeri doğru olmalı
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Seeding process started...')

  // 1. ÜRÜNLERİ EKLE
  console.log('📦 Seeding products...')
  
  for (const product of products) {
    // data.ts'deki 'id' string (örn: "aha-bha-serum") veritabanındaki ID formatına (UUID/CUID) uymazsa
    // Prisma hata verebilir. Bu yüzden ID'yi create işlemine dahil etmiyoruz, DB kendi üretsin.
    // Eşleşmeyi 'slug' üzerinden yapıyoruz.
    
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        // Ürün zaten varsa bilgilerini data.ts'den güncelle (Fiyat vs. değişirse diye)
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        images: product.images,
      },
      create: {
        slug: product.slug,
        name: product.name,
        category: product.category,
        shortDescription: product.shortDescription,
        description: product.description,
        price: product.price,
        currency: product.currency,
        amazonLink: product.amazonLink,
        images: product.images,
        features: product.features,
        stock: product.stock,
        isNew: product.isNew,
      },
    })
  }
  console.log(`✅ ${products.length} products seeded.`)

  // 2. ADMIN KULLANICISINI EKLE
  console.log('👤 Seeding admin user...')
  
  const hashedPassword = await bcrypt.hash('Admin123!', 10)

  // Upsert kullanarak: Varsa şifresini güncelle, yoksa oluştur.
  await prisma.user.upsert({
    where: { email: 'admin@qmer.us' },
    update: {
      password: hashedPassword,
      role: 'ADMIN', // Enum yerine String olarak güvenli geçiş
      name: 'Burak Taskin'
    },
    create: {
      email: 'admin@qmer.us',
      name: 'Burak Taskin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  
  console.log('✅ Admin user seeded (admin@qmer.us).')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed Error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })