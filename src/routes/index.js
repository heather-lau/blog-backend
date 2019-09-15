import express from 'express'
import index_controller from '../controllers/index'

const router = express.Router()

router.all('*', (req, res, next) => {
  res.formatSend = (payload, status = 200) => {
    return res.status(status).send({ payload })
  }
  return next()
})

router.get('/', index_controller.base)

export default router