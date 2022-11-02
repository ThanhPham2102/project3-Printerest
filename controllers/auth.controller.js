//dung de dang ki dang nhap

const db = require("../models/db");
const bcrypt = require("bcrypt");

// register
module.exports.renderRegister = (req, res) => {
  res.render("registerPage.ejs");
};
// Login
module.exports.renderLogin = (req, res) => {
  res.render("loginPage.ejs");
};
//logout
module.exports.logout = (req, res) => {
  // res.render("loginPage.ejs");
};

module.exports.register = (req, res) => {
  res.send("<h1>Hello world from register page</h1>");
};
// Login
module.exports.login = (req, res) => {
  let { email, password } = req.body;
  // console.log(email, password);
  if (!email || !password) {
    return res.status(500).json({
      message: "Invalid email or password",
    });
  }
  db.execute("SELECT * FROM tbl_users WHERE email=?", [email])
    .then((data) => {
      // console.log(data);
      let [row] = data;
      let find = row[0];
      // console.log(find);
      if (!find) {
        res.status(500).json({
          message: "Invalid email or password",
        });
      } else {
        //check password
        let passValid = bcrypt.compareSync(password, find.password);
        if (!passValid) {
          res.status(404).json({
            message: "Wrong password",
          });
        } else {
          res.cookie("userId", find.id, { signed: true }); //lay gia tri cua userId in le cookie
          res.cookie("role", find.role, { signed: true }); //lay gia tri cua role ra n len cookie
          res.status(200).json({
            status: "success",
            message: "Login Sucessfully",
          });
        }
      }
    })
    .catch((err) => console.log(err));
};
