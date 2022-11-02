const mysql = require("mysql2");

let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "phong@3856734",
  database: "user_pint",
});

module.exports = pool.promise();
