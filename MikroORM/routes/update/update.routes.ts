import express from 'express'
import { UpdateAdvanced, UpdateSimple } from './update.controller'

export const UpdateRouter = express.Router()

UpdateRouter.put('/simple', UpdateSimple)
UpdateRouter.put('/advanced', UpdateAdvanced)
