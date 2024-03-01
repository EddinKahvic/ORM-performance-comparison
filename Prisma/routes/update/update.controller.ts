import { Request, Response } from 'express'
import { prisma } from '../../prisma'

export const getSimple = async (req: Request, res: Response) => {
  try {
    const updateSimple = await prisma.owners.update({
      where: {
        id: 4,
      },
      data: {
        address: '789 Maple St.',
      },
    })
    res.json(updateSimple)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getAdvanced = async (req: Request, res: Response) => {
  try {
    const updateAdvanced = await prisma.pets.updateMany({
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
    res.json(updateAdvanced)
  } catch (error) {
    res.status(500).json(error)
  }
}
