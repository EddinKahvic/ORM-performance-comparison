import express from 'express'
import { getAdvanced, getSimple } from './read.controller'

const router = express.Router()

router.get('/simple', getSimple)
router.get('/advanced', getAdvanced)

module.exports = router
