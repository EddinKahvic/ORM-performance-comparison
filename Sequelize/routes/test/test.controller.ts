import {Request, Response} from "express"
import { owners, pets, types} from "../../Entities/init-models"

export const GetSimple = async (req:Request, res:Response) => {
  try{
    const myPets = await pets.findOne({
      where: {
        id: 6
      }
    })
    res.json(myPets)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const GetAdvanced = async (req:Request, res:Response) => {
  try {
    const rodriguezPets = await pets.findAll({
      attributes: ['name', 'birth_date'],
      include: [{
        model:types,
        as: "type",
        attributes: ['name']
      },
      {
        model:owners,
        as: "owner", 
        where: {
          first_name: "Eduardo",
          last_name: "Rodriquez",
        },
        attributes: []
      }]
    })

    res.json(rodriguezPets)
  } catch (error) {
    res.status(500).json(error)
  }
}