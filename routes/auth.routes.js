const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const {
  requireAuth,
  requirePer,
  requireHome,
} = require("../middlewares/auth.middleware");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/asset");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
//lay thong tin o duong dan ve
router.get("/", authController.renderLogin);
router.get("/signup", authController.renderRegister);

// router.get("/HomePage", authController.homepage);
// router.get("/HomePage/PersionalPage", authController.persionalpage);
// router.get(
//   "/HomePage/PersionalPageCreated",
//   authController.persionalpagecreated
// );

router.get("/HomePage/DetailPage/:id", authController.DetailPage);

router.get("/:id", requireHome, authController.homepage);
router.get("/HomePage/:id", authController.homepage);
// router.get("/HomePage/PersionalPage", authController.persionalpage);
// router.get(
//   "/HomePage/PersionalPageCreated",
//   authController.persionalpagecreated
// );

// router.get("/HomePage/profile", authController.profile);

//đẩy dữ liệu lên
router.post("/signup", authController.register);
router.post("/login", authController.login);
router.post("/resetpass", authController.loginresetpass);
router.get("/HomePage/profile/:id", authController.getprofile);

router.get("/HomePage/PersionalPage/:id", authController.getPer);
router.get(
  "/HomePage/PersionalPageCreated/:id",
  authController.persionalpagecreated
);
router.post(
  "/HomePage/PersionalPageCreated/:id",
  upload.single("imagephoto"),
  authController.uploadPhoto
);

router.put("/HomePage/profile/:id", authController.profileUpdate);



router.get("/HomePage/profile/:id", uploadController.printUploadForm);
router.post(
  "/HomePage/profile/:id",
  upload.single("image"),
  uploadController.uploadAvatar
);

module.exports = router;
