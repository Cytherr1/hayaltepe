const mysql = require("mysql");
require('dotenv').config({ path: '../../.env'});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

console.log(process.env.DB_HOST);

const getConnection = () => {

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      resolve(connection);
    });
  });
};

const releaseConnection = (connection) => {
  connection.release();
};

module.exports = {
  getConnection,
  releaseConnection,
};
