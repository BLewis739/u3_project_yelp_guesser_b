const router = require('express').Router()
const controller = require('../controllers/ScoreListController')

router.post('/new-scorelist', controller.NewScoreList)
router.get('/', controller.GetAllScoreLists)
router.get('/:scoreListId', controller.GetScoreListById)
router.delete('/delete/:scoreListId', controller.DeleteScoreList)

module.exports = router
