import { Request, Response } from 'express'
import { prisma } from '../../prisma'

export const DeleteSimple = async (req: Request, res: Response) => {
  try {
    const visit = await prisma.visits.findFirst({
      where: {
        visit_date: new Date('2010-03-05'),
      },
    })

    if (visit === null) return res.status(404).send()

    const deleteSimple = await prisma.visits.delete({
      where: {
        id: visit.id,
      },
    })

    req.stop()
    res.json(deleteSimple)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const DeleteAdvanced = async (req: Request, res: Response) => {
  try {
    const pets = await prisma.pets.findMany({
      where: {
        owners: {
          first_name: 'Jean',
          last_name: 'Coleman',
        },
      },
    })

    pets.map(async (pet) => {
      const visit = await prisma.visits.findFirst({
        where: {
          pet_id: pet.id,
        },
      })

      if (visit === null) return res.status(404).send()

      console.log(visit)
      await prisma.visits.delete({
        where: {
          id: visit.id,
        },
      })
    })

    req.stop()
    res.status(204).send()
  } catch (error) {
    res.status(500).json(error)
  }
}
