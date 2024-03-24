const express = require('express');
const MessagesController = require('../controllers/MessagesController');

const router = express.Router();

router.route('/').get(MessagesController.getAll);
router.route('/:id').get(MessagesController.getById);
router.route('/set-status').post(MessagesController.setStatus);
router.route('/delete/:id').post(MessagesController.delete);
router.route('/create').post(MessagesController.create);

module.exports = router;