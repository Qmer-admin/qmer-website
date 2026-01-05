// prisma/seed.ts

import { PrismaClient, Role } from '@prisma/client'
import { products } from '../src/lib/data' // Mevcut ürün datan
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  
  // 1. ÜRÜNLERİ SEED ET (Mevcut logic)
  console.log('🌱 Seeding products...')
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {}, // Zaten varsa dokunma
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

  // 2. ADMIN KULLANICISINI SEED ET (YENİ KISIM)
  console.log('👤 Seeding admin user...')
  
  // Şifreyi hashle (Güvenlik için)
  const hashedPassword = await bcrypt.hash('Admin123!', 10) // Şifre: Admin123!

  // Önce mevcut admin varsa silelim (Temiz başlangıç için)
  try {
    await prisma.user.delete({
      where: { email: 'admin@qmer.us' }
    })
    console.log('🗑️  Old admin deleted.')
  } catch (e) {
    // Kullanıcı yoksa hata verir, önemli değil devam et
  }

  // Şimdi sıfırdan oluşturalım
  await prisma.user.create({
    data: {
      email: 'admin@qmer.us',
      name: 'Burak Taskin',
      password: hashedPassword,
      role: Role.ADMIN, // Enum kullanımı (Type-safe)
    },
  })

  console.log('✅ Seeding completed.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })