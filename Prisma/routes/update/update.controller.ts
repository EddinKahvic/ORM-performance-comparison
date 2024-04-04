import { Request, Response } from 'express'
import { prisma } from '../../prisma'

export const UpdateSimple = async (req: Request, res: Response) => {
  try {
    const owner = await prisma.owners.findFirst({
      where: {
        first_name: 'Harold',
        last_name: 'Davis',
        NOT: {
          address: '789 Maple St.',
        },
      },
    })

    if (owner === null) return res.status(404).send()

    const updateSimple = await prisma.owners.update({
      where: {
        id: owner.id,
      },
      data: {
        address: '789 Maple St.',
      },
    })

    req.stop()
    res.json(updateSimple)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const UpdateAdvanced = async (req: Request, res: Response) => {
  try {
    const pet = await prisma.pets.findFirst({
      where: {
        types: {
          name: 'cat',
        },
        owners: {
          first_name: 'George',
          last_name: 'Franklin',
        },
        NOT: {
          birth_date: new Date('2005-01-01'),
        },
      },
    })

    if (pet === null) return res.status(404).send()

    const updateAdvanced = await prisma.pets.update({
      where: {
        id: pet.id,
      },
      data: {
        birth_date: new Date('2005-01-01'),
      },
    })

    req.stop()
    res.json(updateAdvanced)
  } catch (error) {
    res.status(500).json(error)
  }
}
