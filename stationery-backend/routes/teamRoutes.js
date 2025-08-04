const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // multer middleware
const verifyAdmin = require("../middleware/verifyAdmin"); // admin verification middleware
const {
  addTeamMember,
  getTeamMembers,
  deleteTeamMembers,
  getSingleTeamMember,
  updateTeam,
} = require("../controllers/TeamController");

router.post("/", upload.single("image"), verifyAdmin,addTeamMember);
router.get("/", getTeamMembers);
router.delete('/:id', verifyAdmin,deleteTeamMembers);
router.get('/:id', verifyAdmin,getSingleTeamMember);
router.put('/:id',upload.single('image'), verifyAdmin,updateTeam);


module.exports = router;
