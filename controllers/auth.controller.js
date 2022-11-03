/** @format */

const db = require("../models/db");
const bcrypt = require("bcrypt");
var strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,24}$");
const saltRounds = 10;

module.exports.renderRegister = (req, res) => {
  res.render("login.ejs");
};

module.exports.renderLogin = (req, res) => {
  res.render("login.ejs");
};
module.exports.resetpass = (req, res) => {
  res.render("passwordreset.ejs");
};

module.exports.persionalpage = (req, res) => {
  res.render("PersionalPage.ejs");
};
module.exports.profile = (req, res) => {
  res.render("profile.ejs");
};
module.exports.homepage = (req, res) => {
  res.render("HomePage.ejs");
};
// module.exports.register = (req, res) => {
//   let { email, password } = req.body;
//   if (email) {
//     return res
//       .status(500)
//       .json({ message: "Please enter a valid email addresses" });
//   } else {
//   }
// };
module.exports.login = (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({ message: "invalid" });
  }
  db.execute("SELECT * FROM tbl_userpint WHERE email = ?", [email]).then(
    (data) => {
      // console.log(data);
      let [rows] = data;
      let find = rows[0];
      // console.log(find);
      if (!find) {
        // console.log("not file");
        res.status(404).json({ status: "erruser", message: "User not found" });
      } else {
        // console.log("file");
        // console.log("file");
        // console.log("file");
        let passvalidate = bcrypt.compareSync(password, find.password);
        // const passvalidate = find.password;
        // console.log(passvalidate);
        if (!passvalidate) {
          // console.log("hello from passs invalid");
          res
            .status(404)
            .json({ status: "errpass", message: "Wrong password" });
        } else {
          // console.log("hello from passs vaid");
          res.cookie("email", find.id, { signed: true });
          res.cookie("role", find.role, { signed: true });
          res.status(200).json({
            status: "success",
            message: "login successful",
          });
          //dieu huong ng dung sang trang
          //set heaers
          //res.redirect //not working after set cookie
          //res. redirect not working after res.cookie(google)
        }
      }
    }
  );
};

module.exports.loginresetpass = (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({ message: "invalid" });
  }
  db.execute("SELECT * FROM tbl_userpint WHERE email = ?", [email]).then(
    (data) => {
      // console.log(data);
      let [rows] = data;
      let find = rows[0];
      // console.log(find);
      if (!find) {
        // console.log("not file");
        res.status(404).json({ status: "erruser", message: "User not found" });
      } else {
        // console.log("file");
        // console.log("file");
        // console.log("file");
        let passvalidate = bcrypt.compareSync(password, find.password);
        // const passvalidate = find.password;
        // console.log(passvalidate);
        if (!passvalidate) {
          // console.log("hello from passs invalid");
          res
            .status(404)
            .json({ status: "errpass", message: "Wrong password" });
        } else {
          // console.log("hello from passs vaid");
          res.cookie("email", find.id, { signed: true });
          res.cookie("role", find.role, { signed: true });
          res.status(200).json({
            status: "success",
            message: "login successful",
          });
          //dieu huong ng dung sang trang
          //set heaers
          //res.redirect //not working after set cookie
          //res. redirect not working after res.cookie(google)
        }
      }
    }
  );
};

// module.exports.logout = (req, res) => {
//   // clear cookie ( tra res.clearCookie())

//   res.clearCookie("userId", {
//     signed: true,
//     path: "/",
//     domain: "localhost",
//   });
//   // Logout successfully (JSON)
//   // Front-end take message and redirect
// };
//authentication(xac thuc)
/*
Session(phien dang nhap)
cookies
Token(jwt)
*/

module.exports.register = (req, res) => {
  let { email, password, age } = req.body;

  if (!email || !password || !age) {
    return res.status(500).json({
      messages: "Invalid email or password end age",
    });
  }

  if (!strongRegex.test(password)) {
    return res.status(500).json({
      status: "passnotenough",
      message: "Password is not strong enough",
    });
  }

  // generate password and id

  password = bcrypt.hashSync(password, saltRounds);
  //   console.log(password);

  //   execute SQL query

  db.execute("SELECT * FROM tbl_userpint WHERE email = ?", [email])
    .then((data) => {
      //   console.log(data);

      let [rows] = data;
      // một mảng chứa 1 phần tử nếu tìm thấy user
      // [] nếu không tìm thấy
      if (rows.length > 0) {
        return Promise.reject("User already exists");
      } else {
        let id = Math.floor(Math.random() * 1000000);
        return db.execute(
          "INSERT INTO tbl_userpint VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [id, email, password, age, null, null, null, null, null, null]
        );
      }
    })
    .then((data) => {
      //   console.log(data);
      res.status(200).json({
        status: "created successfully",
        message: "Create one successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "useralrea",
        err: err,
      });
    });
};

module.exports.signupregister = (req, res) => {
  let { email, password, age } = req.body;

  if (!email || !password || !age) {
    return res.status(500).json({
      messages: "Invalid email or password end age",
    });
  }

  if (!strongRegex.test(password)) {
    return res.status(500).json({
      status: "passnotenough",
      message: "Password is not strong enough",
    });
  }

  // generate password and id

  password = bcrypt.hashSync(password, saltRounds);
  //   console.log(password);

  //   execute SQL query

  db.execute("SELECT * FROM tbl_userpint WHERE email = ?", [email])
    .then((data) => {
      //   console.log(data);

      let [rows] = data;
      // một mảng chứa 1 phần tử nếu tìm thấy user
      // [] nếu không tìm thấy
      if (rows.length > 0) {
        return Promise.reject("User already exists");
      } else {
        let id = Math.floor(Math.random() * 1000000);
        return db.execute(
          "INSERT INTO tbl_userpint VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [id, email, password, age, null, null, null, null, null, null]
        );
      }
    })
    .then((data) => {
      //   console.log(data);
      res.status(200).json({
        status: "created successfully",
        message: "Create one successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "useralrea",
        err: err,
      });
    });
};
