import express from "express"
import { UpdateAdvanced, UpdateSimple } from "./update.controller"

const router = express.Router()

router.put('/simple', UpdateSimple)
router.put('/advanced', UpdateAdvanced)

module.exports = router