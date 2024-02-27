import express from 'express'
import { DeleteAdvanced, DeleteSimple } from './delete.controller'

export const DeleteRouter = express.Router()

DeleteRouter.post('/simple', DeleteSimple)
DeleteRouter.post('/advanced', DeleteAdvanced)
