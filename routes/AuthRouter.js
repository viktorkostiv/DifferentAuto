const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.route('/user-auth').get(AuthController.userAuth);
router.route('/reset-password').post(AuthController.resetPassword);
router.route('/get-user').get(AuthController.getUser);

module.exports = router;