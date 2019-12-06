const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./util/database');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.post('/', (req, res) => {
  db.execute('INSERT INTO students (firstName, lastName, email, schoolName) VALUES (?, ?, ?, ?)',
  [req.body.firstname, req.body.lastname, req.body.email, req.body.school.toUpperCase()])
  .then((result) => {
    //res.send(result.insertId)
    console.log(result[0].insertId);
    res.json({insertion: result[0].insertId});
  })
  .catch((err) => {
    console.log(err);
    res.json({insertion: -1});
  });
});


app.get('/students', (req, res) => {
  db.execute('SELECT * FROM students')
  .then((result) => {
    res.json(result[0]);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

