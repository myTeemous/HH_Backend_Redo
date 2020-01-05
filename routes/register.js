const path = require('path');
const express = require('express');
const registerController = require('../controllers/registerController');

const router = express.Router();

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'register.html'));
});
  
router.post('/register', registerController.saveParticipant);

module.exports = router;