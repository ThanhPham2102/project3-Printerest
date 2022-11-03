const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

//lay thong tin o duong dan ve
router.get("/", authController.renderLogin);
router.get("/signup", authController.renderRegister);
router.get("/HomePage", authController.homepage);
router.get("/HomePage/PersionalPage", authController.persionalpage);
router.get("/HomePage/PersionalPageCreated", authController.persionalpagecreated);
router.get("/HomePage/DetailPage", authController.DetailPage);
router.get("/HomePage/profile", authController.profile);
//đẩy dữ liệu lên
router.post("/signup", authController.register);
router.post("/login", authController.login);
router.post("/resetpass", authController.loginresetpass);

// push: sửa đổi; đẩy lấy(update)
// admin
router.get("/Admin/user", authController.profile);


module.exports = router;
