const { User, Score, Leaderboard } = require('../models')
const middleware = require('../middleware')

const NewLeaderboard = async (req, res) => {
  try {
    const { name } = req.body
    const board = await Leaderboard.create({ name })
    res.send(board)
  } catch (error) {
    throw error
  }
}

const GetAllLeaderboards = async (req, res) => {
  try {
    const leaderboards = await Leaderboard.findAll()
    res.send(leaderboards)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllLeaderboards,
  NewLeaderboard
  //NewUserLeaderboard
}
