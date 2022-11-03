// const mysql = require("mysql2");

// let pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "phong@3856734",
//   database: "user_pint",
// });

// module.exports = pool.promise();
const mysql = require("mysql2");
let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "user_pint",
  password: "thanhpham1995@",
});
module.exports = pool.promise();
