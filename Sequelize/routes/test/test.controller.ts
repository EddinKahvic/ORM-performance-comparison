import {Request, Response} from "express"
import { pets} from "../../Entities/init-models"

export const GetPetById = async (req:Request, res:Response) => {
  try{
    const myPets = await pets.findOne({
      where: {
        id: 6
      }
    })
    res.json(myPets)
  } catch (err) {
    res.status(500).json(err)
  }
}