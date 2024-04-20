import { Request, Response } from 'express'
import { visits } from '../../Entities/visits'
import { owners } from '../../Entities/owners'
import { pets } from '../../Entities/pets'

export const DeleteSimple = async (req: Request, res: Response) => {
  try {
    const deletion = await visits.findOne({
      where: {
        visit_date: '2010-03-05',
      },
    })

    if (deletion !== null) {
      deletion.destroy()
    } else {
      res.status(404).send()
    }

    req.stop()
    res.json(deletion)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const DeleteAdvanced = async (req: Request, res: Response) => {
  try {
    const allPets = await pets.findAll({
      include: [
        {
          model: owners,
          as: 'owner',
          where: {
            first_name: 'Jean',
            last_name: 'Coleman',
          },
        },
        {
          model: visits,
          as: 'visits',
          required: true,
        },
      ],
    })

    if (allPets.length === 0) return res.status(404).send()

    allPets.map(async (pet) => {
      const visit = await visits.findOne({
        where: {
          pet_id: pet.id,
        },
      })

      await visit!.destroy()
    })

    req.stop()
    res.status(200).json({})
  } catch (error) {
    res.status(500).json(error)
  }
}
