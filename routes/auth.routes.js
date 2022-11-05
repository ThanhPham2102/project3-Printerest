const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const { requireAuth, requireHome } = require("../middlewares/auth.middleware");
//lay thong tin o duong dan ve
router.get("/", authController.renderLogin);
router.get("/signup", authController.renderRegister);
router.get("/:id", requireHome, authController.homepage);
router.get("/HomePage/:id", authController.homepage);
// router.get("/HomePage/PersionalPage", authController.persionalpage);
router.get(
  "/HomePage/PersionalPageCreated",
  authController.persionalpagecreated
);
router.get("/HomePage/DetailPage", authController.DetailPage);
// router.get("/HomePage/profile", authController.profile);



//đẩy dữ liệu lên
router.post("/signup", authController.register);
router.post("/login", authController.login);
router.post("/resetpass", authController.loginresetpass);
router.get("/HomePage/profile/:id", authController.getprofile);
router.get("/HomePage/PersionalPage/:id", authController.getPer);
router.put("/HomePage/profile/:id", authController.profileUpdate);

// router.put("/HomePage/profile/:id", authController.putfrofile);

// push: sửa đổi; đẩy lấy(update)

// admin
// router.get("/Admin/user", authController.profile);

module.exports = router;
