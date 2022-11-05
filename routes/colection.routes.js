const express = require("express");
const router = express.Router();
const collectionController = require("../controllers/collections.controller");
const { requireAdmin } = require("../middlewares/auth.middleware");
// // blogs - get all
router.get(
  "/",
  // requireAdmin,
  collectionController.getAllCollections
);
// // // Get one by id
// router.get("/:id", collectionController.getOneCollection);
// // // Create one by id
// router.post("/", collectionController.creatCollection);
// // // Update one by id
// router.put("/:id", collectionController.updateCollection);
// // // Delete one by id
// router.delete("/:id", collectionController.deleteCollection);
module.exports = router;
