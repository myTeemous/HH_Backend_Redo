const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    //Use res.sendFile for static html. Use res.render for templates.
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.post('/', (req, res) => {
    res.json({ curl: 'works'});
});
  
module.exports = router;