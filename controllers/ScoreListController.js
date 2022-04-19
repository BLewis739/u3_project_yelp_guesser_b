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

module.exports = {
  GetAllScoreLists,
  NewScoreList
  //NewUserLeaderboard
}
