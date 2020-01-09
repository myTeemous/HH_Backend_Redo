const path = require('path');
const express = require('express');
const registerController = require('../controllers/registerController');
const auth = require('../util/auth');

const router = express.Router();

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'register.html'));
});

router.post('/register', auth.validate('validateRegistration'), registerController.saveParticipant);

module.exports = router;