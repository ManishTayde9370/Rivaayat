const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');



router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/google-login', authController.googleLogin);
router.post('/logout', authController.logout);
router.get('/is-user-logged-in', authController.isUserLoggedIn);

module.exports = router;
