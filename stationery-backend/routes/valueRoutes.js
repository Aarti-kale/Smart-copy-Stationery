const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  addValue,
  getValues,
  deleteValue,
  getSingleValue,
  updateValue
} = require("../controllers/valueController");
const verifyAdmin = require("../middleware/verifyAdmin");

// Create value (with image upload)
router.post("/", upload.single("image"), verifyAdmin, addValue);

// Get all values
router.get("/", getValues);

// Delete value
router.delete("/:id", verifyAdmin,deleteValue);
router.get('/:id', verifyAdmin,getSingleValue);
router.put('/:id',upload.single('image'), verifyAdmin,updateValue);


module.exports = router;
