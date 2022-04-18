'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('user_score_list', 'scoreId', {
      type: Sequelize.INTEGER
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('user_score_list', 'scoreId', {
      type: Sequelize.INTEGER
    })
  }
}
