const express = require('express');

const router = express.Router();

// Import Message Controller
const messageController = require('../controllers/chat');

// Import Passport
const passport = require('passport');

// Middle for Authentication Validation
const isUserAuth = require('../middlewares/isUserAuth');

// Send message to the general chat
router.post('/messages', [passport.authenticate('user', {session: false}), isUserAuth], messageController.postGeneralChat);

// Get all messages
router.get('/messages', [passport.authenticate('user', {session: false}), isUserAuth], messageController.getGeneralChat);

// Delete a message
router.delete('/messages/:messageId', [passport.authenticate('user', {session: false}), isUserAuth], messageController.deleteGeneralChat);


module.exports = router