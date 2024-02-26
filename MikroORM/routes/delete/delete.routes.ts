import express from 'express'
import { DeleteAdvanced, DeleteSimple } from './delete.controller'

const router = express.Router()

router.post('/simple', DeleteSimple)
router.post('/advanced', DeleteAdvanced)

export default router
