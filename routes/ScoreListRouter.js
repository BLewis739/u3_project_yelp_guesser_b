const router = require('express').Router()
const controller = require('../controllers/ScoreListController')
const middleware = require('../middleware')

router.post('/new-scorelist', controller.NewScoreList)
//router.post('/new-leaderboard/:userId', controller.NewUserLeaderboard)
router.get('/', controller.GetAllScoreLists)
// router.post('/register', controller.Register)
// router.put(
//   '/changePassword/:user_id',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.updatePassword
// )

module.exports = router
