// quan li nguoi dung
//dung de xoa, them , bot nguoi dung

const db = require("../models/db");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRoundds = 10;
let strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

// module.exports.getAll = (req, res) => {
//   let { page_size, page_index } = req.query;
 
//   page_index = Number(page_index) || 1; //(page_index=page_index?page_index=1)
//   page_size = Number(page_size) || 5;
//   let total = 0;

//   // )
//   db.execute(`SELECT * FROM tbl_userpint`)
//     .then((data) => {
//       let [rows, cols] = data;
//       total = rows.length;
//       return db.execute(
//         `SELECT * FROM tbl_userpint LIMIT ${page_size} OFFSET
//           ${(page_index - 1) * page_size}`
//       );
//     })
//     .then((data) => {
//       let [rows, cols] = data;
//       res.render("userPinterest", { rows, total, page_size, page_index });
//     })
//     .catch((err) => console.log(err));
// };

// show 1 nguoi dung ra=>xuat ra trang ca nhan
module.exports.getOne = (req, res) => {
  let id = req.params.id; //lấy id từ param
  db.execute("SELECT * FROM tbl_userpint WHERE id =?", [id]) //so sánh với id trong db
    .then((data) => {
      // console.log(data);
      let [rows] = data;
    
      res.render("DetailPage.ejs", {
        data: rows,
      });
    })
    .catch((err) => console.log(err));
};

// CreateUser
module.exports.CreateUser = (req, res) => {
  let { email, password } = req.body; //lấy email và password vào để kiểm tra,lâý ở đâu?
 
  if (!email || !password) {
    //nếu ko phải là pass hoặc email
    return res.status(500).json({
      message: "Invalid email or password",
    });
  }
  if (!strongRegex.test(password)) {
    return res.status(500).json({
      message: "Password is not strong enough",
    });
  }
  password = bcrypt.hashSync(password, saltRoundds);
  // console.log(password);
  let id = Math.floor(Math.random() * 1000);
  db.execute("SELECT * FROM tbl_userpint WHERE email=?", [email])
    .then((data) => {
      let [row] = data;
      
      if (row.length > 0) {
        res.status(404).json({ message: "User already exist" });
      } else {
        return db.execute("INSERT INTO tbl_userpint VALUES(?,?,?,?,?,?,?)", [
          id,
          null,
          null,
          email,
          null,
          null,
          password,
        ]);
      }
    })
    .then((data) => {
      console.log(data);
      console.log("thanhcong");
    })
    .catch((err) => console.log(err));
};
// UpdateUser
module.exports.UpdateUser = (req, res) => {
  let { id } = req.params;
  let { name, username, website, phone } = req.body;
  db.execute(
    "UPDATE tbl_userpint SET name = ?,username =?,website=?,phone=? WHERE id=?",
    [name, username, website, phone, id]
  )
    .then((data) => {
      //   console.log(data);
      res.status(200).json({
        message: "update one successfully",
      });
    })
    .catch((err) => console.log(err));
};
//DeleteUser
module.exports.DeleteUser = (req, res) => {
  let { id } = req.params;
  db.execute("DELETE FROM tbl_userpint WHERE id=?", [id])
    .then((data) => {
      //   console.log(data);
      res.status(200).json({
        message: "delete one successfully",
      });
    })
    .catch((err) => console.log(err));
};

//useblog
module.exports.profileUpdateUser = (req, res) => {
  let { id } = req.params;

  let { age, fistname, lastname, avatar, dob, website, username, role } =
    req.body;
  db.execute(
    "UPDATE tbl_userpint SET age =?, fistname =?,lastname =?, avatar =?,dob =?,website =?,username =?,role =? WHERE id=?",
    [age, fistname, lastname, avatar, dob, website, username, role, id]
  )
    .then((data) => {
      //   console.log(data);
      res.status(200).json({
        message: "update one successfully",
      });
    })
    .catch((err) => console.log(err));
};




module.exports.getAll = (req, res) => {
  let { page_size, page_index } = req.query;
 
  page_index = Number(page_index) || 1; //(page_index=page_index?page_index=1)
  page_size = Number(page_size) || 5;
  let total = 0;

  // )
  db.execute(`SELECT * FROM tbl_userpint`)
    .then((data) => {
      let [rows, cols] = data;
      total = rows.length;
      return db.execute(
        `SELECT * FROM tbl_userpint LIMIT ${page_size} OFFSET
          ${(page_index - 1) * page_size}`
      );
    })
    .then((data) => {
      let [rows, cols] = data;
      res.render("userPinterest", { rows, total, page_size, page_index });
    })
    .catch((err) => console.log(err));
};