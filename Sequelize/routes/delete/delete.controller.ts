import { Request, Response } from 'express'
import { visits } from '../../Entities/visits'
import { owners } from '../../Entities/owners'
import { pets } from '../../Entities/pets'

export const DeleteSimple = async (req: Request, res: Response) => {
  try {
    const deletion = await visits.destroy({
      where: {
        id: 3,
      },
    })

    req.stop()
    res.json(deletion)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const DeleteAdvanced = async (req: Request, res: Response) => {
  try {
    const owner = await owners.findOne({
      where: {
        first_name: 'Jean',
        last_name: 'Coleman',
      },
      include: {
        model: pets,
        as: 'pets',
        include: [
          {
            model: visits,
            as: 'visits',
          },
        ],
      },
    })

    if (owner !== null) {
      owner.pets.forEach(async (pet) => {
        pet.visits.forEach(async (visit) => {
          await visit.destroy()
        })
      })
    } else {
      res.status(404).send()
    }

    req.stop()
    res.status(200).json({})
  } catch (error) {
    res.status(500).json(error)
  }
}
