require('dotenv').config()
module.exports = {
  development: {
    database: 'yelp_guesser_development',
    dialect: 'postgres'
  },
  test: {
    database: 'yelp_guesser_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
