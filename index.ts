import express from 'express'

const app = express()
const PORT = parseInt(process.env.PORT ?? '5000')
app.use(express.json())

// Routes
app.use('/prisma/read', require('./prisma/routes/read/read.routes'))
app.use('/prisma/create', require('./prisma/routes/create/create.routes'))
app.use('/prisma/update', require('./prisma/routes/update/update.routes'))
app.use('/prisma/delete', require('./prisma/routes/delete/delete.routes'))

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
