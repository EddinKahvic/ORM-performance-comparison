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
  await prisma.pets.findMany({
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

// Simple update
export async function updateSimple() {
  await prisma.owners.update({
    where: {
      id: 4,
    },
    data: {
      address: '789 Maple St.',
    },
  })
}

// Complex update
export async function updateComplex() {
  await prisma.pets.updateMany({
    where: {
      types: {
        name: 'cat',
      },
      owners: {
        first_name: 'George',
        last_name: 'Franklin',
      },
    },
    data: {
      birth_date: new Date('2005-01-01'),
    },
  })
}

// Simple delete
export async function deleteSimple() {
  await prisma.visits.delete({
    where: {
      id: 3,
    },
  })
}

// Complex delete
export async function deleteComplex() {
  await prisma.visits.deleteMany({
    where: {
      pets: {
        owners: {
          first_name: 'Jean',
          last_name: 'Coleman',
        },
      },
    },
  })
}
