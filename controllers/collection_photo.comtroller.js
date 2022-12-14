const db = require("../models/db");
const bcrypt = require("bcrypt");
const _ = require("lodash"); //npm i lodash
const saltRoundds = 10;
let strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

// show toan bo collection anh ra:
module.exports.getAllCollectionsPhoto = (req, res) => {
  let { page_size_blogs, page_index_blogs } = req.query;
  console.log(page_size_blogs, page_index_blogs);
  page_index_blogs = Number(page_index_blogs) || 1;
  page_size_blogs = Number(page_size_blogs) || 10;
  let total = 0;
  db.execute(`SELECT*FROM tbl_collection_photo`)
    .then((data) => {
      let [rows, cols] = data;
      total = rows.length;
      return db.execute(`SELECT * FROM tbl_collection_photo LIMIT ${page_size_blogs} OFFSET
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

//   console.log("getOneBlogs");
//   let userId = req.params.id;
//   db.execute("SELECT * FROM bl_collectionpint WHERE id =?", [userId]) //so sánh với id trong db
//     .then((data) => {
//       // console.log(data);
//       let [rows] = data;
//       res.status(200).json({
//         data: rows[0],
//       });
//     })
//     .catch((err) => console.log(err));
// };

// //CreatBlogs
// module.exports.creatBlogs = (req, res) => {
//   console.log("creatBlogs");
//   let { title, content } = req.body;
//   let { userId } = req.params;
//   // let { title, password\\\ } = req.body;//lấy email và password vào để kiểm tra
//   if (!title || !content) {
//     //nếu ko phải là pass hoặc email
//     return res.status(500).json({
//       message: "Invalid title or content",
//     });
//   }

//   let id = Math.floor(Math.random() * 1000);
//   db.execute("INSERT INTO  bl_collectionpint VALUES(?,?,?,?,?)", [
//     id,
//     title,
//     content,
//     null,
//     userId,
//   ])
//     .then((data) => {
//       return res.status(200).json({
//         message: "create one successfully",
//       });
//     })

//     .catch((err) => {
//       return res.status(500).json({
//         err: err,
//       });
//     });
// };

// //update blogs
// module.exports.updateBlogs = (req, res) => {
//   console.log("updateBlogs");
//   let { id } = req.params;
//   let { title, content, img } = req.body;
//   db.execute("UPDATE bl_collectionpint SET title = ?,content =?,img=? WHERE id=?", [
//     title,
//     content,
//     img,
//     id,
//   ])
//     .then((data) => {
//       //   console.log(data);
//       res.status(200).json({
//         message: "update one successfully",
//       });
//     })
//     .catch((err) => console.log(err));
// };
// //delete blog
// module.exports.deleteBlogs = (req, res) => {
//   let { id } = req.params;
//   db.execute("DELETE FROM bl_collectionpint WHERE id=?", [id])
//     .then((data) => {
//       //   console.log(data);
//       res.status(200).json({
//         message: "delete one successfully",
//       });
//     })
//     .catch((err) => console.log(err));
// };
// //
// module.exports.getBlogsByUserId = (req, res) => {
//   // console.log(req.params);//ra :id
//   let { id } = req.params;
//   db.execute("SELECT*FROM bl_collectionpint WHERE user_id =?", [id])
//     .then((data) => {
//       let [rows] = data;
//       let renderData = _.chunk(rows, 3);
//       console.log(rows);
//       res.render("PersionalPage.ejs", {
//         data: renderData,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         status: "err",
//         message: err,
//       });
//     });
// };
