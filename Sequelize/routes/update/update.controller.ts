import {Request, Response} from "express"
import { owners} from "../../Entities/init-models"

export const UpdateSimple = async (req:Request, res:Response) => {
  try {
    const owner = await owners.update({ 
        address: "789 Maple St."
      }, 
      {
        where: {
          id: 4
        }
      },)
    res.json(owner)
  } catch (error) {
    res.status(500).json(error)
  }
}