const router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')

// router.post('/login', controller.Login)
// router.post('/register', controller.Register)
// router.put(
//   '/changePassword/:user_id',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.updatePassword
// )

module.exports = router
