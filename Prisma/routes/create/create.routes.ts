import express from 'express'
import { GetAdvanced, GetSimple } from './create.controller'

const router = express.Router()

router.get('/simple', GetSimple)
router.get('/advanced', GetAdvanced)

module.exports = router
