import { SomeFunction } from './MikroORM'
import {TestConnection, InitializeModels} from './Sequelize'
import express from "express"

const app = express()
TestConnection()
InitializeModels()

app.use(express.json())

app.use("/sequelize/pets", require('./Sequelize/routes/read/read.routes') )

app.listen(5000, () =>{
  console.log("Server running on port 5000")
})