const { User, Score, Leaderboard, ScoreList } = require('../models')
const middleware = require('../middleware')
const { GetScoreListById } = require('./ScoreListController')

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

const GetFullLeaderboardById = async (req, res) => {
  try {
    const lb_id = req.params.leaderboardId
    const lb_scores = await ScoreList.findAll({
      where: {
        leaderboardId: lb_id
      }
    })
    res.send(lb_scores)
  } catch (error) {
    throw error
  }
}

const GetLeaderboardByUserId = async (req, res) => {
  try {
    const user_id = req.params.userId
    const userInfo = await User.findOne({ where: { id: user_id } })
    const username = userInfo.username
    const leaderboardName = `${username}'s Top Five Scores`
    const userLeaderboard = await Leaderboard.findOne({
      where: {
        name: leaderboardName
      }
    })
    res.send(userLeaderboard)
  } catch (error) {
    throw error
  }
}

const GetFullLeaderboardByUserId = async (req, res) => {
  try {
    const user_id = req.params.userId
    const userInfo = await User.findOne({ where: { id: user_id } })
    const username = userInfo.username
    const leaderboardName = `${username}'s Top Five Scores`
    const userLeaderboard = await Leaderboard.findOne({
      where: {
        name: leaderboardName
      }
    })
    const lb_id = userLeaderboard.id
    const lb_scores = await ScoreList.findAll({
      where: {
        leaderboardId: lb_id
      }
    })

    const score_ids = lb_scores.map((item) => {
      return item.scoreId
    })

    const score_objects = []

    for (i = 0; i < score_ids.length; i++) {
      oneScore = score_ids[i]
      score_obj = await Score.findOne({
        where: { id: oneScore }
      })
      score_objects.push(score_obj)
    }

    const sorted_scores = []
    let highScore = 0
    let hsIndex = 0

    while (score_objects.length > 0) {
      for (i = 0; i < score_objects.length; i++) {
        if (score_objects[i].points > highScore) {
          highScore = score_objects[i].points
          hsIndex = i
        }
      }
      sorted_scores.push(score_objects[hsIndex])
      score_objects.splice(hsIndex, 1)
      highScore = 0
    }

    const score_dates = sorted_scores.map((item) => {
      return item.createdAt.toString().substring(4, 15)
    })

    const finalScoreAndDate = []

    for (i = 0; i < sorted_scores.length; i++) {
      let scoreAndDate = {
        points: sorted_scores[i].points,
        date: score_dates[i]
      }
      finalScoreAndDate.push(scoreAndDate)
    }

    res.send(finalScoreAndDate)
  } catch (error) {
    throw error
  }
}

const GetFullWorldLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findOne({
      where: { name: 'World Top Five' }
    })

    const lb_id = leaderboard.id
    const lb_scores = await ScoreList.findAll({
      where: {
        leaderboardId: lb_id
      }
    })
    const score_ids = lb_scores.map((item) => {
      return item.scoreId
    })

    const score_objects = []

    for (i = 0; i < score_ids.length; i++) {
      oneScore = score_ids[i]
      score_obj = await Score.findOne({
        where: { id: oneScore }
      })
      score_objects.push(score_obj)
    }

    const sorted_scores = []
    let highScore = 0
    let hsIndex = 0

    while (score_objects.length > 0) {
      for (i = 0; i < score_objects.length; i++) {
        if (score_objects[i].points > highScore) {
          highScore = score_objects[i].points
          hsIndex = i
        }
      }
      sorted_scores.push(score_objects[hsIndex])
      score_objects.splice(hsIndex, 1)
      highScore = 0
    }

    const score_dates = sorted_scores.map((item) => {
      return item.createdAt.toString().substring(4, 15)
    })

    const score_users = sorted_scores.map((item) => {
      return item.userId
    })

    const score_usernames = []
    for (i = 0; i < score_users.length; i++) {
      let userObj = await User.findOne({
        where: { id: score_users[i] }
      })
      score_usernames.push(userObj.username)
    }

    const finalArray = []
    for (i = 0; i < score_users.length; i++) {
      let fullObj = {
        username: score_usernames[i],
        date: score_dates[i],
        points: sorted_scores[i].points
      }
      finalArray.push(fullObj)
    }

    res.send(finalArray)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllLeaderboards,
  NewLeaderboard,
  DeleteLeaderboard,
  GetLeaderboardById,
  GetFullLeaderboardById,
  GetLeaderboardByUserId,
  GetFullLeaderboardByUserId,
  GetFullWorldLeaderboard
}
