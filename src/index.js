import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import mongoose from 'mongoose'

import CONFIG from './config/config'
import router from './routes'
import { errorLog } from './logger'
import { BaseError, ResourceNotFoundError } from './error'

const app = express()

mongoose.connect(`mongodb://${CONFIG.db_host}:${CONFIG.db_port}/${CONFG.db_name}`, {
  useNewUrlParser: true
})

mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err}`)
})

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', router)

app.use((req, res, next) => {
  next(new ResourceNotFoundError())
})

// Error Handling
app.use((err, req, res, next) => {
  const { code, message } = err
  if (err instanceof BaseError) {
    res.status(err.status).send({ errMsg: message, errCode: code })
  } else {
    res.status(500).send({ errMsg: message })
  }
  // Log the error message
  errorLog.error(`
    ${req.method} request to ${req.url} returned error {code: ${code}, msg: ${message}}
  `)
})

app.listen(CONFIG.port, CONFIG.host, () => {
  console.log(`Sever running at ${CONFIG.host}:${CONFIG.port}`)
})