export * from './mikroorm'
export * from './generate-entities'

// Routes
import CreateRouter from './routes/create/create.routes'
import ReadRouter from './routes/read/read.routes'
import UpdateRouter from './routes/update/update.routes'
import DeleteRouter from './routes/delete/delete.routes'

export default {
  CreateRouter,
  ReadRouter,
  UpdateRouter,
  DeleteRouter,
}
