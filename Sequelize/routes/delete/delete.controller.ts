import { Request, Response } from 'express'
import { visits } from '../../Entities/visits'
import { owners } from '../../Entities/owners'
import { pets } from '../../Entities/pets'

export const DeleteSimple = async (req: Request, res: Response) => {
  try {
    const deletion = visits.destroy({
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
    const deletion = owners
      .findOne({
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
      .then((owner) => {
        if (owner) {
          owner.pets.forEach((pet) => {
            pet.visits.forEach((visit) => {
              visit.destroy()
            })
          })
          console.log('Visits deleted successfully.')
        } else {
          console.log('Owner not found.')
        }
      })
      .catch((err) => {
        console.error('Error:', err)
      })

    req.stop()
    res.json(deletion)
  } catch (error) {
    res.status(500).json(error)
  }
}
