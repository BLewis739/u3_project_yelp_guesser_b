'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leaderboard_score_list', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      leaderboardId: {
        type: Sequelize.INTEGER
      },
      scoreId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leaderboard_score_list')
  }
}
