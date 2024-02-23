import express from "express"
import { CreateSimple, CreateAdvanced } from "./create.controller"
const router = express.Router()

router.post('/simplecreate', CreateSimple)
router.post('/advancedcreate',CreateAdvanced )

module.exports = router