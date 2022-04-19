const { User, Score, Leaderboard, sequelize } = require('./models')

const stringify = (data) => {
  console.log(JSON.stringify(data, null, 2))
}

const getUsersAndScores = async () => {
  try {
    const data = await User.findAll({
      include: [{ model: Score, as: 'game_scores' }]
    })
    stringify(data)
  } catch (error) {
    console.log(error)
  }
}

const getLeaderboardsAndScores = async () => {
  try {
    const data = await Leaderboard.findAll({
      include: [{ model: Score, as: 'leaderboard_results' }]
    })
    stringify(data)
  } catch (error) {
    throw error
  }
}

async function main() {
  try {
    //await getUsersAndScores()
    await getLeaderboardsAndScores()
  } catch (error) {
    console.log(error)
  } finally {
    sequelize.close()
  }
}

main()
