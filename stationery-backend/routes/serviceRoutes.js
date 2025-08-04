// const express = require('express');
// const router = express.Router();
// const {
//   getAllServices,
//   createService,
//   updateService,
// } = require('../controllers/serviceController');

// router.get('/', getAllServices);
// router.post('/', createService);
// router.put('/:id', updateService);

// module.exports = router;


const express = require('express');
const router = express.Router();
const  {createService,getAllServices,deleteService, getSingleService, updateService} = require('../controllers/serviceController');
const upload = require('../middleware/upload');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/', upload.single('image'), verifyAdmin,createService);
router.get('/', getAllServices);
router.delete('/:id', verifyAdmin,deleteService);
router.get('/:id',upload.single('image'), verifyAdmin,getSingleService);
router.put('/:id',upload.single('image'), verifyAdmin,updateService);

module.exports = router;
