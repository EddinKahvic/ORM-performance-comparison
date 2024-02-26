import express from 'express'
import CreateRouter from './routes/create/create.routes'
import ReadRouter from './routes/read/read.routes'
import UpdateRouter from './routes/update/update.routes'

export * from './mikroorm'
export * from './generate-entities'

export const MikroORMRouter = express.Router()

MikroORMRouter.use('/create/', CreateRouter)
MikroORMRouter.use('/read/', ReadRouter)
MikroORMRouter.use('/update/', UpdateRouter)
