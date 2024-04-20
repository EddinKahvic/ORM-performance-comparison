import express from 'express'
import { DeleteAdvanced, DeleteSimple } from './delete.controller'

const DeleteRouter = express.Router()

DeleteRouter.delete('/simple', DeleteSimple)
DeleteRouter.delete('/advanced', DeleteAdvanced)

export default DeleteRouter
