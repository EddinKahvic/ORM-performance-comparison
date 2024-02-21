import { Sequelize } from "sequelize";
import { 
  DatabaseName, 
  DatabaseHost, 
  DatabasePort, 
  DatabaseUser, 
  DatabasePassword 
} from "../helpers/environment";
import { initModels} from "./Entities/init-models"

export const sequelize = new Sequelize({
  dialect: 'mysql',
  database: DatabaseName,
  username: DatabaseUser,
  password: DatabasePassword,
  host: DatabaseHost,
  port: DatabasePort
})

export const TestConnection  = async () =>{
  try{
    await sequelize.authenticate();
    console.log("Successfully connected to database")
  } catch(error)
  {
    console.log("Error connection to database: ", error)
  }
}

export const InitializeModels = () => {
  initModels(sequelize)
}