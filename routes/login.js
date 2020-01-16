const path = require('path');
const express = require('express');
const auth = require('../controllers/authController');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.get('/login', auth.redirectToHome, (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

router.post('/login', [auth.validate('validateLogin')], loginController.login);
  
module.exports = router;