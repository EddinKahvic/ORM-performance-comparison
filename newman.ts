import MemoryUsage from './helpers/memoryUsage'
import * as fs from 'fs/promises'
import newman from 'newman'

const [, , iterations = '100', library, operation, query] = process.argv

const outputFile = `./Results/${library}/${operation}/${library}-${operation}-${query}-${iterations}.csv`
const collectionPath = `./Collections/${library}/${library}-${operation}-${query}.json`

if (!validArguments()) {
  throw 'all arguments must be specified: ts-node newman.ts $iterations $library $operation $query'
}

newman.run(
  {
    collection: require(collectionPath),
    reporters: 'csv',
    iterationCount: parseInt(iterations),
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

function validArguments() {
  return [iterations, library, operation, query].some(
    (value) => value === '' || value === undefined
  )
}
