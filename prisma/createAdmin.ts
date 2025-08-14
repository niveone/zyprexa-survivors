import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@example.com'
  const name = 'Admin User'
  const password = 'password123' // Use a more secure password in a real application

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log(`User with email ${email} already exists.`)
    // Optionally update the user to be an admin and set password
    const passwordHash = await bcrypt.hash(password, 10)
    await prisma.user.update({
      where: { email },
      data: {
        role: 'ADMIN',
        password: passwordHash,
      },
    })
    console.log(`User ${email} updated to ADMIN role with a new password.`)
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
      role: Role.ADMIN,
    },
  })
  console.log(`Admin user created with email: ${email}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
