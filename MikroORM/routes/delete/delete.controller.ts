import { Request, Response } from 'express'
import { closeConnection, getEntityManager } from '../..'
import { Visits } from '../../Entities/Visits'
import { Owners } from '../../Entities/Owners'
import { Pets } from '../../Entities/Pets'

export async function DeleteSimple(req: Request, res: Response) {
  try {
    const entityManager = await getEntityManager()

    const visit = await entityManager.findOne(Visits, {
      visitDate: '2010-03-05',
    })

    if (visit !== null) {
      await entityManager.removeAndFlush(visit)
    } else {
      await closeConnection()
      return res.status(404).send()
    }

    await closeConnection()

    req.stop()
    res.status(204).send('Deleted')
  } catch (error) {
    await closeConnection()
    res.status(500).send(error)
  }
}

export async function DeleteAdvanced(req: Request, res: Response) {
  try {
    const entityManager = await getEntityManager()

    const owner = await entityManager.findOne(Owners, {
      $and: [{ firstName: 'Jean', lastName: 'Coleman' }],
    })

    if (owner === null) throw 'Owner not found'

    const pets = await entityManager.findAll(Pets, {
      where: {
        owner: owner,
      },
    })

    if (pets.length === 0) throw 'Owner has no pets'

    for (let pet of pets) {
      const visit = await entityManager.findOne(Visits, {
        pet: pet,
      })

      if (visit === null) continue

      entityManager.remove(visit)
    }

    await entityManager.flush()
    await closeConnection()

    req.stop()
    res.status(204).send('Deleted')
  } catch (error) {
    await closeConnection()
    res.status(500).send(error)
  }
}
