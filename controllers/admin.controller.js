

const db = require("../models/db");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRoundds = 10;
let strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
// show toan bo nguoi dung
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

// show toan bo hinh anh
module.exports.getAllPhotos = (req, res) => {
    db.execute(
      `
    SELECT a.*, b.email,b.username,b.avatar
    FROM 
    tbl_photopint AS a,
    tbl_userpint AS b
    WHERE a.user_id = b.id;`
    )
      .then((data) => {
        let [rows, cols] = data;
        res.status(200).json({
          data: rows,
        });
      })
      .catch((err) => console.log(err));
  };

