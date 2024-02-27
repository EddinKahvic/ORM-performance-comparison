import express from "express"
import { DeleteAdvanced, DeleteSimple } from "./delete.controller"

const router = express.Router()

router.delete('/simpledelete', DeleteSimple)
router.delete('/advanceddelete', DeleteAdvanced)

module.exports = router