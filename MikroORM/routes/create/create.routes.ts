import express from 'express'
import { CreateAdvanced, CreateSimple } from './create.controller'

const router = express.Router()

router.post('/simple', CreateSimple)
router.post('/advanced', CreateAdvanced)

export default router
