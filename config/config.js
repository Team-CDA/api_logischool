
require('dotenv').config();
module.exports={
  "development": {
    "username": process.env.SQL_USER,
    "password": process.env.SQL_PASSWORD,
    "database": "logischool",
    "host": process.env.SQL_URL,
    "dialect": "mysql"
  },
  "local": {
    "username": process.env.SQL_USER,
    "password": process.env.SQL_PASSWORD,
    "database": "logischool",
    "host": process.env.SQL_URL,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.SQL_USER_PROD,
    "password": process.env.SQL_PASSWORD_PROD,
    "database": "logischool",
    "host": process.env.SQL_URL,
    "dialect": "mysql"
  }
}