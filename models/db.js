const mysql = require("mysql2");
let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "user_pint",
  password: "thanhpham1995@",
});
module.exports = pool.promise();
