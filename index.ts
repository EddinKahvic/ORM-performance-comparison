import express from 'express'
import { InitializeModels } from './Sequelize'
import MikroORMRoutes from './MikroORM'

const app = express()
const PORT = parseInt(process.env.PORT ?? '5000')

//Initialize Sequelize models
InitializeModels()

app.use(express.json())

// Routes
app.use('/prisma/read', require('./prisma/routes/read/read.routes'))
app.use('/prisma/create', require('./prisma/routes/create/create.routes'))
app.use('/prisma/update', require('./prisma/routes/update/update.routes'))
app.use('/prisma/delete', require('./prisma/routes/delete/delete.routes'))

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
