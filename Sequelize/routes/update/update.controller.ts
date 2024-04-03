import { Request, Response } from 'express'
import { owners, pets, types } from '../../Entities/init-models'
import { Op } from 'sequelize'

export const UpdateSimple = async (req: Request, res: Response) => {
  try {
    const owner = await owners.findOne(
      {
        where: {
          first_name: 'Harold',
          last_name: 'Davis',
          address:{[Op.ne]: '789 Maple St.' }
        },
      })

    if(owner){
      owner.address = '789 Maple St.'
      owner.save()
    } else {
      console.log('No owner found with name Harold Davis that requires updating');
    }

    req.stop()
    res.json(owner)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const UpdateAdvanced = async (req: Request, res: Response) => {
  try {
    const petToUpdate = await pets.findOne({
      include: [
        {
          model: types,
          as: 'type',
          where: { name: 'cat' },
        },
        {
          model: owners,
          as: 'owner',
          where: {
            first_name: 'George',
            last_name: 'Franklin',
          },
        },
      ],
      where: {
        birth_date: { [Op.ne]: '2005-01-01' } 
      }
    })
    
    if (petToUpdate) {
      petToUpdate.birth_date = '2005-01-01';
      await petToUpdate.save();
    } else {
      console.log('No cat found for George Franklin that requires updating');
    }


    req.stop()
    res.json(petToUpdate)
  } catch (error) {
    res.status(500).json(error)
  }
}
