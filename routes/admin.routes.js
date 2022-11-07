const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const adminController = require("../controllers/admin.controller");
const {
  requireAuth,
  requirePer,
  requireHome,
} = require("../middlewares/auth.middleware");
//lay thong tin o duong dan ve
// ADMIN user
router.get(
  "/:id",
  // requireAdmin,
  adminController.getAll
); //admin
//admin hinh anh
// module.exports.getAllBlogs = (req, res) => {
//     let { page_size_blogs, page_index_blogs } = req.query;
//     // console.log(page_size_blogs, page_index_blogs);
//     page_index_blogs = Number(page_index_blogs) || 1;
//     page_size_blogs = Number(page_size_blogs) || 10;
//     let total = 0;
//     db.execute(`SELECT*FROM tbl_photopint`)
//       .then((data) => {
//         let [rows, cols] = data;
//         total = rows.length;
//         return db.execute(`SELECT * FROM tbl_photopint LIMIT ${page_size_blogs} OFFSET
//       ${(page_index_blogs - 1) * page_size_blogs}`);
//       })
//       .then((data) => {
//         //   console.log(data);
//         let [rows, cols] = data;
//         // console.log(rows);
//         res.render("photoPinterest", {
//           rows,
//           total,
//           page_index_blogs,
//           page_size_blogs,
//         });
//       })
//       .catch((err) => console.log(err));
//   };

module.exports = router;
