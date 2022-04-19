'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ScoreList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ScoreList.init(
    {
      leaderboardId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'leaderboards',
          key: 'id'
        }
      },
      scoreId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'scores',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'ScoreList',
      tableName: 'leaderboard_score_list'
    }
  )
  return ScoreList
}
