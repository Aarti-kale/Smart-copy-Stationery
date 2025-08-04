const express = require('express');
const router = express.Router();
const {
  getContactInfo,
  createContactInfo,
  updateContactInfo,
  getSingleInfo,
} = require('../controllers/contactInfoController');
const verifyAdmin = require('../middleware/verifyAdmin');
const upload = require('../middleware/upload');

// GET route
router.get('/', getContactInfo);

// POST route
router.post('/', verifyAdmin,createContactInfo);

// PUT route
router.get('/:id', verifyAdmin,getSingleInfo);
router.put('/:id', verifyAdmin,updateContactInfo);

module.exports = router;
