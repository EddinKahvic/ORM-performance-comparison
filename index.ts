import {TestConnection, InitializeModels} from './Sequelize'
import express from "express"

const app = express()
const PORT = parseInt(process.env.PORT ?? '5000')
TestConnection()
InitializeModels()

app.use(express.json())

// Routes
app.use("/sequelize/read", require('./Sequelize/routes/read/read.routes') )
app.use("/sequelize/create", require('./Sequelize/routes/create/create.routes'))
app.use("/sequelize/update", require('./Sequelize/routes/update/update.routes'))
app.use("/sequelize/delete", require('./Sequelize/routes/delete/delete.routes'))

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})