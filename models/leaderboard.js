'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Leaderboard extends Model {
    static associate(models) {
      Leaderboard.hasMany(models.Score, { as: 'scores', foreignKey: 'scoreId' })
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
