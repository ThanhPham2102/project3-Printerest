const db = require("../models/db");
const bcrypt = require("bcrypt");

module.exports.renderadmin = (req, res) => {
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
module.exports.rendercollection = (req, res) => {
  let { page_size_blogs, page_index_blogs } = req.query;
  console.log(page_size_blogs, page_index_blogs);
  page_index_blogs = Number(page_index_blogs) || 1;
  page_size_blogs = Number(page_size_blogs) || 10;
  let total = 0;
  db.execute(`SELECT*FROM tbl_collectionpint`)
    .then((data) => {
      let [rows, cols] = data;
      total = rows.length;
      return db.execute(`SELECT * FROM tbl_collectionpint LIMIT ${page_size_blogs} OFFSET
      ${(page_index_blogs - 1) * page_size_blogs}`);
    })
    .then((data) => {
      //   console.log(data);
      let [rows, cols] = data;
      console.log(rows);
      res.render("collectionPint", {
        rows,
        total,
        page_index_blogs,
        page_size_blogs,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.renderphoto = (req, res) => {
  let { page_size_photos, page_index_photos } = req.query;
  // console.log(page_size_blogs, page_index_blogs);
  page_index_photos = Number(page_index_photos) || 1;
  page_size_photos = Number(page_size_photos) || 10;
  let total = 0;
  db.execute(`SELECT*FROM tbl_photopint`)
    .then((data) => {
      let [rows, cols] = data;
      total = rows.length;
      return db.execute(`SELECT * FROM tbl_photopint LIMIT ${page_size_photos} OFFSET
      ${(page_index_photos - 1) * page_size_photos}`);
    })
    .then((data) => {
      //   console.log(data);
      let [rows, cols] = data;
      // console.log(rows);
      res.render("photoPinterest", {
        rows,
        total,
        page_index_photos,
        page_size_photos,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.rendercollectionphoto = (req, res) => {
  let { page_size_collectionphotos, page_index_collectionphotos } = req.query;
  // console.log(page_size_blogs, page_index_blogs);
  page_index_collectionphotos = Number(page_index_collectionphotos) || 1;
  page_size_collectionphotos = Number(page_size_collectionphotos) || 10;
  let total = 0;
  db.execute(`SELECT*FROM tbl_collection_photo`)
    .then((data) => {
      let [rows, cols] = data;
      total = rows.length;
      return db.execute(`SELECT * FROM tbl_collection_photo LIMIT ${page_size_collectionphotos} OFFSET
      ${(page_index_collectionphotos - 1) * page_size_collectionphotos}`);
    })
    .then((data) => {
      //   console.log(data);
      let [rows, cols] = data;
      // console.log(rows);
      res.render("collectionphotoPint", {
        rows,
        total,
        page_index_collectionphotos,
        page_size_collectionphotos,
      });
    })
    .catch((err) => console.log(err));
};
