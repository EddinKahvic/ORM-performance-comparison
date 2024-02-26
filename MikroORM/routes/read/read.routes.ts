import express from 'express'
import { ReadSimple, ReadAdvanced } from './read.controller'

const router = express.Router()

router.get('/simple', ReadSimple)
router.get('/advanced', ReadAdvanced)

export default router
