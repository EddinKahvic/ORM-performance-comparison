import express from 'express'
import { GetAdvanced, GetSimple } from './update.controller'

const router = express.Router()

router.get('/simple', GetSimple)
router.get('/advanced', GetAdvanced)

module.exports = router
