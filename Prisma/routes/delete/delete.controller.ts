import { Request, Response } from 'express'
import { prisma } from '../../prisma'

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

export const getAdvanced = async (req: Request, res: Response) => {
  try {
    const deleteAdvanced = await prisma.visits.deleteMany({
      where: {
        pets: {
          owners: {
            first_name: 'Jean',
            last_name: 'Coleman',
          },
        },
      },
    })
    res.json(deleteAdvanced)
  } catch (error) {
    res.status(500).json(error)
  }
}
