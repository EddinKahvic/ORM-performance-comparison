import { SomeFunction } from './MikroORM'
import {TestConnection, InitializeModels} from './Sequelize'
import express, {Request, Response} from "express"
import {pets} from "./Sequelize/Entities/init-models"

const app = express()
TestConnection()
InitializeModels()

app.use(express.json())

//TEMP: fetches all pets
app.get("/sequelize/pets", async (req:Request, res:Response) =>{
  const result = await pets.findAll()
  res.json(result)
} )

app.listen(5000, () =>{
  console.log("Server running on port 5000")
})