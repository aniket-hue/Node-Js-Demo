const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  port:3306,
  user: "root",
  database: "node-complete",
  password: "password",
});

module.exports = pool.promise();
