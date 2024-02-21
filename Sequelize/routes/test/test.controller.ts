import {Request, Response} from "express"
import { pets} from "../../Entities/init-models"

export const getTest = async (req:Request, res:Response) => {
  try{
    const myPets = await pets.findAll()
    res.json(myPets)
  } catch (err) {
    res.status(500).json(err)
  }
}