const express = require('express');
const auth = require('../controllers/authController');
const logoutController = require('../controllers/logoutController');

const router = express.Router();

router.get('/logout', auth.protectLogout, (req, res) => {
    try {
        logoutController.logout(req, res);
    }
    catch(err) {
        console.error(err);
        throw err;
    }
});

module.exports = router;