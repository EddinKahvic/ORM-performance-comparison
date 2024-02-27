import express from 'express'
import { UpdateAdvanced, UpdateSimple } from './update.controller'

const UpdateRouter = express.Router()

UpdateRouter.put('/simple', UpdateSimple)
UpdateRouter.put('/advanced', UpdateAdvanced)

export default UpdateRouter
