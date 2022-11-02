const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { requireAdmin } = require("../middleware/auth.middleware");
const blogController = require("../controllers/blogs.controller");
// /user - get all
router.get("/", 
requireAdmin, userController.getAll); //admin
// Get one by id
router.get("/:id", userController.getOne);
//in ra userblog
router.get("/:id/blogs", blogController.getBlogsByUserId);
// Create one by id
router.post("/", userController.CreateUser);
// Update one by id
router.put("/:id", userController.UpdateUser);
// Delete one by id
router.delete("/:id", requireAdmin, userController.DeleteUser); //admin

module.exports = router;
