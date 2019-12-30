const path = require('path');
const express = require('express');
const registerController = require('../controllers/registerController');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});
  
router.post('/', registerController.saveParticipant);

module.exports = router;