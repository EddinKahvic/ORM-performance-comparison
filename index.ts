import { SomeFunction } from './MikroORM'
import express from 'express'

const app = express()
app.use(express.json())

app.use('/prisma/read', require('./prisma/routes/read/read.routes'))
app.use('/prisma/create', require('./prisma/routes/create/create.routes'))
app.use('/prisma/update', require('./prisma/routes/update/update.routes'))
app.use('/prisma/delete', require('./prisma/routes/delete/delete.routes'))

app.listen(5000, () => {
  console.log('Server running on port 5000')
})
