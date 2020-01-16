//Note: This page should only be accessible by participants that are logged in.
//      One way to protect this endpoint is to use res.redirect() to send the user
//      to the login page if they don't have an active session.

const path = require('path');
const express = require('express');
const auth = require('../controllers/authController');

const router = express.Router();

router.get('/myProfile', auth.checkLogin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'myProfile.html'));
});

module.exports = router;