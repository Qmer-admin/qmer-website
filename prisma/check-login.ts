import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function check() {
  console.log('🔍 Checking admin user...')
  
  const user = await prisma.user.findUnique({
    where: { email: 'admin@qmer.us' }
  })

  if (!user) {
    console.error('❌ Admin user NOT FOUND in database!')
    return
  }

  console.log('✅ User found:', user.email)
  console.log('🔑 Testing password "Admin123!"...')

  const isValid = await bcrypt.compare('Admin123!', user.password)

  if (isValid) {
    console.log('✅ SUCCESS: Password matches! Database is correct.')
  } else {
    console.error('❌ FAILURE: Password does NOT match hash in DB.')
  }
}

check()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
  })