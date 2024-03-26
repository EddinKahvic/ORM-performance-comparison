import { Request, Response } from 'express'
import { owners, pets, types } from '../../Entities/init-models'

export const UpdateSimple = async (req: Request, res: Response) => {
  try {
    const owner = await owners.update(
      {
        address: '789 Maple St.',
      },
      {
        where: {
          id: 4,
        },
      }
    )

    req.stop()
    res.json(owner)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const UpdateAdvanced = async (req: Request, res: Response) => {
  try {
    const myPets = pets
      .findAll({
        include: [
          {
            model: types,
            as: 'type',
            where: { name: 'cat' },
          },
          {
            model: owners,
            as: 'owner',
            where: {
              first_name: 'George',
              last_name: 'Franklin',
            },
          },
        ],
      })
      .then((pets) => {
        pets.map((pet) => {
          pet.birth_date = '2005-01-01'
          pet.save()
        })
      })

    req.stop()
    res.json(myPets)
  } catch (error) {
    res.status(500).json(error)
  }
}
