import express from 'express'
import { GetAdvanced, GetSimple } from './delete.controller'

const router = express.Router()

router.get('/simple', GetSimple)
router.get('/advanced', GetAdvanced)

module.exports = router
