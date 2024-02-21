import { defineConfig } from '@mikro-orm/mysql'
import {
  DatabaseHost,
  DatabaseName,
  DatabasePassword,
  DatabasePort,
  DatabaseUser,
} from '../helpers/environment'

export default defineConfig({
  user: DatabaseUser,
  dbName: DatabaseName,
  host: DatabaseHost,
  port: DatabasePort,
  password: DatabasePassword,
  entities: ['MikroORM/Entities'],
})
