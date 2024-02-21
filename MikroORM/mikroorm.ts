import { EntityManager, MikroORM } from '@mikro-orm/mysql'
import { Pets } from './Entities/Pets'

interface IConnectionState {
  orm?: MikroORM
  em?: EntityManager
}

const ConnectionState: IConnectionState = {}

async function connect() {
  ConnectionState.orm = await MikroORM.init()
  ConnectionState.em = ConnectionState.orm.em
}

async function close() {
  await ConnectionState.orm?.close()

  ConnectionState.orm = undefined
  ConnectionState.em = undefined
}

async function getEntityManager() {
  if (ConnectionState.em != null) return ConnectionState.em

  await connect()

  return ConnectionState.em
}

export async function CreateSimple() {
  const entityManager = await getEntityManager()
  const em = entityManager?.fork()

  if (em === undefined) return

  const fluffy = em.create(Pets, {
    name: 'Fluffy',
    birthDate: '2005-05-12',
    type: 1,
    owner: 2,
  })

  await em.persistAndFlush(fluffy)

  await close()
}

export async function CreateAdvanced() {
  const entityManager = await getEntityManager()
  const em = entityManager?.fork()

  if (em === undefined) return

  const buddy = em.create(Pets, {
    name: 'Buddy',
    birthDate: '2010-01-15',
    type: 2,
    owner: 4,
  })

  const tweety = em.create(Pets, {
    name: 'Tweety',
    birthDate: '2013-04-22',
    type: 5,
    owner: 4,
  })

  await em.persistAndFlush([buddy, tweety])

  await close()
}

export async function ReadSimple() {
  const entityManager = await getEntityManager()
  const em = entityManager?.fork()

  if (em === undefined) return

  const pet = await em.findOne(Pets, 6)

  await close()
}

export async function ReadAdvanced() {
  const entityManager = await getEntityManager()
  const em = entityManager?.fork()

  if (em === undefined) return

  const pet = await em.findOne(
    Pets,
    {
      owner: {
        $and: [{ firstName: 'Eduardo' }, { lastName: 'Rodriquez' }],
      },
    },
    { populate: ['type', 'owner'] }
  )

  await close()
}
export async function Update() {}
export async function Delete() {}
