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

// const NewScoreFull = async (req, res) => {
//   try {
//     const { userId, points } = req.body
//     const allScores = await Score.findAll({
//       order: [['points', 'DESC']],
//       limit: 5
//     })
//     const oldFifthPlace = allScores[4].points
//     const newScore = await Score.create({ userId, points })

//     if (oldFifthPlace < points) {
//       //Put the new score in world top 5
//     } else {
//     }

//     res.send(allScores)
//   } catch (error) {
//     throw error
//   }
// }

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
  GetScoreById
  // NewScoreFull
}
