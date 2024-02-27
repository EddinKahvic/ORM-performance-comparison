import express from 'express'
import { ReadSimple, ReadAdvanced } from './read.controller'

const ReadRouter = express.Router()

ReadRouter.get('/simple', ReadSimple)
ReadRouter.get('/advanced', ReadAdvanced)

export default ReadRouter
