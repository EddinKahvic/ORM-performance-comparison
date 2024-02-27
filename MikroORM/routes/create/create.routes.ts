import express from 'express'
import { CreateAdvanced, CreateSimple } from './create.controller'

export const CreateRouter = express.Router()

CreateRouter.post('/simple', CreateSimple)
CreateRouter.post('/advanced', CreateAdvanced)
