import MemoryUsage from './helpers/memoryUsage'
import * as fs from 'fs/promises'
import newman from 'newman'
import { z } from 'zod'

const Iterations = z.number().positive()
const Library = z.enum(['MikroORM', 'Prisma', 'Sequelize'])
const Operation = z.enum(['create', 'read', 'update', 'delete'])
const Query = z.enum(['simple', 'advanced'])

const [, , iters, library, operation, query] = process.argv

const iterations = parseInt(iters) ?? -1

validateArguments()

const outputFile = `./Results/${library}/${operation}/${library}-${operation}-${query}-${iterations}.json`
const collectionPath = `./Collections/${library}/${library}-${operation}-${query}.json`

newman.run(
  {
    collection: require(collectionPath),
    reporters: 'json',
    iterationCount: iterations,
    reporter: {
      json: {
        export: outputFile,
        responseTime: true,
      },
    },
  },
  async function (err: any) {
    if (err) {
      console.error('Postman collection run failed:', err)
    } else {
      console.log(
        `Postman collection run completed successfully. Response times saved to ${outputFile}`
      )

      const data = await fs.readFile(outputFile, 'utf8')
      const jsonData = JSON.parse(data)

      const memoryUsage = await MemoryUsage.GetMemoryUsages()

      const responseTimes = jsonData['run']['executions'].map(
        (exe: any) => exe['response']['responseTime']
      )

      const dataToWrite = { memoryUsage, responseTimes }

      await fs.writeFile(outputFile, JSON.stringify(dataToWrite), 'utf8')

      console.log('Memory usage data added to JSON file.')
      await MemoryUsage.ClearMemoryUsages()
    }
  }
)

function validateArguments() {
  if (!Iterations.safeParse(iterations).success) {
    throw 'Invalid iterations argument'
  }

  if (!Library.safeParse(library).success) {
    throw `Invalid library argument: ${errorMessage(library, Library)}`
  }

  if (!Operation.safeParse(operation).success) {
    throw `Invalid operation argument: ${errorMessage(operation, Operation)}`
  }

  if (!Query.safeParse(query).success) {
    throw `Invalid query argument: ${errorMessage(query, Query)}`
  }
}

function errorMessage(entry: string, types: z.ZodEnum<any>) {
  return `${entry} is not type of ${Object.keys(types.Values).join(' | ')}`
}
