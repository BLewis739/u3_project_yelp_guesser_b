const router = require('express').Router()
const controller = require('../controllers/ScoreController')

router.post('/new-score', controller.NewScore)
// router.post('/new-score-full', controller.NewScoreFull)
router.get('/', controller.GetAllScores)
router.get('/user/:userId', controller.ScoresByUser)
router.get('/:scoreId', controller.GetScoreById)
router.delete('/delete/:scoreId', controller.DeleteScore)

module.exports = router
