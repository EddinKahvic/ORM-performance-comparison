import express from "express"
import { UpdateAdvanced, UpdateSimple } from "./update.controller"

const router = express.Router()

router.put('/simpleupdate', UpdateSimple)
router.put('/advancedupdate', UpdateAdvanced)

module.exports = router