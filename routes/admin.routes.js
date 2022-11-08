const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const {
  requireAuth,
  requirePer,
  requireHome,
} = require("../middlewares/auth.middleware");

router.get("/users", adminController.renderadmin);
router.get("/collection", adminController.rendercollection);
router.get("/photo", adminController.renderphoto);
router.get("/collectionphoto", adminController.rendercollectionphoto);

module.exports = router;
