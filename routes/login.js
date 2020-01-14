const path = require('path');
const express = require('express');
const auth = require('../controllers/authController');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.get('/login', (req, res) => {
    console.log(req.session);
    if(req.session.isLoggedIn) {
        return res.redirect(__dirname, '../views', 'myProfile.html');
    }
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

router.post('/login', [auth.validate('validateLogin')], loginController.login);
  
module.exports = router;