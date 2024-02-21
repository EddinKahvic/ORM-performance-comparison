import { defineConfig } from '@mikro-orm/mysql'
import {
  DatabaseHost,
  DatabaseName,
  DatabasePassword,
  DatabasePort,
  DatabaseUser,
} from '../helpers/environment'
import { Pets } from './Entities/Pets'

export default defineConfig({
  user: DatabaseUser,
  dbName: DatabaseName,
  host: DatabaseHost,
  port: DatabasePort,
  password: DatabasePassword,
  entities: [Pets],
})
