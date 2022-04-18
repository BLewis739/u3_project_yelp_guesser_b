const { User, Score, Leaderboard } = require('../models')
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

module.exports = {
  NewScore,
  ScoresByUser,
  GetAllScores
}
