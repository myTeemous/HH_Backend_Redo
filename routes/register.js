const path = require('path');
const express = require('express');
const registerController = require('../controllers/registerController');
const auth = require('../controllers/authController');

const router = express.Router();

router.get('/register', (req, res) => {
    console.log(req.session);
    if(req.session.isLoggedIn) {
        res.redirect(__dirname, '../views', 'myProfile.html');
    }
    res.sendFile(path.join(__dirname, '../views', 'register.html'));
});

router.post('/register', [auth.validate('validateRegistration')], registerController.saveParticipant);

module.exports = router;