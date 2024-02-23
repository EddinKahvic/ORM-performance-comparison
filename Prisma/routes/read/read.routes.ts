import express from 'express'
import { getComplex, getSimple } from './read.controller'

const router = express.Router()

router.get('/simpleRead', getSimple)
router.get('/complexRead', getComplex)

module.exports = router
