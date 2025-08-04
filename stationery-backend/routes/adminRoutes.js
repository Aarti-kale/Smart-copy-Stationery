const express = require('express');
const router = express.Router();
const { registerAdmin, adminLogin, getAdminProfile } = require('../controllers/adminController');
// const { verifyAdmin } = require('../middlewares/authMiddleware');
const verifyAdmin = require("../middleware/verifyAdmin");
router.post('/register', registerAdmin);
router.post('/', adminLogin);
router.get('/profile', verifyAdmin, getAdminProfile);

module.exports = router;
