import { Request, Response } from 'express'
import { pets } from '../../Entities/pets'

export const CreateSimple = async (req: Request, res: Response) => {
  try {
    pets.create({
      name: 'Fluffy',
      birth_date: '2005-05-12',
      type_id: 1,
      owner_id: 2,
    })

    req.stop()
    res.json(201)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const CreateAdvanced = async (req: Request, res: Response) => {
  try {
    pets.bulkCreate([
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

    req.stop()
    res.json(201)
  } catch (error) {
    res.status(500).json(error)
  }
}
