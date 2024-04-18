import express from 'express'
import { InitializeModels } from './Sequelize'
import MikroORMRoutes from './MikroORM'
import { MemoryUsageMiddleware } from './helpers/middlewares'
import { setFlagsFromString } from 'v8'

setFlagsFromString('--trace-gc')

// Extend Express Request interface
declare module 'express-serve-static-core' {
  interface Request {
    stop: () => void
  }
}

// Ensure that gc function is exposed
if (global.gc === undefined) {
  throw "Function global.gc() is not exposed, is the script ran with '--expose-gc' flag?"
}

const app = express()
const PORT = parseInt(process.env.PORT ?? '5000')

//Initialize Sequelize models
InitializeModels()

app.use(express.json())
app.use(MemoryUsageMiddleware)

// Routes
app.use('/prisma/read', require('./Prisma/routes/read/read.routes'))
app.use('/prisma/create', require('./Prisma/routes/create/create.routes'))
app.use('/prisma/update', require('./Prisma/routes/update/update.routes'))
app.use('/prisma/delete', require('./Prisma/routes/delete/delete.routes'))

app.use('/sequelize/read', require('./Sequelize/routes/read/read.routes'))
app.use('/sequelize/create', require('./Sequelize/routes/create/create.routes'))
app.use('/sequelize/update', require('./Sequelize/routes/update/update.routes'))
app.use('/sequelize/delete', require('./Sequelize/routes/delete/delete.routes'))

app.use('/mikroorm/create/', MikroORMRoutes.CreateRouter)
app.use('/mikroorm/read/', MikroORMRoutes.ReadRouter)
app.use('/mikroorm/update/', MikroORMRoutes.UpdateRouter)
app.use('/mikroorm/delete/', MikroORMRoutes.DeleteRouter)

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
