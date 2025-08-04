const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getShop,
  addShop,
  updateShop,
  deleteShop,
  getSingleShop,
} = require("../controllers/shopController");

const verifyAdmin = require("../middleware/verifyAdmin"); // optional

router.get("/", getShop);
router.post("/", upload.single("image"), verifyAdmin,addShop);
router.delete("/:id", verifyAdmin, deleteShop);
router.get('/:id', getSingleShop);
router.put('/:id',upload.single('image'), verifyAdmin,updateShop);


module.exports = router;
