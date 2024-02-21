import { MikroORM } from '@mikro-orm/mysql'
import { defineConfig } from '@mikro-orm/core'
import {
  DatabaseHost,
  DatabaseName,
  DatabasePassword,
  DatabasePort,
  DatabaseUser,
} from '../helpers/environment'
import { EntityGenerator } from '@mikro-orm/entity-generator'

const config = defineConfig({
  dbName: DatabaseName,
  host: DatabaseHost,
  port: DatabasePort,
  user: DatabaseUser,
  password: DatabasePassword,
  extensions: [EntityGenerator],
  discovery: { warnWhenNoEntities: false },
})

export async function GenerateEntities() {
  const connection = await MikroORM.init(config)

  await connection.entityGenerator.generate({
    save: true,
    path: process.cwd() + '/MikroORM/Entities',
  })

  await connection.close()
}

GenerateEntities()
  .then((_) => console.log('Generated entities'))
  .catch((error) => console.log(error))
