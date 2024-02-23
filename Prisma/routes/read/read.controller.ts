import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getSimple = async (req: Request, res: Response) => {
  try {
    const readSimple = await prisma.pets.findUnique({
      where: {
        id: 6,
      },
    })
    res.json(readSimple)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getComplex = async (req: Request, res: Response) => {
  try {
    const readComplex = await prisma.pets.findMany({
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
    res.json(readComplex)
  } catch (error) {
    res.status(500).json(error)
  }
}
