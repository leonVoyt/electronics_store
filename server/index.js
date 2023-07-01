require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const app = express()
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/mainRoute')
const errorHandler = require('./midlware/errorHandlingMidlware')
const fileUpload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(fileUpload({}))

app.use('/api', router)
//error midlware only in end
app.use(errorHandler)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Working!' })
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`server start: http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
// { force: true }
