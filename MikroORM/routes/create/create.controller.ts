import { Request, Response } from 'express'
import { Pets } from '../../Entities/Pets'
import { getEntityManager, closeConnection } from '../../mikroorm'

export async function CreateSimple(req: Request, res: Response) {
  try {
    const entityManager = await getEntityManager()

    const fluffy = entityManager.create(Pets, {
      name: 'Fluffy',
      birthDate: '2005-05-12',
      type: 1,
      owner: 2,
    })

    await entityManager.persistAndFlush(fluffy)
    await closeConnection()

    req.stop()
    res.status(201).send("Created pet 'Fluffy'")
  } catch (error) {
    res.status(500).send("Could not create entity with name 'Fluffy': " + error)
  }
}

export async function CreateAdvanced(req: Request, res: Response) {
  try {
    const entityManager = await getEntityManager()

    const buddy = entityManager.create(Pets, {
      name: 'Buddy',
      birthDate: '2010-01-15',
      type: 2,
      owner: 4,
    })

    const tweety = entityManager.create(Pets, {
      name: 'Tweety',
      birthDate: '2013-04-22',
      type: 5,
      owner: 4,
    })

    await entityManager.persistAndFlush([buddy, tweety])
    await closeConnection()

    req.stop()
    res.status(201).send("Created pets 'Buddy' and 'Tweety'")
  } catch (error) {
    res
      .status(500)
      .send(
        "Could not create entities pets with names 'Buddy' and 'Tweety': " +
          error
      )
  }
}
