import express from 'express'
import { MikroORMRouter } from './MikroORM'

const app = express()

app.use(express.json())

app.use('/mikroorm/', MikroORMRouter)

app.listen(5000, () => {
  console.log('Server running on port 5000')
})
