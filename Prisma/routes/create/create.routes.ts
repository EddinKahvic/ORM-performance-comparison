import express from 'express'
import { getComplex, getSimple } from './create.controller'

const router = express.Router()

router.get('/simpleCreate', getSimple)
router.get('/complexCreate', getComplex)

module.exports = router
