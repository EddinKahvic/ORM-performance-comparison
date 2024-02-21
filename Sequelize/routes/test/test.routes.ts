import express from "express"
import { GetPetById } from "./test.controller"
const router = express.Router()

router.get('/', GetPetById)

module.exports = router