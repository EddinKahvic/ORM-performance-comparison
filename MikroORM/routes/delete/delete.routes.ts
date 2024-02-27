import express from 'express'
import { DeleteAdvanced, DeleteSimple } from './delete.controller'

const DeleteRouter = express.Router()

DeleteRouter.post('/simple', DeleteSimple)
DeleteRouter.post('/advanced', DeleteAdvanced)

export default DeleteRouter
