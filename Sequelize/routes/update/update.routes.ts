import express from "express"
import { UpdateSimple } from "./update.controller"

const router = express.Router()

router.put('/simpleupdate', UpdateSimple)

module.exports = router