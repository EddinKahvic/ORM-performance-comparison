import express from 'express'

const app = express()
const PORT = parseInt(process.env.PORT ?? '5000')
app.use(express.json())

// Routes

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
