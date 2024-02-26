import { Request, Response } from 'express'

export async function DeleteSimple(req: Request, res: Response) {
  res.status(404).send('')
}

export async function DeleteAdvanced(req: Request, res: Response) {
  res.status(404).send('')
}
