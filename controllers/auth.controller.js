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

module.exports.persionalpagecreated = (req, res) => {
  res.render("PersionalPageCreadted.ejs");
};

//DetailPage
module.exports.DetailPage = (req, res) => {
  let id = req.params.id; //lấy id từ param
  db.execute("SELECT * FROM tbl_photopint WHERE id =?", [id]) //so sánh với id trong db
    .then((data) => {
      let [rows] = data;
      let userIdPhoto = data[0][0].user_id;
      db.execute("SELECT * FROM tbl_userpint WHERE id =?", [userIdPhoto]).then(
        (data) => {
          // console.log(data[0][0].avatar);
          let dataUser = data[0][0];
          // console.log("hahah", dataUser);//bug avatar thay
          res.render("DetailPage", {
            data: rows,
            dataUser,
          });
        }
      );
    })
    .catch((err) => console.log(err));
};
module.exports.getOne = (req, res) => {
  let id = req.params.id; //lấy id từ param
  db.execute("SELECT * FROM tbl_userpint WHERE id =?", [id]) //so sánh với id trong db
    .then((data) => {
      // console.log(data);
      let [rows] = data;
      res.status(200).json({
        data: rows[0],
      });
    })
    .catch((err) => console.log(err));
};

module.exports.homepage = (req, res) => {
  let id = req.params.id; //lấy id từ param
  db.execute("SELECT * FROM tbl_userpint WHERE id =?", [id]) //so sánh với id trong db
    .then((data) => {
      let [rows] = data;
      console.log(rows);
      res.render("HomePage", {
        data: rows[0],
      });
    })
    .catch((err) => console.log(err));
};
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
        let passvalidate = bcrypt.compareSync(password, find.password);

        if (!passvalidate) {
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
        }
      }
    }
  );
};

module.exports.register = (req, res) => {
  let { email, password, age, username, role } = req.body;

  if (!email || !password || !age || !username || !role) {
    return res.status(500).json({
      messages: "Invalid email, password, age and username",
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
          "INSERT INTO tbl_userpint VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            id,
            email,
            password,
            age,
            null,
            null,
            null,
            null,
            null,
            username,
            role,
          ]
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
  let { email, password, age, username, role } = req.body;

  if (!email || !password || !age || !username || !role) {
    return res.status(500).json({
      messages: "Invalid email, password , age and username",
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
          "INSERT INTO tbl_userpint VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            id,
            email,
            password,
            age,
            null,
            null,
            null,
            null,
            null,
            username,
            role,
          ]
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

module.exports.getprofile = (req, res) => {
  let id = req.params.id; //lấy id từ param
  db.execute("SELECT * FROM tbl_userpint WHERE id =?", [id]) //so sánh với id trong db
    .then((data) => {
      let [rows] = data;
      res.render("profile", {
        data: rows[0],
      });
    })
    .catch((err) => console.log(err));
};
module.exports.getPer = (req, res) => {
  let id = req.params.id; //lấy id từ param
  db.execute("SELECT * FROM tbl_userpint WHERE id =?", [id]) //so sánh với id trong db
    .then((data) => {
      let [rows] = data;
      // console.log(rows[0]);
      res.render("PersionalPage", {
        data: rows[0],
      });
    })
    .catch((err) => console.log(err));
};
module.exports.profileUpdate = (req, res) => {
  let { id } = req.params;

  let { fistname, lastname, dob, website, username } = req.body;
  db.execute(
    "UPDATE tbl_userpint SET fistname =?,lastname =?,dob =?,website =?,username =? WHERE id=?",
    [fistname, lastname, dob, website, username, id]
  )
    .then((data) => {
      //   console.log(data);
      res.status(200).json({
        status: "updatesuccess",
        message: "update successfully",
      });
    })
    .catch((err) => console.log(err));
};
