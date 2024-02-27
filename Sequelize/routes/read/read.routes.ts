import express from "express"
import { GetSimple, GetAdvanced } from "./read.controller"
const router = express.Router()

router.get('/simple', GetSimple)
router.get('/advanced', GetAdvanced )

module.exports = router