import { Request, Response } from 'express'
import { prisma } from '../../prisma'

export const GetSimple = async (req: Request, res: Response) => {
  try {
    const createSimple = await prisma.pets.create({
      data: {
        name: 'Fluffy',
        birth_date: new Date('2005-05-12'),
        type_id: 1,
        owner_id: 2,
      },
    })
    res.json(createSimple)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const GetAdvanced = async (req: Request, res: Response) => {
  try {
    const createAdvanced = await prisma.pets.createMany({
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
    res.json(createAdvanced)
  } catch (error) {
    res.status(500).json(error)
  }
}