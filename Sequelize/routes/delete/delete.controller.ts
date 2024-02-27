import {Request, Response} from "express"
import { visits } from "../../Entities/visits"

export const DeleteSimple = async (req: Request, res: Response) => {
  try {
  const deletion = visits.destroy({
    where: {
      id: 3
    }
  })      
  res.json(deletion)
  } catch (error) {
    res.status(500).json(error)
  }
}


export const DeleteAdvanced = async (req: Request, res: Response) => {

}
