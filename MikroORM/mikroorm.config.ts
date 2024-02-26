import { defineConfig } from '@mikro-orm/mysql'
import {
  DatabaseHost,
  DatabaseName,
  DatabasePassword,
  DatabasePort,
  DatabaseUser,
} from '../helpers/environment'
import { Pets } from './Entities/Pets'
import { Owners } from './Entities/Owners'

export default defineConfig({
  user: DatabaseUser,
  dbName: DatabaseName,
  host: DatabaseHost,
  port: DatabasePort,
  password: DatabasePassword,
  entities: [Pets, Owners],
  debug: true,
})
