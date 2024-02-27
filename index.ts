import { SomeFunction } from './MikroORM'
import {TestConnection, InitializeModels} from './Sequelize'
import express from "express"

const app = express()
TestConnection()
InitializeModels()

app.use(express.json())

app.use("/sequelize/read", require('./Sequelize/routes/read/read.routes') )
app.use("/sequelize/create", require('./Sequelize/routes/create/create.routes'))
app.use("/sequelize/update", require('./Sequelize/routes/update/update.routes'))
app.use("/sequelize/delete", require('./Sequelize/routes/delete/delete.routes'))

app.listen(5000, () =>{
  console.log("Server running on port 5000")
})