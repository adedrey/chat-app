const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/signup', authController.postAddUser);

router.post('/login', authController.postUserLogin);



module.exports = router;