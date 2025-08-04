const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const verifyAdmin = require("../middleware/verifyAdmin")
const { getMission, addMission, deleteMission,getSingleMission,updateMission  } = require("../controllers/MissionController");

router.post("/", upload.single("image"),verifyAdmin, addMission);
router.get("/", getMission);
router.delete('/:id', verifyAdmin,deleteMission);
router.get('/:id', verifyAdmin,getSingleMission);
router.put('/:id',upload.single('image'), verifyAdmin,updateMission);


module.exports = router;
