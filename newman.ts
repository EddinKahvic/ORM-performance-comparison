import MemoryUsage from './helpers/memoryUsage'
import * as fs from 'fs'
import readline from 'readline'

const newman = require('newman')

const COLLECTION_PATH = './Collections/MikroORM/MikroORM-read-simple.json'
const OUTPUT_CSV = 'test.csv'

const [, , iterations, outputFile] = process.argv
console.log('Running', iterations, 'iterations')

newman.run(
  {
    collection: require(COLLECTION_PATH),
    reporters: 'csv',
    iterationCount: parseInt(iterations) ?? 100,
    reporter: {
      csv: {
        export: OUTPUT_CSV,
        responseTime: true,
      },
    },
  },
  async function (err: any) {
    if (err) {
      console.error('Postman collection run failed:', err)
    } else {
      console.log(
        `Postman collection run completed successfully. Response times saved to ${OUTPUT_CSV}`
      )

      const csvStream = fs.createReadStream('test.csv')
      const reader = readline.createInterface({
        input: csvStream,
      })

      const usages = await MemoryUsage.GetMemoryUsages()
      console.log(usages)
      await MemoryUsage.ClearMemoryUsages()
    }
  }
)
