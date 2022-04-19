const router = require('express').Router()
const controller = require('../controllers/LeaderboardController')

router.post('/new-leaderboard', controller.NewLeaderboard)
router.get('/', controller.GetAllLeaderboards)
router.get('/:leaderboardId', controller.GetLeaderboardById)
router.delete('/delete/:leaderboardId', controller.DeleteLeaderboard)

module.exports = router
