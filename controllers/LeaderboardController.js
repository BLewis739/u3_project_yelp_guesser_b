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

const DeleteLeaderboard = async (req, res) => {
  try {
    const leaderboard_id = req.params.leaderboardId
    await Leaderboard.destroy({ where: { id: leaderboard_id } })
    res.send({ message: `Deleted score with an id of ${leaderboard_id}` })
  } catch (error) {
    throw error
  }
}

const GetLeaderboardById = async (req, res) => {
  try {
    const lb_id = req.params.leaderboardId
    const lb = await Leaderboard.findByPk(lb_id)
    res.send(lb)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllLeaderboards,
  NewLeaderboard,
  DeleteLeaderboard,
  GetLeaderboardById
}
