const express = require('express');
const router = express.Router();
const { registerAdmin, adminLogin, getAdminProfile, forgotPassword, resetPassword } = require('../controllers/adminController');
const verifyAdmin = require("../middleware/verifyAdmin");
router.post('/register', registerAdmin);
router.post('/', adminLogin);
router.get('/profile', verifyAdmin, getAdminProfile);
router.post('/forgot-password' , forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
