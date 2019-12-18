const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./controllers/participantController');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/', db.getParticipant);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

