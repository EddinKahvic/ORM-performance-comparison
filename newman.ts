import MemoryUsage from './helpers/memoryUsage'
import * as fs from 'fs/promises'
import newman from 'newman'
import { z } from "zod"

const Iterations = z.number().positive()
const Library = z.enum(["MikroORM", "Prisma", "Sequelize"])
const Operation = z.enum(["Create", "Read", "Update", "Delete"])
const Query = z.enum(["Simple", "Advanced"])

const [, , iters, library, operation, query] = process.argv

const iterations = parseInt(iters) ?? -1

validateArguments()

const outputFile = `./Results/${library}/${operation}/${library}-${operation}-${query}-${iterations}.csv`
const collectionPath = `./Collections/${library}/${library}-${operation}-${query}.json`

newman.run(
  {
    collection: require(collectionPath),
    reporters: 'csv',
    iterationCount: iterations,
    reporter: {
      csv: {
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

      const usages = await MemoryUsage.GetMemoryUsages()

      const data = await fs.readFile(outputFile, 'utf8')

      const rows = data.trim().split('\n')

      for (let i = 0; i < rows.length; i++) {
        if (i === 0) {
          const newRow = `${rows[i].trim()},memoryUsage`
          rows[i] = newRow
        } else {
          const usage = usages[i - 1] || '0'
          const newRow = `${rows[i].trim()},"${usage}"`
          rows[i] = newRow
        }
      }

      const updatedCSV = rows.join('\n')

      await fs.writeFile(outputFile, updatedCSV, 'utf8')

      console.log('Memory usage data added to CSV file.')
      await MemoryUsage.ClearMemoryUsages()
    }
  }
)

function validateArguments() {
  if (!Iterations.safeParse(iterations).success) {
    throw "Invalid iterations argument"
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
  return `${entry} is not type of ${Object.keys(types.Values).join(" | ")}`
}