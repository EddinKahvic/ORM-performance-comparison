import { config } from 'dotenv'

config()

export const DatabaseName = process.env.DATABASE_NAME
export const DatabaseHost = process.env.DATABASE_HOST
export const DatabasePort = parseInt(process.env.DATABASE_PORT ?? '3306')
export const DatabaseUser = process.env.DATABASE_USER
export const DatabasePassword = process.env.DATABASE_PASSWORD

const variablesToValidate = {
  DatabaseName,
  DatabaseHost,
  DatabaseUser,
  DatabasePassword,
}

for (let [variable, value] of Object.entries(variablesToValidate)) {
  if (value === undefined) {
    console.log(variable, 'is not set')
    throw 'Environment Helper error. Have you created the required .env file?'
  }
}
