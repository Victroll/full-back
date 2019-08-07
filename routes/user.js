const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router.put('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/changePassword', userController.changePassword);

module.exports = router;
