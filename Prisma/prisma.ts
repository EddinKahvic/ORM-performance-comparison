import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createSimple() {
  await prisma.pets.create({
    data: {
      name: 'Fluffy',
      birth_date: new Date('2005-05-12'),
      type_id: 1,
      owner_id: 2,
    },
  })
  const allPets = await prisma.pets.findMany({})
  console.log(allPets)
}
