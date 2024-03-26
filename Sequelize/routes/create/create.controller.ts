import { Request, Response } from 'express'
import { pets } from '../../Entities/pets'

export const CreateSimple = async (req: Request, res: Response) => {
  try {
    const pet = await pets.create({
      name: 'Fluffy',
      birth_date: '2005-05-12',
      type_id: 1,
      owner_id: 2,
    })
    res.json(pet)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const CreateAdvanced = async (req: Request, res: Response) => {
  try {
    const bulkPets = await pets.bulkCreate([
      {
        name: 'Buddy',
        birth_date: '2010-01-15',
        type_id: 2,
        owner_id: 4,
      },
      {
        name: 'Tweety',
        birth_date: '2013-04-22',
        type_id: 5,
        owner_id: 4,
      },
    ])
    res.json(bulkPets)
  } catch (error) {
    res.status(500).json(error)
  }
}
