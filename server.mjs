import express from 'express'


const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080
const app = express()

app.use(express.static('dist'))

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT)
})
