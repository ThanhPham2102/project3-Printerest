/** @format */

const db = require("../models/db");
const bcrypt = require("bcrypt");
var strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,24}$");
const saltRounds = 10;
const _ = require("lodash");

module.exports.renderRegister = (req, res) => {
  res.render("login.ejs");
};

module.exports.renderLogin = (req, res) => {
  res.render("login.ejs");
};
module.exports.resetpass = (req, res) => {
  res.render("passwordreset.ejs");
};

//DetailPage
module.exports.DetailPage = (req, res) => {
  let signedUser;
  let id = req.params.id; //lấy id từ param
  db.execute("SELECT * FROM tbl_photopint WHERE id =?", [id]) //so sánh với id trong db
    .then((data) => {
      let [rows] = data;
      let userIdPhoto = data[0][0].user_id;
      db.execute("SELECT * FROM tbl_userpint WHERE id =?", [userIdPhoto]).then(
        (data) => {
          // console.log(data[0][0].avatar);
          let dataUser = data[0][0];
          // console.log("hahah", dataUser.avatar, rows); //bug avatar thay
          db.execute("SELECT * FROM tbl_userpint WHERE id =?", [
            req.signedCookies.email,
          ]).then((data) => {
            // console.log("trang detailpage", data[0]);
            signedUser = data[0];

            res.render("DetailPage", {
              data: rows,
              dataUser,
              signedUser,
            });
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
          res.cookie("id", find.id, { signed: true });
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
      console.log(data);
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
      // console.log("hahahaha", rows[0]);
      let idCollections = req.params.id;
      console.log("1111", id);
      db.execute("SELECT * FROM tbl_collectionpint WHERE user_id =?", [
        idCollections,
      ]).then((data1) => {
        let dataColections = data1[0];

        let renderData = _.chunk(dataColections, 6);
        
        let id = req.params.id;
        db.execute(
          `SELECT a.id, b.collection_name, c.photo_id, d.img_url, d.photo_name 
          FROM tbl_userpint as a, tbl_collectionpint as b,tbl_collection_photo as c,tbl_photopint as d 
          WHERE a.id = b.user_id AND b.id = c.collection_id AND d.id = photo_id;`,
          [id]
        ).then((data2) => {
          let x=data2[0];
          res.render("PersionalPage", {
            data: rows[0],
            renderData,
            x
          });
        });
        
      });
    })
    .catch((err) => console.log(err));
};
module.exports.persionalpagecreated = (req, res) => {
  let id = req.params.id; //lấy id từ param
  console.log(id);
  db.execute("SELECT * FROM tbl_userpint WHERE id =?", [id]) //so sánh với id trong db
    .then((data) => {
      console.log(data[0][0]);
      // let [rows] = data;
      let dataCreated = data[0][0];

      res.render("PersionalPageCreadted.ejs", {
        dataCreated,
      });
    })
    .catch((err) => console.log(err));

  // res.render("PersionalPageCreadted.ejs");
};

module.exports.profileUpdate = (req, res) => {
  let { id } = req.params;

  let { fistname, lastname, dob, website, username } = req.body;
  db.execute(
    "UPDATE tbl_userpint SET fistname =?,lastname =?,dob =?,website =?,username =? WHERE id=?",
    [fistname, lastname, dob, website, username, id]
  )
    .then((data) => {
      // console.log(data);
      res.status(200).json({
        status: "updatesuccess",
        message: "update successfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.uploadPhoto = (req, res) => {
  let { id } = req.params;

  // console.log(`id`, id);
  // let { avatar } = req.body;

  db.execute("SELECT * FROM tbl_userpint WHERE id =?", [id])
    .then((data) => {
      // console.log(data);
      let [rows] = data[0];
      // console.log(rows);
      console.log(req.body.namephoto);
      let img = req.file.filename;
      console.log(img);
      // console.log(id);
      let user_id = rows.id;
      // console.log(user_id);
      let img_url = `http://localhost:8000/asset/${img}`;
      let id = Math.floor(Math.random() * 1000000);

      let photo_name = req.body.namephoto;
      let created_at = "2022-01-01 00:00:00";
      db.execute("INSERT INTO tbl_photopint VALUES(?, ?, ?, ?, ?)", [
        id,
        photo_name,
        img_url,
        created_at,
        user_id,
      ]) //so sánh với id trong db
        .then((data) => {
          let id = req.params.id;
          db.execute("SELECT * FROM tbl_userpint WHERE id =?", [id]) //so sánh với id trong db
            .then((data) => {
              console.log(data[0][0]);
              // let [rows] = data;
              let dataCreated = data[0][0];
              res.render("PersionalPageCreadted.ejs", {
                dataCreated,
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
