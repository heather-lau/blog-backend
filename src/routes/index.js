import 'babel-polyfill'
import express from 'express'
import index_controller from '../controllers/index'
import articles_controller from '../controllers/articles'

const router = express.Router()

router.all('*', (req, res, next) => {
  res.formatSend = (payload, status = 200) => {
    return res.status(status).send({ payload })
  }
  return next()
})

router.get('/', index_controller.base)

// Article routes
router.get('/articles', articles_controller.list)
router.post('/articles', articles_controller.create)
router.delete('/articles', articles_controller.deleteAll)
router.put('/articles/:id', articles_controller.update)
router.get('/articles/:id', articles_controller.details)
router.delete('/articles/:id', articles_controller.delete)

export default router