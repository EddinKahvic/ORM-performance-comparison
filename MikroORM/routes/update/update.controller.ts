import { Request, Response } from 'express'
import { Pets } from '../../Entities/Pets'
import { Owners } from '../../Entities/Owners'
import { closeConnection, getEntityManager } from '../../mikroorm'

export async function UpdateSimple(req: Request, res: Response) {
  try {
    const streetName = '789 Maple st.'
    const entityManager = await getEntityManager()

    const owner = await entityManager.findOne(Owners, {
      firstName: 'Harold',
      lastName: 'Davis',
      address: {
        $ne: streetName,
      },
    })

    if (owner === null) {
      await closeConnection()
      return res.status(404).send()
    }

    owner.address = streetName

    await entityManager.flush()
    await closeConnection()

    req.stop()
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
        birthDate: {
          $ne: '2005-01-01',
        },
        type: {
          name: 'cat',
        },
      },
    })

    const cat = pets.shift()

    if (cat === undefined) {
      await closeConnection()
      return res.status(404).send()
    }

    cat.birthDate = '2005-01-01'

    await entityManager.flush()
    await closeConnection()

    req.stop()
    res.status(204).send('Updated')
  } catch (error) {
    res.status(500).send(error)
  }
}
