'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Leaderboard extends Model {
    static associate(models) {
      Leaderboard.belongsToMany(models.Score, {
        through: models.ScoreList,
        as: 'leaderboard_results',
        foreignKey: 'leaderboardId'
      })
    }
  }
  Leaderboard.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Leaderboard',
      tableName: 'leaderboards'
    }
  )
  return Leaderboard
}
