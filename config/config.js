require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.SQL_USER,
    "password": process.env.SQL_PASSWORD,
    "database": process.env.SQL_NAME,
    "host": process.env.SQL_URL,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.SQL_USER,
    "password": process.env.SQL_PASSWORD,
    "database": process.env.SQL_NAME,
    "host": process.env.SQL_URL,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.SQL_USER,
    "password": process.env.SQL_PASSWORD,
    "database": process.env.SQL_NAME,
    "host": process.env.SQL_URL,
    "dialect": "mysql"
  },
  "local": {
    "username": process.env.SQL_USER,
    "password": process.env.SQL_PASSWORD,
    "database": process.env.SQL_NAME,
    "host": process.env.SQL_URL,
    "dialect": "mysql"
  }
}
