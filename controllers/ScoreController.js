const { User, Score, Leaderboard } = require('../models')
const middleware = require('../middleware')

const newScore = async (req, res) => {
  try {
    const { username, points } = req.body
    const score = await Score.create({ username, points })
    res.send(score)
  } catch (error) {
    throw error
  }
}

module.exports = {
  newScore
}
