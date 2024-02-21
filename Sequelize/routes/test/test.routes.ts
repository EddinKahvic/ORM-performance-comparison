import express from "express"
import { GetSimple, GetAdvanced } from "./test.controller"
const router = express.Router()

router.get('/simpleread', GetSimple)
router.get('/advancedread',GetAdvanced )

module.exports = router