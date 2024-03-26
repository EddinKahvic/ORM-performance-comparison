import { Request, Response } from 'express'
import { prisma } from '../../prisma'

export const ReadSimple = async (req: Request, res: Response) => {
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

export const ReadAdvanced = async (req: Request, res: Response) => {
  try {
    const readAdvanced = await prisma.pets.findMany({
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
    res.json(readAdvanced)
  } catch (error) {
    res.status(500).json(error)
  }
}
