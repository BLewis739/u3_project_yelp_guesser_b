'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Score.belongsTo(models.User, { foreignKey: 'userId' })
      Score.belongsToMany(models.Leaderboard, {
        through: models.ScoreList,
        as: 'score_results',
        foreignKey: 'scoreId'
      })
    }
  }
  Score.init(
    {
      points: DataTypes.INTEGER,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Score',
      tableName: 'scores'
    }
  )
  return Score
}
