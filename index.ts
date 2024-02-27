import express from 'express'
import { InitializeModels } from './Sequelize'
import {
  CreateRouter,
  ReadRouter,
  UpdateRouter,
  DeleteRouter,
} from './MikroORM'

const app = express()
const PORT = parseInt(process.env.PORT ?? '5000')

//Initialize Sequelize models
InitializeModels()

app.use(express.json())

// Routes
app.use('/sequelize/read', require('./Sequelize/routes/read/read.routes'))
app.use('/sequelize/create', require('./Sequelize/routes/create/create.routes'))
app.use('/sequelize/update', require('./Sequelize/routes/update/update.routes'))
app.use('/sequelize/delete', require('./Sequelize/routes/delete/delete.routes'))

app.use('/mikroorm/create/', CreateRouter)
app.use('/mikroorm/read/', ReadRouter)
app.use('/mikroorm/update/', UpdateRouter)
app.use('/mikroorm/delete/', DeleteRouter)

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
