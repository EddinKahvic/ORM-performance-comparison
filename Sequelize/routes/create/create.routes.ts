import express from "express"
import { CreateSimple, CreateAdvanced } from "./create.controller"
const router = express.Router()

router.post('/simple', CreateSimple)
router.post('/advanced', CreateAdvanced )

module.exports = router