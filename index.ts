import express from 'express'
import { MikroORMRouter } from './MikroORM'

const app = express()
const PORT = parseInt(process.env.PORT ?? '5000')
app.use(express.json())

// Routes
app.use('/mikroorm/', MikroORMRouter)

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
