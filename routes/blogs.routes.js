const express = require("express");
const router = express.Router();
const blogsController = require("../controllers/blogs.controller");
const { requireAdmin } = require("../middlewares/auth.middleware");
// // blogs - get all
router.get(
  "/",
  // requireAdmin,
  blogsController.getAllBlogs
);

// Get all photos
router.get("/photos", blogsController.getAllPhotos);
// Get  photo
router.get("/photos/:id", blogsController.getOnePhoto);

// // Get one by id
router.get("/:id", blogsController.getOneBlogs);

// // Create one by id
router.post("/", blogsController.creatBlogs);
// // Update one by id
router.put("/:id", blogsController.updateBlogs);
// // Delete one by id
router.delete("/:id", blogsController.deleteBlogs);

module.exports = router;
