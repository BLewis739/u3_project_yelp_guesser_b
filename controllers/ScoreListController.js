const { User, Score, Leaderboard, ScoreList } = require('../models')
const middleware = require('../middleware')

const NewScoreList = async (req, res) => {
  try {
    const { leaderboardId, scoreId } = req.body
    const list = await ScoreList.create({
      leaderboardId: leaderboardId,
      scoreId: scoreId
    })
    res.send(list)
  } catch (error) {
    throw error
  }
}

const GetAllScoreLists = async (req, res) => {
  try {
    const scorelists = await ScoreList.findAll()
    res.send(scorelists)
  } catch (error) {
    throw error
  }
}

const DeleteScoreList = async (req, res) => {
  try {
    const scorelist_id = req.params.scoreListId
    await ScoreList.destroy({ where: { id: scorelist_id } })
    res.send({ message: `Deleted scorelist with an id of ${scorelist_id}` })
  } catch (error) {
    throw error
  }
}

const GetScoreListById = async (req, res) => {
  try {
    const sl_id = req.params.scoreListId
    const sl = await ScoreList.findOne({ where: { id: sl_id } })
    res.send(sl)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllScoreLists,
  NewScoreList,
  DeleteScoreList,
  GetScoreListById
}
