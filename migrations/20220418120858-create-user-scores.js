'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_score_list', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      scoreId: {
        type: Sequelize.INTEGER,
        field: 'score_id'
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
    await queryInterface.dropTable('user_score_list')
  }
}
