const router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')

router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)
router.put(
  '/userpage',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updatePassword
)
router.delete('/userpage', controller.DeleteUser)

module.exports = router
