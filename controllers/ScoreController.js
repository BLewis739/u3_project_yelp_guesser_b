const { User, Score, Leaderboard, ScoreList } = require('../models')
const middleware = require('../middleware')

const NewScore = async (req, res) => {
  try {
    const { userId, points } = req.body
    const score = await Score.create({ userId, points })
    res.send(score)
  } catch (error) {
    throw error
  }
}

const GetAllScores = async (req, res) => {
  try {
    const scores = await Score.findAll({
      order: [['points', 'DESC']]
    })
    res.send(scores)
  } catch (error) {
    throw error
  }
}

const NewScoreFull = async (req, res) => {
  try {
    const { userId, points } = req.body
    const allScores = await Score.findAll({
      order: [['points', 'DESC']],
      limit: 5
    })
    const newScore = await Score.create({ userId, points })

    // This only works if the World Leaderboard has an id of 1
    // It can be fixed later if it needs to be
    const worldLeaderboardId = 1
    const newScoreId = newScore.id
    let newTopFive = 'NOT '

    if (allScores.length < 5) {
      //Just put it in the top 5
      const newScoreListItem = await ScoreList.create({
        worldLeaderboardId,
        newScoreId
      })
    } else {
      const oldFifthPlacePoints = allScores[4].points
      if (oldFifthPlacePoints < points) {
        //Put the new score in world top 5
        const newScoreListItem = await ScoreList.create({
          leaderboardId: worldLeaderboardId,
          scoreId: newScoreId
        })
        //Delete the old fifth place
        const oldFifthPlaceScoreId = allScores[4].id
        await ScoreList.destroy({
          where: {
            scoreId: oldFifthPlaceScoreId
          }
        })
      }
    }

    res.send(newScore)
  } catch (error) {
    throw error
  }
}

const GetScoreById = async (req, res) => {
  try {
    const score_id = req.params.scoreId
    const score = await Score.findByPk(score_id)
    res.send(score)
  } catch (error) {
    throw error
  }
}

const ScoresByUser = async (req, res) => {
  try {
    const user_id = req.params.userId
    const scores = await Score.findAll({
      where: { userId: user_id },
      order: [['points', 'DESC']]
    })
    res.send(scores)
  } catch (error) {
    throw error
  }
}

const DeleteScore = async (req, res) => {
  try {
    const score_id = req.params.scoreId
    await Score.destroy({ where: { id: score_id } })
    res.send({ message: `Deleted score with an id of ${score_id}` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  NewScore,
  ScoresByUser,
  GetAllScores,
  DeleteScore,
  GetScoreById,
  NewScoreFull
}
