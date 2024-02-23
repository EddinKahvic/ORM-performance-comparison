import {Request, Response} from "express"
import { pets } from "../../Entities/pets"

export const CreateSimple = async (req:Request, res:Response) => {
  try {
    pets.create({
      name:"Fluffy",
      birth_date:"2005-05-12", 
      type_id:1, 
      owner_id:2 
    })
    res.json(201)
  } catch (error) {
    console.log("Could not create entity pet with name 'Fluffy': ", error)
  }
}

export const CreateAdvanced = async (req:Request, res:Response) => {
  try {
    pets.bulkCreate([
      {
        name:"Buddy",
        birth_date:"2010-01-15", 
        type_id:2, 
        owner_id:4 
      },
      {
        name:"Tweety",
        birth_date:"2013-04-22", 
        type_id:5, 
        owner_id:4 
      }
    ])
    res.json(201)
  } catch (error) {
    console.log("Could not create entities pets with names 'Buddy' and 'Tweety': ", error)
  }
}