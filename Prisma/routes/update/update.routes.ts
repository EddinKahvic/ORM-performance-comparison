import express from 'express'
import { getComplex, getSimple } from './update.controller'

const router = express.Router()

router.get('/simpleUpdate', getSimple)
router.get('/complexUpdate', getComplex)

module.exports = router
