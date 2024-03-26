import { Request, Response } from 'express'
import { Pets } from '../../Entities/Pets'
import { closeConnection, getEntityManager } from '../../mikroorm'

export async function ReadSimple(req: Request, res: Response) {
  try {
    const entityManager = await getEntityManager()

    const pet = await entityManager.findOne(Pets, 6)
    await closeConnection()
    req.stop()

    res.json(pet)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function ReadAdvanced(req: Request, res: Response) {
  try {
    const entityManager = await getEntityManager()

    const pet = await entityManager.findOne(
      Pets,
      {
        owner: {
          $and: [{ firstName: 'Eduardo' }, { lastName: 'Rodriquez' }],
        },
      },
      { fields: ['name', 'birthDate', 'type.name'] }
    )

    await closeConnection()

    res.json(pet)
  } catch (error) {
    res.status(500).send(error)
  }
}
