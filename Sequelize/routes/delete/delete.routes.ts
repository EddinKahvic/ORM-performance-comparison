import express from "express"
import { DeleteAdvanced, DeleteSimple } from "./delete.controller"

const router = express.Router()

router.delete('/simple', DeleteSimple)
router.delete('/advanced', DeleteAdvanced)

module.exports = router