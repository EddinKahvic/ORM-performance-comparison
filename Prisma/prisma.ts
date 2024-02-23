import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'],
})

// Simple insert
export async function createSimple() {
  await prisma.pets.create({
    data: {
      name: 'Fluffy',
      birth_date: new Date('2005-05-12'),
      type_id: 1,
      owner_id: 2,
    },
  })
}

// Complex insert
export async function createComplex() {
  await prisma.pets.createMany({
    data: [
      {
        name: 'Buddy',
        birth_date: new Date('2010-01-15'),
        type_id: 2,
        owner_id: 4,
      },
      {
        name: 'Tweety',
        birth_date: new Date('2013-04-22'),
        type_id: 5,
        owner_id: 4,
      },
    ],
  })
}

// Simple read
export async function readSimple() {
  await prisma.pets.findUnique({
    where: {
      id: 6,
    },
  })
}

// Complex read
export async function readComplex() {
  const testing = await prisma.pets.findMany({
    select: {
      name: true,
      birth_date: true,
      types: {
        select: {
          name: true,
        },
      },
    },
    where: {
      owners: {
        first_name: 'Eduardo',
        last_name: 'Rodriquez',
      },
    },
  })
}
