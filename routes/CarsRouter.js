const express = require('express');
const CarsController = require('../controllers/CarsController');

const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/').get(CarsController.getAll);
router.route('/:id').get(CarsController.getById);
router.route('/set-status').post(CarsController.setStatus);
router.route('/update').post(CarsController.update);
router.route('/upload-images/:content/:id/:order').post(upload.array('files'), CarsController.uploadImages);
router.route('/delete/:id').post(CarsController.delete);
router.route('/show-on-banner').post(CarsController.showOnBanner);

module.exports = router;