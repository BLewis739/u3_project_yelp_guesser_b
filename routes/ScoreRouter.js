const router = require('express').Router()
const controller = require('../controllers/ScoreController')
const middleware = require('../middleware')

router.post('/new-score', controller.NewScore)
router.get('/', controller.GetAllScores)
router.get('/:userId', controller.ScoresByUser)
// router.post('/register', controller.Register)
// router.put(
//   '/changePassword/:user_id',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.updatePassword
// )

module.exports = router
