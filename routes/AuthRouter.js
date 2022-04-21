const router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')
const cors = require('cors')

router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.get(
  '/session',
  cors(),
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
