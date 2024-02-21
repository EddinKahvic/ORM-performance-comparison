import { EntityManager, MikroORM } from '@mikro-orm/mysql'
import { MySqlMikroORM } from '@mikro-orm/mysql/MySqlMikroORM'

interface IConnectionState {
  orm?: MySqlMikroORM
  em?: EntityManager
}

const ConnectionState: IConnectionState = {}

async function connect() {
  const connection = await MikroORM.init()

  ConnectionState.orm = connection
  ConnectionState.em = connection.em

  return connection
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

export async function Create() {}
export async function Read() {}
export async function Update() {}
export async function Delete() {}
