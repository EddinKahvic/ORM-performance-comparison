import { Request, Response } from 'express'
import { Pets } from '../../Entities/Pets'
import { Owners } from '../../Entities/Owners'
import { closeConnection, getEntityManager } from '../../mikroorm'

export async function UpdateSimple(req: Request, res: Response) {
  try {
    const entityManager = await getEntityManager()

    const owner = await entityManager.findOne(Owners, 4)

    if (owner === null) return // Throw error??

    owner.address = '789 Maple St.'

    await entityManager.flush()
    await closeConnection()

    res.status(204).send('Updated')
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function UpdateAdvanced(req: Request, res: Response) {
  try {
    const entityManager = await getEntityManager()

    const pets = await entityManager.findAll(Pets, {
      where: {
        owner: {
          $and: [{ firstName: 'George' }, { lastName: 'Franklin' }],
        },
        type: {
          name: 'cat',
        },
      },
    })

    pets.map((pet) => {
      pet.birthDate = '2005-01-01'
    })

    await entityManager.flush()
    await closeConnection()

    res.status(204).send('Updated')
  } catch (error) {
    res.status(500).send(error)
  }
}
