const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

router.get("/signup", authController.renderRegister);
router.post("/signup", authController.register);
router.get("/", authController.renderLogin);
router.post("/login", authController.login);
router.get("/HomePage", authController.homepage);
router.get("/resetpass", authController.resetpass);
router.post("/resetpass", authController.loginresetpass);
router.post("/resetpass", authController.signupregister);
router.get("/HomePage/PersionalPage", authController.persionalpage);
router.get("/HomePage/PersionalPageCreated", authController.persionalpagecreated);
router.get("/HomePage/DetailPage", authController.DetailPage);
router.get("/HomePage/profile", authController.profile);

module.exports = router;
