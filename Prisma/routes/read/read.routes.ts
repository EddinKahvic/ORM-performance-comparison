import express from 'express'
import { ReadAdvanced, ReadSimple } from './read.controller'

const router = express.Router()

router.get('/simple', ReadSimple)
router.get('/advanced', ReadAdvanced)

module.exports = router
