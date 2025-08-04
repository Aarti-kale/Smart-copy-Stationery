const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
    addWhyChoose,
    getWhyChoose,
    deleteWhychoose,
    updateWhychoose,
    getSingleWhychoose,
  } = require("../controllers/whyChooseController");
const verifyAdmin = require("../middleware/verifyAdmin")

router.post("/",upload.single("image"),verifyAdmin, addWhyChoose);
router.get("/", getWhyChoose);
router.delete('/:id', verifyAdmin,deleteWhychoose);
router.get('/:id', verifyAdmin,getSingleWhychoose);
router.put('/:id',upload.single('image'), verifyAdmin,updateWhychoose);

module.exports = router;
