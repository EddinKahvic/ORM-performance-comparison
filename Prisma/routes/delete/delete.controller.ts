import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getSimple = async (req: Request, res: Response) => {
  try {
    const deleteSimple = await prisma.visits.delete({
      where: {
        id: 3,
      },
    })
    res.json(deleteSimple)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getComplex = async (req: Request, res: Response) => {
  try {
    const deleteComplex = await prisma.visits.deleteMany({
      where: {
        pets: {
          owners: {
            first_name: 'Jean',
            last_name: 'Coleman',
          },
        },
      },
    })
    res.json(deleteComplex)
  } catch (error) {
    res.status(500).json(error)
  }
}
