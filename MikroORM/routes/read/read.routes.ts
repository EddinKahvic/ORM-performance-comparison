import express from 'express'
import { ReadSimple, ReadAdvanced } from './read.controller'

export const ReadRouter = express.Router()

ReadRouter.get('/simple', ReadSimple)
ReadRouter.get('/advanced', ReadAdvanced)
