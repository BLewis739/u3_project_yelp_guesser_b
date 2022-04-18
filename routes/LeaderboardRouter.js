const router = require('express').Router()
const controller = require('../controllers/LeaderboardController')
const middleware = require('../middleware')

router.post('/new-leaderboard', controller.NewLeaderboard)
router.get('/', controller.GetAllLeaderboards)
// router.post('/register', controller.Register)
// router.put(
//   '/changePassword/:user_id',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.updatePassword
// )

module.exports = router
