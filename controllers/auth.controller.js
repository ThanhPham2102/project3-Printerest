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
module.exports.persionalpagecreated = (req, res) => {
  res.render("PersionalPageCreadted.ejs");
};
// ex
module.exports.printIdMovie = (req, res) => {
  let id = req.params.id;
  let today = new Date();
  // today = mm + "/" + dd + "/" + yyyy;
  let thirtyDate = new Date(new Date().setDate(today.getDate() + 30));

  thirtyDate = today.toISOString().substring(0, 10);
  db.execute("SELECT * FROM table_movies WHERE movieId = ?", [id])
    .then((data) => {
      let [rows] = data;
      let date = new Date(rows[0].releaseDate);
      let releaseDate = date.toISOString().substring(0, 10);
      let movieData = {
        todayCalendar: today,
        title: rows[0].title,
        description: rows[0].description,
        duration: rows[0].duration,
        language: rows[0].language,
        releaseDate: releaseDate,
        genre: rows[0].genre,
        image: rows[0].image,
        director: rows[0].director,
        casts: rows[0].casts,
      };

      let movieArray = [];
      for (let i = 0; i < 30; i++) {
        movieArray.push(i);
      }
      db.execute("SELECT * FROM city").then((data) => {
        let city = data[0];
        db.execute("SELECT * FROM cinema").then((data) => {
          let cinema = data[0];
          console.log(cinema);
          if (Object.keys(req.signedCookies).length === 0) {
            res.render("movieId", {
              userName: "",
              movieData,
              movieArray,
              city,
              cinema,
            });
          } else {
            res.render("movieId", {
              userName: req.signedCookies.userName,
              movieData,
              movieArray,
              city,
              cinema,
            });
          }
        });
      });
    })

    .catch((err) => {
      res.status(500).json({ message: err });
    });
};
// ex
//
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
          // console.log(dataUser);
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

module.exports.profile = (req, res) => {
  res.render("profile.ejs");
};
module.exports.homepage = (req, res) => {
  res.render("HomePage.ejs");
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
