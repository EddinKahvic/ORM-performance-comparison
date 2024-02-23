import express from 'express'
import { getComplex, getSimple } from './delete.controller'

const router = express.Router()

router.get('/simpleDelete', getSimple)
router.get('/complexDelete', getComplex)

module.exports = router
