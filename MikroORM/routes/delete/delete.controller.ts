import { Request, Response } from 'express'
import { closeConnection, getEntityManager } from '../..'
import { Visits } from '../../Entities/Visits'

export async function DeleteSimple(req: Request, res: Response) {
  try {
    const entityManager = await getEntityManager()

    await entityManager.nativeDelete(Visits, 3)

    await entityManager.flush()
    await closeConnection()

    res.status(204).send('Deleted')
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function DeleteAdvanced(req: Request, res: Response) {
  try {
    const entityManager = await getEntityManager()

    const visits = await entityManager.findAll(Visits, {
      where: {
        pet: {
          owner: {
            $and: [{ firstName: 'Jean', lastName: 'Coleman' }],
          },
        },
      },
    })

    visits.forEach((visit) => entityManager.remove(visit))

    await entityManager.flush()
    await closeConnection()

    res.status(204).send('Deleted')
  } catch (error) {
    res.status(500).send(error)
  }
}
