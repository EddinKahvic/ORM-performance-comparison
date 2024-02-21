import express from "express"
import { getTest } from "./test.controller"
const router = express.Router()

router.get('/', getTest)

module.exports = router