import { EntityManager, MikroORM } from '@mikro-orm/mysql'

interface IConnectionState {
  orm?: MikroORM
  em?: EntityManager
}

const ConnectionState: IConnectionState = {}

async function connect() {
  ConnectionState.orm = await MikroORM.init()

  return (ConnectionState.em = ConnectionState.orm.em)
}

export async function closeConnection() {
  await ConnectionState.orm?.close()

  ConnectionState.orm = undefined
  ConnectionState.em = undefined
}

export async function getEntityManager() {
  if (ConnectionState.em != null) return ConnectionState.em.fork()

  await connect()

  return await getEntityManager()
}
